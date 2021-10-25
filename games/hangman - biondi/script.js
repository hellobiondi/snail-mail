import {loginGoogle, readFromDatabase, writeToDatabase} from "./module.js";

document.getElementById("loginGoogle").addEventListener("click",loginGoogle);
console.log(sessionStorage.currentUser);
var uid = sessionStorage.currentUser;
var dataList = {};

async function yourFunction(){
    var prop = "users/" + uid;
    var data = await readFromDatabase(prop);
    console.log(data); // {email: 'bokzmmindy@gmail.com', name: 'bok mindy', profile_picture: 'https://lh3.googleusercontent.com/a/AATXAJztuF0yzXyjB2lcv656YraWU00docU31bqpqWTN=s96-c'}
    // dataList["email"] = data.email;
    dataList["name"] = data.name;
    dataList["profile_picture"] = data.profile_picture;
}



const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['afghanistan', 'albania', 'algeria', 'andorra', 'angola', 'anguilla', 'antarctica', 'argentina', 'armenia', 'aruba', 'australia', 'austria', 'azerbaijan', 'bahamas', 'bahrain', 'bangladesh', 'barbados', 'belarus', 'belgium', 'belize', 'benin', 'bermuda', 'bhutan', 'bolivia', 'bosnia', 'botswana', 'brazil', 'brunei', 'bulgaria', 'burundi', 'cambodia', 'cameroon', 'canada', 'capeverde', 'caymanislands', 'chad', 'chile', 'china', 'christmasisland', 'colombia', 'comoros', 'congo', 'cook islands', 'croatia', 'cuba', 'cyprus', 'czechrepublic', 'denmark', 'djibouti', 'dominica', 'ecuador', 'egypt', 'elsalvador', 'eritrea', 'estonia', 'ethiopia', 'falklandislands', 'faroeislands', 'fiji', 'finland', 'france', 'gabon', 'gambia', 'georgia', 'germany', 'ghana', 'gibraltar', 'greece', 'greenland', 'grenada', 'guadeloupe', 'guam', 'guatemala', 'guinea', 'guyana', 'haiti', 'honduras', 'hongkong', 'hungary', 'iceland', 'india', 'indonesia', 'iran', 'iraq', 'ireland', 'israel', 'italy', 'jamaica', 'japan', 'jordan', 'kazakhstan', 'kenya', 'kiribati', 'northkorea', 'korea', 'kuwait', 'kyrgyzstan', 'laos', 'latvia', 'lebanon', 'lesotho', 'liberia', 'libya', 'liechtenstein', 'lithuania', 'luxembourg', 'macao', 'macedonia', 'madagascar', 'malawi', 'malaysia', 'maldives', 'mali', 'malta', 'marshallislands', 'martinique', 'mauritania', 'mauritius', 'mayotte', 'mexico', 'micronesia', 'moldova', 'monaco', 'mongolia', 'montserrat', 'morocco', 'mozambique', 'myanmar', 'namibia', 'nauru', 'nepal', 'netherlands', 'newcaledonia', 'newzealand', 'nicaragua', 'niger', 'nigeria', 'niue', 'norfolkisland', 'norway', 'oman', 'pakistan', 'palau', 'palestine', 'panama', 'newguinea', 'paraguay', 'peru', 'philippines', 'pitcairn', 'poland', 'portugal', 'puertorico', 'qatar', 'romania', 'russia', 'rwanda', 'sainthelena', 'saintlucia', 'samoa', 'saudiarabia', 'senegal', 'serbia', 'seychelles', 'sierraleone', 'singapore', 'slovakia', 'slovenia', 'solomonislands', 'somalia', 'southafrica', 'spain', 'srilanka', 'sudan', 'suriname', 'svalbard', 'swaziland', 'sweden', 'switzerland', 'syria', 'taiwan', 'tajikistan', 'tanzania', 'thailand', 'timor', 'togo', 'tokelau', 'tonga', 'trinidad', 'tunisia', 'turkey', 'turkmenistan', 'tuvalu', 'uganda', 'ukraine', 'unitedkingdom', 'unitedstates', 'uruguay', 'uzbekistan', 'vanuatu', 'vietnam', 'yemen', 'zimbabwe'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];
var score = 0;

// Show hidden word
function displayWord() {
	wordEl.innerHTML = `
    ${selectedWord
			.split('')
			.map(
				letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
			)
			.join('')}
  `;

	const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

	if (innerWord === selectedWord) {
		finalMessage.innerText = 'Congratulations! You won! 😃';
		finalMessageRevealWord.innerText = '';
		popup.style.display = 'flex';
		score += 1;
		writeToDatabase("games/hangman/game0001/score0001", score);
		playable = false;
	}
}

// Update the wrong letters
function updateWrongLettersEl() {
	// Display wrong letters
	wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

	// Display parts
	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;

		if (index < errors) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	});

	// Check if lost
	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = 'Unfortunately you lost. 😕';
		finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
		popup.style.display = 'flex';

		playable = false;
	}
}

// Show notification
function showNotification() {
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
}

// Keydown letter press
window.addEventListener('keydown', e => {
	if (playable) {
		if (e.keyCode >= 65 && e.keyCode <= 90) {
			const letter = e.key.toLowerCase();

			if (selectedWord.includes(letter)) {
				if (!correctLetters.includes(letter)) {
					correctLetters.push(letter);

					displayWord();
				} else {
					showNotification();
				}
			} else {
				if (!wrongLetters.includes(letter)) {
					wrongLetters.push(letter);

					updateWrongLettersEl();
				} else {
					showNotification();
				}
			}
		}
	}
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
	playable = true;

	//  Empty arrays
	correctLetters.splice(0);
	wrongLetters.splice(0);

	selectedWord = words[Math.floor(Math.random() * words.length)];

	displayWord();

	updateWrongLettersEl();

	popup.style.display = 'none';
});

displayWord();