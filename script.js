const input1 = document.getElementById('item1');
const input2 = document.getElementById('item2');
const input3 = document.getElementById('item3');
input3.valueAsDate = new Date();

const radio1 = document.getElementById('radio1');
const radio2 = document.getElementById('radio2');
const radio3 = document.getElementById('radio3');
const submitButton = document.getElementById('submit');
const listContainer = document.getElementById('listContainer');
const firstTitle = document.getElementById('firstTitle');
const projectsContainer = document.getElementById('projectsContainer');
const formContainerNewProject = document.getElementById('formContainerNewProject');
const projectsListDiv = document.getElementById('projectsListDiv');
const newProjectButton = document.getElementById('newProjectButton');
const submitNewProject = document.getElementById('submitNewProject');
const item1NewProject = document.getElementById('item1NewProject');

//Current project div
var currentProject = listContainer;

//local storage
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

//project
class Project {
	constructor(title, type, current, id) {
		this.title = title.toUpperCase();
		this.type = type;
		this.current = current;
		this.id = id;
	}
}

//todos
class ProjectToDos {
	constructor(title, description, dueDate, priority, type, current, id) {
		this.title = title.toUpperCase();
		this.description = description.charAt(0).toUpperCase() + description.slice(1);
		this.dueDate = dueDate;
		this.priority = priority;
		this.type = type;
		this.current = current;
		this.id = id;
	}
}

//Submit new project
submitNewProject.addEventListener('click', function (e) {
	e.preventDefault();
	if (item1NewProject.checkValidity()) {
		let projectMain = new Project(item1NewProject.value, 'project', projectsListDiv.id, itemsArray.length);
		itemsArray.push(projectMain);

		localStorage.setItem('items', JSON.stringify(itemsArray));
		listMakerProjects(projectMain);

		item1NewProject.value = '';
		formContainerNewProject.style.display = 'none';
	} else {
		formContainerNewProject.style.display = 'none';
	}
});

//Submit todo
submitButton.addEventListener('click', function (e) {
	e.preventDefault();
	if (input1.checkValidity()) {
		if (input2.value === 'Details') {
			input2.value = '';
		}
		let proj = new ProjectToDos(
			input1.value,
			input2.value,
			input3.value,
			checked(),
			'todo',
			currentProject.id,
			itemsArray.length
		);

		itemsArray.push(proj);

		localStorage.setItem('items', JSON.stringify(itemsArray));
		listMaker(proj);

		//reset to default after entry
		input1.value = '';
		input2.value = '';
		input3.valueAsDate = new Date();
		radio1.checked = true;
	}
});

//display projects
const listMakerProjects = (text) => {
	let item = document.createElement('div');
	let itemTitle = document.createElement('h2');

	//don't display todos in projects list
	let nodes = item.getElementsByClassName('list');
	for (let i = 0; i < nodes.length; i++) {
		nodes[i].style.display = 'none';
	}

	item.id = text.id;
	item.classList.add('projectDiv');
	item.appendChild(itemTitle);
	projectsListDiv.appendChild(item);
	itemTitle.textContent = text.title;

	let buttonsDiv = document.createElement('div');
	buttonsDiv.classList.add('buttonsDiv');
	let projectTitleWrap = document.createElement('div');
	projectTitleWrap.classList.add('projectTitleWrap');

	//open/close
	let btnOpen = document.createElement('p');
	btnOpen.classList.add('btn-delete');
	btnOpen.textContent = 'Open';
	item.appendChild(btnOpen);

	btnOpen.addEventListener('click', () => {
		//prevents from opening other project if there is one on
		if (btnOpen.textContent === 'Open' && projectsContainer.children[2] === undefined) {
			currentProject = document.getElementById(item.id);
			currentProject.classList.add('currentProject');
			projectsContainer.appendChild(currentProject);
			//displays only the work project
			listContainer.style.display = 'none';
			btnOpen.textContent = 'Close';
			//change the h1 on top
			firstTitle.textContent = text.title;

			for (let i = 0; i < nodes.length; i++) {
				nodes[i].style.display = 'flex';
			}
		} else if (btnOpen.textContent === 'Close') {
			projectsListDiv.appendChild(currentProject);
			currentProject.classList.toggle('currentProject');
			currentProject = listContainer;
			//gets back the everyday tasks
			listContainer.style.display = 'flex';
			btnOpen.textContent = 'Open';
			//change the h1 on top
			firstTitle.textContent = 'THINGS TO DO';

			for (let i = 0; i < nodes.length; i++) {
				nodes[i].style.display = 'none';
			}
		}
	});

	//delete button
	var btn = document.createElement('p');
	btn.classList.add('btn-delete');
	btn.textContent = 'Delete Project';
	item.appendChild(btn);

	btn.addEventListener('click', () => {
		item.remove();
		deleteList(text.title, text.id);

		//gets back the everyday tasks
		if (currentProject !== listContainer) {
			currentProject = listContainer;
			listContainer.style.display = 'block';
		}
	});

	buttonsDiv.appendChild(btnOpen);
	buttonsDiv.appendChild(btn);
	item.appendChild(buttonsDiv);
	projectTitleWrap.appendChild(itemTitle);
	projectTitleWrap.appendChild(buttonsDiv);
	item.appendChild(projectTitleWrap);
};

