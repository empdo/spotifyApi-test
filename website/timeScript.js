"use strict";

function setTime(){
	var date = new Date();

	var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

	document.querySelector("#time").textContent = hour + " : " + min;

	var t = setTimeout(function(){ setTime() }, 1000);
}

setTime();


