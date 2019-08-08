const form = document.querySelector('form');
const ul = document.querySelector('ul');
const clearButton = document.getElementById('clear');
const input = document.getElementById('item');
const submitButton = document.getElementById('submit');
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

const liMaker = (text) => {
	const li = document.createElement('li');
	li.textContent = text;

	ul.appendChild(li);
	console.log(li);
};

submitButton.addEventListener('click', function(e) {
	e.preventDefault();
	if (input.value !== '') {
		itemsArray.push(input.value);
		localStorage.setItem('items', JSON.stringify(itemsArray));
		liMaker(input.value);
		input.value = '';
	}
});

data.forEach((item) => {
	liMaker(item);
});

clearButton.addEventListener('click', function() {
	localStorage.clear();
	while (ul.firstChild) {
		ul.removeChild(ul.firstChild);
	}
});