//display todos
const listMaker = (text) => {
	currentProject = document.getElementById(text.current);
	let list = document.createElement('div');
	list.classList.add('list');
	for (let i = 0; i < 4; i++) {
		var item = document.createElement('p');
		item.classList.add('item');
		list.appendChild(item);
	}

	//for the animation effect
	setTimeout(function () {
		list.classList.add('show');
	}, 150);

	let child = list.querySelectorAll('p');
	child[0].textContent = text.title;
	child[1].textContent = text.description;
	child[1].style.display = 'none';
	//edit
	child[1].contentEditable = 'true';

	//shows Today if the duedate is today
	input3.valueAsDate = new Date();
	if (input3.value === text.dueDate) {
		child[2].textContent = 'Due: ' + 'Today';
	} else if (input3.value > text.dueDate) {
		child[2].textContent = 'Overdue';
	} else {
		child[2].textContent = 'Due: ' + text.dueDate;
	}
	child[3].textContent = text.priority;
	if (text.priority === 'Can Wait') {
		child[3].style.color = '#81B29A';
	} else if (text.priority === 'ASAP') {
		child[3].style.color = '#CC5803';
	} else {
		child[3].style.color = '#e63946';
	}

	currentProject.appendChild(list);

	//display only ToDos when the project is opened
	if (list.parentNode !== listContainer && listContainer.style.display !== 'none') {
		list.style.display = 'none';
	}

	child[1].addEventListener('click', () => {
		btnReveal.textContent = 'Save Changes';
	});

	//reveal details
	var btnReveal = document.createElement('p');
	btnReveal.classList.add('btnReveal');
	btnReveal.textContent = 'Details';
	list.appendChild(btnReveal);
	btnReveal.style.visibility = 'hidden';
	if (text.description !== '') {
		btnReveal.style.visibility = 'visible';
		btnReveal.addEventListener('click', () => {
			if (child[1].style.display != 'block' && child[1].textContent != '') {
				child[1].style.display = 'block';
				btnReveal.textContent = 'Hide';
				//use the same button to save changes
			} else if (btnReveal.textContent === 'Save Changes') {
				redactingFunction(text.title, text.id, child[1].textContent);
				child[1].style.display = 'none';
				btnReveal.textContent = 'Details';
			} else {
				child[1].style.display = 'none';
				btnReveal.textContent = 'Details';
			}
		});
	}

	//delete button
	var btn = document.createElement('p');
	btn.classList.add('btn-delete-todo');
	btn.textContent = 'Delete';
	list.appendChild(btn);

	btn.addEventListener('click', () => {
		deleteList(text.title, text.id);
		list.remove();
	});
};

//redact content
const redactingFunction = (listTitle, identification, content) => {
	for (let i = 0; i < itemsArray.length; i++) {
		if (itemsArray[i].title === listTitle && itemsArray[i].id === identification) {
			itemsArray[i].description = content;
			localStorage.setItem('items', JSON.stringify(itemsArray));
		}
	}
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

//new Project button
newProjectButton.addEventListener('click', function (e) {
	formContainerNewProject.style.display = 'flex';
});

//Delete
function deleteList(listTitle, identification) {
	for (let i = 0; i < itemsArray.length; i++) {
		if (itemsArray[i].title === listTitle && itemsArray[i].id === identification) {
			itemsArray.splice([i], 1);
			localStorage.setItem('items', JSON.stringify(itemsArray));
		}
	}

	//clear all the orphaned todos if a project is deleted
	itemsArray = itemsArray.filter((element) => document.getElementById(element.current) !== null);

	localStorage.setItem('items', JSON.stringify(itemsArray));
}

//Display after reload
const displayData = () => {
	data.forEach((item) => {
		if (item.type === 'project') {
			listMakerProjects(item);
		} else if (item.type === 'todo') {
			listMaker(item);
		}
	});
};
displayData();
