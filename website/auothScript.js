"use strict";

var scope = 'user-read-playback-state';
var clientId = '36ad00d5f98e4831901e3f3e1e067826';
var clientSecret = 'c36732aa8b384a80827773a1bbf52e31';
var port = '8000'
var redirect_url = `http://localhost:${port}/callback.html`;	

async function getToken(code, useRefresh){
	console.log("fetching token from spotify");
	var standardBody = {
		redirect_uri: redirect_url,
		client_id : clientId,
		client_secret : clientSecret
	}
	var codeBody = {
		code: code,
		grant_type: 'authorization_code',
	}
	var refreshBody = {
		grant_type: 'refresh_token',
		refresh_token: code
	}

	const tokenRequest = await fetch("https://accounts.spotify.com/api/token", {
		method : 'POST',
		headers : {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		body: (new URLSearchParams({...standardBody, ...(useRefresh ? refreshBody : codeBody)})).toString(),
		});
	var requestResult = await tokenRequest.json();
	console.log(requestResult, "asd");
	return [requestResult.access_token, requestResult.refresh_token];
}

async function tokenFromRefresh(refreshToken){
	const tokenRequest = await fetch("https://api.spotify.com/v1/refresh", {
		method: 'POST',
		headers: {"Content-Type" : "application/x-www-form-urlencoded"},
		body: (new URLSearchParams({refresh_token: refreshToken})).toString()
	});	
	var tokenRespons = await tokenRequest.json();
	return tokenRespons.access_token;
}


