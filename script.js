const form = document.querySelector('form');
const list1 = document.getElementById('list1');
const list2 = document.getElementById('list2');
const clearButton = document.getElementById('clear');
const input = document.getElementById('item');
const input2 = document.getElementById('item2');
const submitButton = document.getElementById('submit');
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

//testing
class Project {
	constructor(name) {
		this.name = name;
	}

	doSomething() {
		alert(this.name);
	}
}

const liMaker = (text) => {
	const li = document.createElement('li');
	li.textContent = text;

	list1.appendChild(li);
	console.log(li);
};

submitButton.addEventListener('click', function(e) {
	e.preventDefault();
	if (input.value !== '' && input2.value !== '') {
		itemsArray.push(input2.value);
		localStorage.setItem('items', JSON.stringify(itemsArray));
		liMaker(input2.value);

		//testing
		//name = input2.value;
		let p = new Project(input2.value);
		p.doSomething();

		input.value = '';
		input2.value = '';
	}
});

data.forEach((item) => {
	liMaker(item);
});

clearButton.addEventListener('click', function() {
	localStorage.clear();
	while (list1.firstChild) {
		list1.removeChild(list1.firstChild);
	}
});
