const clearButton = document.getElementById('clear');
const input1 = document.getElementById('item1');
const input2 = document.getElementById('item2');
const input3 = document.getElementById('item3');
const input4 = document.getElementById('item4');
const submitButton = document.getElementById('submit');
const listContainer = document.getElementById('listContainer');

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

//testing
class Project {
	constructor(title, description, dueDate, priority) {
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
	}

	doSomething() {
		let list = document.createElement('ul');
		for (let i = 0; i < 4; i++) {
			var item = document.createElement('li');
			item.classList.add('item');
			list.appendChild(item);
		}

		var child = list.querySelectorAll('li');
		child[0].textContent = this.title;
		child[1].textContent = this.description;
		child[2].textContent = this.dueDate;
		child[3].textContent = this.priority;

		listContainer.appendChild(list);
	}
}

const liMaker = (text) => {
	let list = document.createElement('ul');
	for (let i = 0; i < 4; i++) {
		var item = document.createElement('li');
		item.classList.add('item');
		list.appendChild(item);
	}

	var child = list.querySelectorAll('li');
	child[0].textContent = text.title;
	child[1].textContent = text.description;
	child[2].textContent = text.dueDate;
	child[3].textContent = text.priority;

	listContainer.appendChild(list);
};

submitButton.addEventListener('click', function(e) {
	e.preventDefault();
	if (input1.value !== '' && input2.value !== '') {
		//testing
		let proj = new Project(input1.value, input2.value, input3.value, input4.value);
		itemsArray.push(proj);
		localStorage.setItem('items', JSON.stringify(itemsArray));
		//liMaker(proj);
		proj.doSomething();

		input1.value = '';
		input2.value = '';
		input3.value = '';
		input4.value = '';
	}
});

data.forEach((item) => {
	liMaker(item);
});

clearButton.addEventListener('click', function() {
	localStorage.clear();
	while (listContainer.firstChild) {
		listContainer.removeChild(listContainer.firstChild);
	}
});
