setInterval(bugChecks, 50)

function bugChecks() {
		if (player.devSpeed !== undefined) {
			alert("Sorry! No Dev Speed in here! I want you to experience the TRUE difficulty of the tree! (it is a difficulty chart tree!)")
			player.devSpeed = undefined
		}
}
