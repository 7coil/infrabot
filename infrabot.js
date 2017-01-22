/*
	MSS-InfraLink - The node.infra.link chat bot
	Copyright (C) 2017 7coil (admin@moustacheminer.com)

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

const io = require('socket.io-client');
const request = require('request');
const socket = io.connect('http://node.infra.link');
const user = "MSS"

socket.on("message", function (data){
	
	let input = data.message.replace( /\n/g, " " ).split(" ");
	
	if (input[0].toLowerCase() === "/flip") {
		return sendMessage("(╯°□°）╯︵ ┻━┻");
	} else if (input[0].toLowerCase() === "/unflip") {
		return sendMessage("┬─┬﻿ ノ( ゜-゜ノ)");
	} else if (input[0].toLowerCase() === "/shrug") {
		return sendMessage("¯\\_(ツ)_/¯");
	} else if (input[0] === "/ow") {
		if (!input[1] || !input[2] || !input[3]) {
			return sendMessage("Usage: /ow <platform> <region> <tag>");
		} else {
			var owUrl = "http://ow-api.herokuapp.com/profile/" + input[1] + "/" + input[2] + "/" + input[3];
			request(owUrl, function (error, response, body) {
				if (response.statusCode === 404) {
					return sendMessage("No player tag was found.");
				} else if (response.statusCode === 200){
					var owData = JSON.parse(body);
					return sendMessage(owData["username"] + " Ranked #" + owData["competitive"]["rank"] + " W/L " + owData["games"]["competitive"]["wins"] + "/" + owData["games"]["competitive"]["lost"]);
				}
			});
		}
	}
	
});

socket.on("connect", function () {
	socket.emit("user", {"username": user});
});

function sendMessage(message) {
	socket.emit("message", {
		username: user,
		message: message
	});
}