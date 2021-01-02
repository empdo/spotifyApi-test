"use strict";
var clientId = "36ad00d5f98e4831901e3f3e1e067826";
var clientSecret = "c36732aa8b384a80827773a1bbf52e31";
var redirectUrl = "http://localhost:8000/callback.html";
var homepageUrl = "http://localhost:8000"
var scope = 'user-read-playback-state';
var spotifyGrantUrl = `https://accounts.spotify.com/authorize?scope=${scope}&response_type=code&client_id=36ad00d5f98e4831901e3f3e1e067826&redirect_uri=${redirectUrl}`;

var params = new URLSearchParams(window.location.search);
if (params.get("code")){
	//getToken	
	getToken(params.get("code"), false).then(data => {
		if(!data){
			return;
		}
		if (data[0] && data[1]){
			localStorage.setItem("token", data[0]);
			sessionStorage.setItem("refreshcode", data[1]);
		}
		window.location.assign(homepageUrl);
	})//.catch(() => {console.log("redirecting for new code grant")});
}else {
	window.location.assign(spotifyGrantUrl);
}

