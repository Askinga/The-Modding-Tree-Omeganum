setInterval(bugChecks, 1000)

function bugChecks() {
	    if (player.devSpeed === undefined) {
			alert("Oops! Looks like you broke my game. I will fix it for you!")
			player.devSpeed = new OmegaNum(1)
		}
		if (player.devSpeed.gt(1)) {
			alert("Sorry! No Dev Speed in here! I want you to experience the TRUE difficulty of the tree! (it is a difficulty chart tree!)")
			player.devSpeed = new OmegaNum(1)
		}
}
