setInterval(bugChecks, 1000)

function bugChecks() {
		if (player.devSpeed.gte(1.000000001)) {
			alert("Sorry! No Dev Speed in here! I want you to experience the TRUE difficulty of the tree! (it is a difficulty chart tree!)")
			player.devSpeed = undefined
		}
}
