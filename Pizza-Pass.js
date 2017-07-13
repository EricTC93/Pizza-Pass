function PizzaTroll(name) {
	this.name = name;
	this.pizza = [];
	this.hungry = true;

	this.checkPizza = function(piz) {
		for (var i=0; i<piz.length; i++) {
			var favTopping = false;

			for (var j=0; j<this.pizza.length; j++) {
				if(piz[i] === this.pizza[j]) {
					favTopping = true;
				}
			}

			if (favTopping === false) {
				console.log(this.less);
				return;
			}
		}

		if (this.pizza.length > piz.length) {
			console.log(this.more);
			return;
		}

		console.log(this.correct);
		this.hungry = false;
		return;
	}

	this.more = "";
	this.less = "";
	this.correct = "";
}

var Arno = new PizzaTroll("Arno");
Arno.more = "Arno: More toppings!\n";
Arno.less = "Arno: There's something on that I don't like!\n";
Arno.correct = "Arno: Oh, my pizza!\n";

var Willa = new PizzaTroll("Willa");
Willa.more = "Willa: I'd appreciate morre toppings.\n";
Willa.less = "Willa: There's something there I won't eat.\n";
Willa.correct = "Willa: My compliments to the chef.\n";

var Shyler = new PizzaTroll("Shyler");
Shyler.more = "Shyler: It's still missing my favorite.\n";
Shyler.less = "Shyler: Uh-oh, there's stuff on that I don't want.\n";
Shyler.correct = "Shyler: Thank you.\n";


var possibleToppings = ["olives","peppers","pepperoni","mushrooms","cheese","pineapples","onions","sausages"];
// var ArnoPizza = [];
// var WillaPizza = [];

// var ArnoHungry = true;
// var WillaHungry = true;

// for (var i = 0; i < possibleToppings.length; i++) {
// 	var rand = Math.floor(Math.random()*2);
// 	if (rand === 1) {
// 		Arno.pizza.push(possibleToppings[i]);
// 	}
// }

// console.log(Arno.pizza);

var inquirer = require("inquirer");

var pickToppings = [{
	type:"checkbox",
	name:"toppings",
	choices:possibleToppings,
	message:"Which toppings?"
}];

// console.log("\nArno: Pizza for breackfast, lunch, dinner, and dessert would satisfy me.");
// console.log("Arno: Make me a pizza!\n");

// inquirer.prompt(pickToppings).then(function(res){
// 	console.log(res);
// });

// inquirer.prompt(pickToppings).then(gameLogic);

var difficultySetting = [{
	type:"list",
	name:"difficulty",
	choices:["Not So Easy","Oh So Hard","Very Hard"],
	message:"What difficulty?"
}];

inquirer.prompt(difficultySetting).then(function(res) {
	switch (res.difficulty) {
		case "Not So Easy":
			startGameEasy();
			break;

		case "Oh So Hard":
			startGameHard();
			break;

		case "Very Hard":
			startGameVeryHard();
			break

		default:
			console.log("There was an error");
			break;
	}
});

function startGameEasy() {
	for (var i = 0; i < possibleToppings.length; i++) {
		var rand = Math.floor(Math.random()*2);
		if (rand === 1) {
			Arno.pizza.push(possibleToppings[i]);
		}
	}

	// console.log(Arno.pizza);
	console.log("\nArno: Pizza for breackfast, lunch, dinner, and dessert would satisfy me.");
	console.log("Arno: Make me a pizza!\n");

	inquirer.prompt(pickToppings).then(gameLogicEasy);
}

function gameLogicEasy(res) {
	// var found = false;

	// for (var i=0; i<res.toppings.length; i++) {
	// 	for (var j=0; j<Arno.pizza.length; j++) {
	// 		if(res.toppings[i] === Arno.pizza[j]) {
	// 			found = true;
	// 		}
	// 	}

	// 	if (found === false) {
	// 		console.log("Arno: There's something on that I don't like!\n");
	// 		return inquirer.prompt(pickToppings).then(gameLogic);
	// 	}
	// }

	// if (Arno.pizza.length > res.toppings.length) {
	// 	console.log("Arno: More toppings!\n");
	// 	return inquirer.prompt(pickToppings).then(gameLogic);
	// }

	// return console.log("Oh, my pizza!\nHave a pizza, PARTY!");

	Arno.checkPizza(res.toppings);

	if (Arno.hungry === true) {
		return inquirer.prompt(pickToppings).then(gameLogicEasy);
	}

	return console.log("Have a pizza, PARTY!");
}

function startGameHard() {
	for (var i = 0; i < possibleToppings.length; i++) {
		var rand = Math.floor(Math.random()*2);
		if (rand === 1) {
			Arno.pizza.push(possibleToppings[i]);
		}

		else {
			Willa.pizza.push(possibleToppings[i]);
		}
	}

	console.log("\nArno: Pizza for breackfast, lunch, dinner, and dessert would satisfy me.");
	console.log("Willa: I'm starving!\n");

	inquirer.prompt(pickToppings).then(gameLogicHard);
}

function gameLogicHard(res) {

	if (Arno.hungry === true) {
		Arno.checkPizza(res.toppings);

		if(Arno.hungry === false && Willa.hungry === true) {
			return inquirer.prompt(pickToppings).then(gameLogicHard); 
		}
	}

	if (Willa.hungry === true) {
		Willa.checkPizza(res.toppings);
	}

	if (Arno.hungry === true || Willa.hungry === true) {
		return inquirer.prompt(pickToppings).then(gameLogicHard);
	}

	return console.log("Arno: Have a pizza, PARTY!\nWilla: 1, 2, 3, Go!\nNOM NOM NOM NOM NOM NOM NOM");
}

function startGameVeryHard() {
	for (var i = 0; i < possibleToppings.length; i++) {
		var rand = Math.floor(Math.random()*3);
		if (rand === 0) {
			Arno.pizza.push(possibleToppings[i]);
		}

		else if (rand === 1) {
			Willa.pizza.push(possibleToppings[i]);
		}

		else {
			Shyler.pizza.push(possibleToppings[i]);
		}
	}

	console.log("\nArno: Pizza for breackfast, lunch, dinner, and dessert would satisfy me.");
	console.log("Shyler: Food!\n");

	inquirer.prompt(pickToppings).then(gameLogicVeryHard);
}

function gameLogicVeryHard(res) {

	if (Arno.hungry === true) {
		Arno.checkPizza(res.toppings);

		if(Arno.hungry === false && (Willa.hungry === true || Shyler.hungry === true)) {
			return inquirer.prompt(pickToppings).then(gameLogicVeryHard); 
		}
	}

	if (Willa.hungry === true) {
		Willa.checkPizza(res.toppings);

		if(Willa.hungry === false && Shyler.hungry === true) {
			return inquirer.prompt(pickToppings).then(gameLogicVeryHard); 
		}
	}

	if (Shyler.hungry === true) {
		Shyler.checkPizza(res.toppings);
	}

	if (Arno.hungry === true || Willa.hungry === true || Shyler === true) {
		return inquirer.prompt(pickToppings).then(gameLogicVeryHard);
	}

	return console.log("Arno: Have a pizza, PARTY!\nWilla: 1, 2, 3, Go!\nNOM NOM NOM NOM NOM NOM NOM");
}

