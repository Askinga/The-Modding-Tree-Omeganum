addLayer("f", {
    name: "Effortlessless", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D-1", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
		best: new ExpantaNum(0),
		total: new ExpantaNum(0),
    }},
    color: "#ccffff",
    requires: new ExpantaNum(10), // Can be a function that takes requirement increases into account
    resource: "Effortlessless", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new ExpantaNum(1)
		if (hasUpgrade('f', 12)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new ExpantaNum(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "E: Reset for effortlessless", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	automate(){
		player.best = player.points.max(player.points, player.best)
	},
    layerShown(){return true},
    upgrades: {
	11: {
		title: "1",
		description: "x2 point gain.",
		cost: new ExpantaNum(1)
	},
	12: {
		title: "2",
		description: "x2 effortlessless gain.",
		cost: new ExpantaNum(3),
		unlocked(){ return hasUpgrade('f', 11) },
	},
	13: {
		title: "3",
		description: "boost points based on effortlessless",
		cost: new ExpantaNum(7),
		unlocked(){ return hasUpgrade('f', 12) },
		effect(){ return player.f.points.add(1).pow(0.25) },
		effectDisplay() { return "x"+format(upgradeEffect('f', 13))
	},
    },		
})
