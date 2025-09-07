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
		if (hasUpgrade('f', 14)) mult = mult.times(upgradeEffect('f', 14))
		if (hasUpgrade('f', 21)) mult = mult.times(upgradeEffect('f', 21))
		if (hasUpgrade('f', 23)) mult = mult.times(upgradeEffect('f', 23))
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
		description: "x2 point gain",
		cost: new ExpantaNum(1)
	},
	12: {
		title: "2",
		description: "x2 effortlessless gain",
		cost: new ExpantaNum(3),
		unlocked(){ return hasUpgrade('f', 11) },
	},
	13: {
		title: "3",
		description: "boost points based on effortlessless",
		cost: new ExpantaNum(7),
		unlocked(){ return hasUpgrade('f', 12) },
		effect(){ return player.f.points.add(1).pow(0.25) },
		effectDisplay() { return "x"+format(upgradeEffect('f', 13)) },
	},
	14: {
		title: "4",
		description: "boost effortlessless based on effortlessless upgrades bought",
		cost: new ExpantaNum(20),
		unlocked(){ return hasUpgrade('f', 13) },
		effect(){ return new ExpantaNum(player.f.upgrades.length).add(2).div(2) },
		effectDisplay() { return "x"+format(upgradeEffect('f', 14)) },
	},
	15: {
		title: "5",
		description: "boost points based on effortlessless upgrades bought",
		cost: new ExpantaNum(75),
		unlocked(){ return hasUpgrade('f', 14) },
		effect(){ return new ExpantaNum(player.f.upgrades.length).add(2).div(2) },
		effectDisplay() { return "x"+format(upgradeEffect('f', 15)) },
	},
	21: {
		title: "6",
		description: "boost effortlessless based on points",
		cost: new ExpantaNum(300),
		unlocked(){ return hasUpgrade('f', 15) },
		effect(){ return player.points.add(1).pow(0.1) },
		effectDisplay() { return "x"+format(upgradeEffect('f', 21)) },
	},
	22: {
		title: "7",
		description: "boost points based on points",
		cost: new ExpantaNum(550),
		unlocked(){ return hasUpgrade('f', 21) },
		effect(){ return player.points.add(1).pow(0.075) },
		effectDisplay() { return "x"+format(upgradeEffect('f', 22)) },
	},
	23: {
		title: "8",
		description: "boost effortlessless based on effortlessless",
		cost: new ExpantaNum(1000),
		unlocked(){ return hasUpgrade('f', 22) },
		effect(){ return player.f.points.add(1).pow(0.05) },
		effectDisplay() { return "x"+format(upgradeEffect('f', 23)) },
	},
	24: {
		title: "9",
		description: "boost points based on points and effortlessless",
		cost: new ExpantaNum(2500),
		unlocked(){ return hasUpgrade('f', 23) },
		effect(){ return player.points.add(1).pow(0.025).times(player.f.points.add(1).pow(0.04)) },
		effectDisplay() { return "x"+format(upgradeEffect('f', 24)) },
	},
    },		
})
