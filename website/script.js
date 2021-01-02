"use strict";

//hämta track, om respons code == 401, refresha token med sessionstorage.refreshcode om inte den finns gå in på callbacksida
//

async function getCurrentTrack(){
	const trackUrl = "https://api.spotify.com/v1/me/player";
	const trackRespons = await fetch(trackUrl, {headers : {Authorization: "Bearer " + localStorage.token}})
	console.log(await trackRespons);
	const trackJson = await trackRespons.json();
	return [trackJson, trackRespons.ok];
}

function handleTrackRespons(data, depth){
	if(!depth){
		depth = 0;
	}
	var response = data[1];
	if(!response){
		console.log("Bad token, retriving new one...")
		var refreshToken = sessionStorage.getItem("refreshcode");
		console.log(refreshToken);
		if(!refreshToken){
			window.location.assign(redirect_url);
			return;
		}else{
			console.log("ASdasdasdasd")
			getToken(refreshToken, true).then(data => {
				if(!data){
					return;
				}
				if (data[0] && data[1]){
					localStorage.setItem("token", data[0]);
					sessionStorage.setItem("refreshcode", data[1]);
				}
				handleTrackRespons(data)
			})//.catch(() => {console.log("redirecting for new code grant")});
		}

	} else if (response){
		console.log("showing stuff", data[0])
		document.querySelector("#track_img").src = data[0].item.album.images[0].url;
		document.querySelector("#track_title").innerHTML = data[0].item.name;
	}
}

getCurrentTrack().then(data => {
	handleTrackRespons(data);
});
