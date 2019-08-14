const clearButton = document.getElementById('clear');
const input1 = document.getElementById('item1');
const input2 = document.getElementById('item2');
const input3 = document.getElementById('item3');
input3.valueAsDate = new Date();

const radio1 = document.getElementById('radio1');
const radio2 = document.getElementById('radio2');
const radio3 = document.getElementById('radio3');
const submitButton = document.getElementById('submit');
const listContainer = document.getElementById('listContainer');

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

//testing
class Project {
	constructor(title, description, dueDate, priority) {
		this.title = title.toUpperCase();
		this.description = description.charAt(0).toUpperCase() + description.slice(1);
		this.dueDate = dueDate;
		this.priority = priority;
	}
}

//clear the text field on click
input2.addEventListener('click', function (e) {
	input2.value = '';
});



//display after reload
const liMaker = (text) => {
	let list = document.createElement('div');
	list.classList.add('list');
	for (let i = 0; i < 4; i++) {
		var item = document.createElement('p');
		item.classList.add('item');
		list.appendChild(item);
	}

	var child = list.querySelectorAll('p');
	child[0].textContent = text.title;
	child[1].textContent = text.description;
	child[2].textContent = text.dueDate;
	child[3].textContent = text.priority;

	listContainer.appendChild(list);

	//delete button
	var btn = document.createElement('BUTTON');
	btn.classList.add('btn-delete');
	btn.textContent = 'Delete';
	list.appendChild(btn);

	btn.addEventListener('click', () => {
		deleteList(text.title);
		list.remove();
	});
};

//Checks which button is checked
const checked = () => {
	if (document.getElementById('radio1').checked) {
		return radio1.value;
	} else if (document.getElementById('radio2').checked) {
		return radio2.value;
	} else if (document.getElementById('radio3').checked) {
		return radio3.value;
	}
};

//Submit
submitButton.addEventListener('click', function (e) {
	e.preventDefault();
	if (input1.value !== '' && input2.value !== '') {
		let proj = new Project(input1.value, input2.value, input3.value, checked());
		//don't delete use for webpack
		//let proj = new mod.Project(input1.value, input2.value, input3.value, input4.value);
		itemsArray.push(proj);
		localStorage.setItem('items', JSON.stringify(itemsArray));
		liMaker(proj);

		//reset to default after entry
		input1.value = '';
		input2.value = 'Description';
		input3.valueAsDate = new Date();
		radio1.checked = true;
	}
});

//Display after reload
data.forEach((item) => {
	liMaker(item);
});

//Delete all
clearButton.addEventListener('click', function () {
	localStorage.clear();
	itemsArray = [];
	while (listContainer.firstChild) {
		listContainer.removeChild(listContainer.firstChild);
	}
});

//Delete
function deleteList(listTitle) {
	for (let i = 0; i < itemsArray.length; i++) {
		if (itemsArray[i].title === listTitle) {
			itemsArray.splice([i], 1);
			localStorage.setItem('items', JSON.stringify(itemsArray));
		}
	}
}

//don't delete will use for webpack
/*
const mod = (() => {
	class Project {
		constructor(title, description, dueDate, priority) {
			this.title = title;
			this.description = description;
			this.dueDate = dueDate;
			this.priority = priority;
		}

		
	}

	return {
		Project
	};
})();
*/
