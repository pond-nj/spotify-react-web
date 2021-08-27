const clientID = 'a8f8fad42f0e45568722c012700162ed';
const redirectURL = 'http://pond-nj.surge.sh';
let accessToken;

const Spotify = {

    getAccessToken(){
        

        if( accessToken ){
            return accessToken;
        }else{
            
            //check for Token in URL
            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

            if( accessTokenMatch && expiresInMatch ){
                accessToken = accessTokenMatch[1];
                const expiresIn = Number(expiresInMatch[1]);

                //clear parameters

                window.setTimeout( () => accessToken = "" , expiresIn * 1000 );
                window.history.pushState('Access Token', null, '/');
                return accessToken;
            } else {
                //accessToken is empty and is not in URL
                console.log( 'accessToken is empty' );
                const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
                window.location = accessURL;
            }
        }
    },
    
    search( term ){
        const accessToken = Spotify.getAccessToken();
        //console.log( `term: ${term}`);
        return fetch( `https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers:{ Authorization: `Bearer ${accessToken}` }
        }).then( (response) => {
            //console.log(response);
            return response.json();
        }).then( jsonResponse => {
            //console.log( jsonResponse );
            if( !jsonResponse.tracks ){
                return [{
                    id:"none",
                    name:"none",
                    artists:"none",
                    albun:"none",
                    uri:"none"
                }];
            } else {
                return jsonResponse.tracks.items.map( track => {
                    return {
                        id: track.id,
                        name: track.name,
                        artists: track.artists[0].name,
                        albun: track.album.name,
                        uri: track.uri,
                    };
                });
            }

        });

    },

    savePlaylist( playlistName , tracksURI ){
        if( !playlistName || !tracksURI ){
            return;
        }else {
            const accessToken = Spotify.getAccessToken();
            const headers = {
                Authorization: `Bearer ${accessToken}`
            };
            let userID;

            //get userID
            fetch( 'https://api.spotify.com/v1/me' , {headers: headers}
            ).then( response => response.json()
            //create new playlist
            ).then( jsonResponse => {
                userID = jsonResponse.id;
                return fetch( `https://api.spotify.com/v1/users/${userID}/playlists`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ name: playlistName })
                });
            }).then( response => {
                    //console.log( 'response from creating playlist' );
                    //console.log( 'accessToken:' + accessToken );
                    //console.log( `status: ${response.status}`);
                    //console.log(response);
                    return response.json();
            //add song to playlist
            }).then( jsonResponse => {
                    //console.log( `msg: ${jsonResponse.message}`);
                    const playlistID = jsonResponse.id;
                    return fetch( `https://api.spotify.com/v1/playlists/${playlistID}/tracks` , {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify( {uris: tracksURI })
                    });
            }); //.then( response => { console.log( response )} );

        }
    }
}

export default Spotify;