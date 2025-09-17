addLayer("f", {
    name: "Effortlessless", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D-1", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
		best: new ExpantaNum(0),
		total: new ExpantaNum(0),
		effortlesslessPower: new ExpantaNum(0),
		ellPowerG: new ExpantaNum(0),
    }},
	nodeStyle() {
		return {
            'color': 'blue',
            'background-image': 'url("resources/Difficulty1.png")',
            'background-position': 'center center',
            'background-size': '100%',
            'border': '1px solid white'
		}
    },
    color: "#ccffff",
    requires: new ExpantaNum(10), // Can be a function that takes requirement increases into account
    resource: "Effortlessless", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new ExpantaNum(1)
		if (hasUpgrade('f', 12)) mult = mult.times(2)
		if (hasUpgrade('f', 14)) mult = mult.times(upgradeEffect('f', 14))
		if (hasUpgrade('f', 21)) mult = mult.times(upgradeEffect('f', 21))
		if (hasUpgrade('f', 23)) mult = mult.times(upgradeEffect('f', 23))
		if (hasUpgrade('f', 25)) mult = mult.times(2)
		mult = mult.times(buyableEffect('f', 11))
		if (hasUpgrade('f', 31)) mult = mult.times(tmp.f.effP2)
		if (hasUpgrade('f', 35)) mult = mult.times(3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new ExpantaNum(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "E: Reset for effortlessless", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	tabFormat: {
		"Main": {
			content: [
				"main-display",
				"prestige-button",
				"resource-display",
				"blank",
				"buyables",
				"upgrades",
			],
		},
		"Effortlessless Power": {
			unlocked() { return hasUpgrade('f', 31) },
			content: [
				"main-display",
				"prestige-button",
				"resource-display",
				"blank",
				["display-text", function() { return "You have " + format(player.f.effortlesslessPower) + " Effortlessless Power, boosting points by x" + format(tmp.f.effP1) + " and Effortlessless by x" + format(tmp.f.effP2) + ".<br>(" + format(player.f.ellPowerG) + "/sec)" }],
			],
		},
	},
    layerShown(){return true},
	effP1() {
		return player.f.effortlesslessPower.add(1).pow(0.1)
	},
	effP2() {
		return player.f.effortlesslessPower.add(1).pow(0.04)
	},
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
	25: {
		title: "10",
		description: "x2 effortlessless gain and unlock a buyable",
		cost: new ExpantaNum(3500),
		unlocked(){ return hasUpgrade('f', 24) },
	},
	31: {
		title: "11",
		description: "unlock a new currency which boosts points and effortlessless",
		cost: new ExpantaNum(10000),
		unlocked(){ return hasUpgrade('f', 25) },
	},
	32: {
		title: "12",
		description: "boost effortlessless power based on effortlessless power",
		cost: new ExpantaNum(25000),
		unlocked(){ return hasUpgrade('f', 31) },
		effect(){ return player.f.effortlesslessPower.add(1).pow(0.175) },
		effectDisplay() { return "x"+format(upgradeEffect('f', 32)) },
	},
	33: {
		title: "13",
		description: "'Effortlessless 1' affects Effortlessless Power",
		cost: new ExpantaNum(100000),
		unlocked(){ return hasUpgrade('f', 32) },
	},
	34: {
		title: "14",
		description: "x5 effortlessless power",
		cost: new ExpantaNum(125000),
		unlocked(){ return hasUpgrade('f', 33) },
	},
	35: {
		title: "15",
		description: "x3 effortlessless power, effortlessless and points",
		cost: new ExpantaNum(200000),
		unlocked(){ return hasUpgrade('f', 34) },
	},
    },
	buyables: {
		11: {
      unlocked() {
        return hasUpgrade("f", 25);
      },
      title: "Effortlessless 1",
      cost(x) {
        return new ExpantaNum(10000).times(new ExpantaNum(10).pow(x));
      },

      display() {
        return (
          "Boost Effortlessless by x2.00 per purchase." +
          "<br>Cost: " +
          format(tmp[this.layer].buyables[this.id].cost) +
          " Effortlessless" +
          "<br>Bought: " +
          getBuyableAmount(this.layer, this.id) +
          "<br>Effect: Boost Effortlessless gain by x" +
          format(buyableEffect(this.layer, this.id))
        );
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost());
      },

      buy() {
        player[this.layer].points = player[this.layer].points.sub(
          this.cost()
        );

        setBuyableAmount(
          this.layer,
          this.id,
          getBuyableAmount(this.layer, this.id).add(1)
        );
      },
      effect(x) {
        let base1 = new ExpantaNum(2);
        let base2 = x;
        let exp = new ExpantaNum(1);
        let eff = base1.pow(ExpantaNum.pow(base2, exp));
        return eff;
      }
    },
	},
	update(diff) {
		let gain = new ExpantaNum(0)
		if (hasUpgrade('f', 31)) gain = gain.add(1)
		if (hasUpgrade('f', 32)) gain = gain.times(upgradeEffect('f', 32))
		if (hasUpgrade('f', 33)) gain = gain.times(buyableEffect('f', 11))
		if (hasUpgrade('f', 34)) gain = gain.times(5)
		if (hasUpgrade('f', 35)) gain = gain.times(3)
		

		player.f.ellPowerG = gain
		gain = gain.times(diff)
		player.f.effortlesslessPower = player.f.effortlesslessPower.add(gain)
	},
})
