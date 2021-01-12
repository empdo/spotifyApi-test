"use strict";

function setTime(){
	var date = new Date();

	var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	var sec = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

	document.querySelector("#time").textContent = hour + ":" + min + ":" +  sec;

	var t = setTimeout(function(){ setTime() }, 1000);
}

setTime();


