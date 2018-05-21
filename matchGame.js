window.onload = function () {
	// Shortcut to get elements, this will be in literally every .js file I write
	const el = (element) => {
		if (element.charAt(0) === "#") { // If passed an ID...
			return document.querySelector(element); // ... returns single element
		} else {
			return document.querySelectorAll(element); // Otherwise, returns a nodelist
		}
	};

	// Array of objects to store card values and asset paths
	const cardsArray = [{
		'name': 'mario',
		'img': 'assets/mario.png',
	},
	{
		'name': 'luigi',
		'img': 'assets/luigi.png',
	},
	{
		'name': 'peach',
		'img': 'assets/peach.png',
	},
	{
		'name': 'toad',
		'img': 'assets/toad.png',
	},
	{
		'name': 'rosalina',
		'img': 'assets/rosalina.png',
	},
	{
		'name': 'daisy',
		'img': 'assets/daisy.png',
	},
	{
		'name': 'wario',
		'img': 'assets/wario.png',
	},
	{
		'name': 'waluigi',
		'img': 'assets/waluigi.png',
	},
	{
		'name': 'yoshi',
		'img': 'assets/yoshi.png',
	},
	{
		'name': 'donkeykong',
		'img': 'assets/donkeykong.png',
	},
	{
		'name': 'bowser',
		'img': 'assets/bowser.png',
	},
	{
		'name': 'bowserjr',
		'img': 'assets/bowserjr.png',
	}
	];

	// Dupes array to have multiple cards, randomizes order
	let gameGrid = cardsArray.concat(cardsArray).sort(() => {
		return 0.5 - Math.random();
	});

	// Initialize variables that will be referenced by many functions.
	let guess1 = '';
	let guess2 = '';
	let count = 0;
	let previousTarget = null;
	let delay = 1500;
	let clicks = 0;
	let matched = 0;

	// Create section that will have grid CSS applied
	let game = el("#game");
	let grid = document.createElement('section');
	grid.setAttribute('class', 'grid');
	//Attach grid to game
	game.appendChild(grid);

	// Constructs layout from randomized deck, attaches CSS
	gameGrid.forEach(item => {
		let name = item.name;
		let img = item.img;

		let card = document.createElement('div');
		card.classList.add('card');
		card.dataset.name = name;

		let back = document.createElement('div');
		back.classList.add('back');

		let front = document.createElement('div');
		front.classList.add('front');
		front.style.backgroundImage = 'url(' + img + ')';

		grid.appendChild(card);
		card.appendChild(back);
		card.appendChild(front);
	});

	// Helper function to add match class
	const match = () => {
		let selected = el(".selected");
		selected.forEach(card => {
			card.classList.add('match');
		});
	};

	// Helper function to reset values for more guessing
	const resetGuess = () => {
		guess1 = '';
		guess2 = '';
		count = 0;
		previousTarget = null;

		let selected = el('.selected');
		selected.forEach(card => {
			card.classList.remove('selected');
		});
	};

	// Helper function to determine win and display message
	const youWin = () => {
		el("#youwin").innerHTML = `Congratulations! You clicked ${clicks} times!`
	}


	// Body of the functionality

	grid.addEventListener('click', event => {
		let clicked = event.target;

		/* Checks for a number of invalid clicking selections,
		breaks if true */
		if (clicked.nodeName === 'SECTION' ||
			clicked === previousTarget ||
			clicked.parentNode.classList.contains('selected') ||
			clicked.parentNode.classList.contains('match')) {
			return;
		}

		// Prevents more than two clicks
		if (count < 2) {
			count++;
			/* Increments click variable and displays,
			but not for every click on the page */
			clicks++
			el("#clicks").innerHTML = `Clicks: ${clicks}`

			// Is this guess 1 or guess 2?
			if (count === 1) {
				guess1 = clicked.parentNode.dataset.name;
				console.log(guess1);
				clicked.parentNode.classList.add('selected');
			} else {
				guess2 = clicked.parentNode.dataset.name;
				console.log(guess2);
				clicked.parentNode.classList.add('selected');
			}


			// We're not trying to match an empty value, are we?
			if (guess1 && guess2) {
				/* Helper functions are called here
				Let them memorize the card before it flips! */
				if (guess1 === guess2) {
					setTimeout(match, delay);
					matched++;
					console.log(matched)
					el("#matches").innerHTML = `Matches: ${matched}`;

				}
				setTimeout(resetGuess, delay);
			}

			// Don't click the same card twice, cheater
			previousTarget = clicked;

			if (matched === 12) {
				youWin();
			}
		};
	});
	newGame()
}

const newGame = () => {
    document.getElementById("button").addEventListener('click', (e) => {
		location.reload();

    }, false);
};
