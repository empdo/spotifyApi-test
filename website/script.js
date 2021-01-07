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
        
function getCoolTime(timeStamp){
	var secs = timeStamp / 1000;
	var minutes = Math.floor(secs / 60);
	var track_secs = Math.floor((secs % 60));
	return(`${minutes}:${track_secs < 10 ? "0" + track_secs : track_secs}`);
}

function handleTrackRespons(data, depth){
	if(!depth){
		depth = 0;
	}
	var response = data[1];
	if(!response){
		console.log("Bad token, retriving new one...")
		var refreshToken = false //sessionStorage.getItem("refreshcode");
		sessionStorage.clear()
		localStorage.clear()

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
		document.documentElement.style.setProperty('--track_img_url', `url("${data[0].item.album.images[0].url}")`);
		document.querySelector("#track_title").innerHTML = data[0].item.name;
		
		var artists = [];
		for (var x in data[0].item.artists){
			artists.push(data[0].item.artists[x].name);
		}
		document.querySelector("#track_artist").innerHTML = artists.join(" - ");

		var progress = data[0].progress_ms;
		var timeStamp = data[0].timestamp;
		var correctedProgress = (new Date().getTime() - timeStamp) + progress;
		var trackLength = data[0].item.duration_ms;

		document.querySelector("#progress").style.width = (progress / trackLength) * 100 + "%";
		document.querySelector("#progress_time").textContent = getCoolTime(progress);
		document.querySelector("#total_time").textContent = getCoolTime(trackLength);

	}
}

getCurrentTrack().then(data => {
	handleTrackRespons(data);
});
