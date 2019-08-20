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

const projectsContainer = document.getElementById('projectsContainer');
const formContainerNewProject = document.getElementById('formContainerNewProject');const clearButton = document.getElementById('clear');
const input1 = document.getElementById('item1');
const input2 = document.getElementById('item2');
const input3 = document.getElementById('item3');
input3.valueAsDate = new Date();

const radio1 = document.getElementById('radio1');
const radio2 = document.getElementById('radio2');
const radio3 = document.getElementById('radio3');
const submitButton = document.getElementById('submit');
const listContainer = document.getElementById('listContainer');

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
	constructor(title, type) {
		this.title = title.toUpperCase();
		this.type = type;
	}
}

//todos
class ProjectToDos {
	constructor(title, description, dueDate, priority, type, current) {
		this.title = title.toUpperCase();
		this.description = description.charAt(0).toUpperCase() + description.slice(1);
		this.dueDate = dueDate;
		this.priority = priority;
		this.type = type;
		this.current = current;
	}
}

//new Project button
newProjectButton.addEventListener('click', function (e) {
	formContainerNewProject.style.display = 'block';
});

//Submit new project
submitNewProject.addEventListener('click', function (e) {
	e.preventDefault();

	let projectMain = new Project(item1NewProject.value, 'project');

	itemsArray.push(projectMain);

	localStorage.setItem('items', JSON.stringify(itemsArray));
	listMakerProjects(projectMain);

	item1NewProject.value = '';
	formContainerNewProject.style.display = 'none';
});

//display projects
const listMakerProjects = (text) => {
	let item = document.createElement('p');
	item.id = text.title;
	projectsListDiv.appendChild(item);
	item.textContent = text.title;

	//delete button
	var btn = document.createElement('BUTTON');
	btn.classList.add('btn-delete');
	btn.textContent = 'Delete';
	item.appendChild(btn);

	btn.addEventListener('click', () => {
		deleteList(text.title);
		item.remove();
	});

	//close button
	var btnClose = document.createElement('BUTTON');
	btnClose.textContent = 'Close';
	item.appendChild(btnClose);

	btnClose.addEventListener('click', () => {
		projectsListDiv.appendChild(currentProject);
		currentProject.classList.toggle('currentProject');
		currentProject = listContainer;
		//gets back the everyday tasks
		listContainer.style.display = 'block';
	});

	//open
	var btnOpen = document.createElement('BUTTON');
	btnOpen.classList.add('btn-delete');
	btnOpen.textContent = 'Open';
	item.appendChild(btnOpen);

	btnOpen.addEventListener('click', () => {
		currentProject = document.getElementById(item.id);
		currentProject.classList.add('currentProject');
		projectsContainer.appendChild(currentProject);
		//displays only the working project
		listContainer.style.display = 'none';
	});
};

//clear the description default on click
input2.addEventListener('click', function (e) {
	input2.value = '';
});

//display todos
const listMaker = (text) => {
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
	//edit
	child[1].contentEditable = 'true';
	child[2].textContent = text.dueDate;
	child[3].textContent = text.priority;

	currentProject = document.getElementById(text.current);
	currentProject.appendChild(list);

	//delete button
	var btn = document.createElement('BUTTON');
	btn.classList.add('btn-delete');
	btn.textContent = 'Delete';
	list.appendChild(btn);

	btn.addEventListener('click', () => {
		deleteList(text.title, text.current);
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
	if (input1.value !== '') {
		if (input2.value === 'Description') {
			input2.value = '';
		}
		let proj = new ProjectToDos(input1.value, input2.value, input3.value, checked(), 'todo', currentProject.id);
		//don't delete use for webpack
		//let proj = new mod.ProjectToDos(input1.value, input2.value, input3.value, checked());
		itemsArray.push(proj);

		localStorage.setItem('items', JSON.stringify(itemsArray));
		listMaker(proj);

		//reset to default after entry
		input1.value = '';
		input2.value = 'Description';
		input3.valueAsDate = new Date();
		radio1.checked = true;
	}
});

//Display after reload
data.forEach((item) => {
	if (item.type === 'project') {
		listMakerProjects(item);
	} else if (item.type === 'todo') {
		listMaker(item);
	}
});

currentProject = listContainer;

//Delete
function deleteList(listTitle, project) {
	for (let i = 0; i < itemsArray.length; i++) {
		if (itemsArray[i].title === listTitle && itemsArray[i].current === project) {
			itemsArray.splice([i], 1);
			localStorage.setItem('items', JSON.stringify(itemsArray));
		}
	}
}

//don't delete will use for webpack
/*
const mod = (() => {
	class ProjectToDos {
		constructor(title, description, dueDate, priority) {
			this.title = title;
			this.description = description;
			this.dueDate = dueDate;
			this.priority = priority;
		}

		
	}

	return {
		ProjectToDos
	};
})();
*/
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
	constructor(title, type) {
		this.title = title.toUpperCase();
		this.type = type;
	}
}

//todos
class ProjectToDos {
	constructor(title, description, dueDate, priority, type, current) {
		this.title = title.toUpperCase();
		this.description = description.charAt(0).toUpperCase() + description.slice(1);
		this.dueDate = dueDate;
		this.priority = priority;
		this.type = type;
		this.current = current;
	}
}

//new Project button
newProjectButton.addEventListener('click', function (e) {
	formContainerNewProject.style.display = 'block';
});

//Submit new project
submitNewProject.addEventListener('click', function (e) {
	e.preventDefault();

	let projectMain = new Project(item1NewProject.value, 'project');

	itemsArray.push(projectMain);

	localStorage.setItem('items', JSON.stringify(itemsArray));
	listMakerProjects(projectMain);

	item1NewProject.value = '';
	formContainerNewProject.style.display = 'none';
});

//display projects
const listMakerProjects = (text) => {
	let item = document.createElement('p');
	item.id = text.title;
	projectsListDiv.appendChild(item);
	item.textContent = text.title;

	//delete button
	var btn = document.createElement('BUTTON');
	btn.classList.add('btn-delete');
	btn.textContent = 'Delete';
	item.appendChild(btn);

	btn.addEventListener('click', () => {
		deleteList(text.title);
		item.remove();
	});

	//close button
	var btnClose = document.createElement('BUTTON');
	btnClose.textContent = 'Close';
	item.appendChild(btnClose);

	btnClose.addEventListener('click', () => {
		projectsListDiv.appendChild(currentProject);
		currentProject.classList.toggle('currentProject');
		currentProject = listContainer;
		//gets back the everyday tasks
		listContainer.style.display = 'block';
	});

	//open
	var btnOpen = document.createElement('BUTTON');
	btnOpen.classList.add('btn-delete');
	btnOpen.textContent = 'Open';
	item.appendChild(btnOpen);

	btnOpen.addEventListener('click', () => {
		currentProject = document.getElementById(item.id);
		currentProject.classList.add('currentProject');
		projectsContainer.appendChild(currentProject);
		//displays only the working project
		listContainer.style.display = 'none';
	});
};

//clear the description default on click
input2.addEventListener('click', function (e) {
	input2.value = '';
});

//display todos
const listMaker = (text) => {
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
	//edit
	child[1].contentEditable = 'true';
	child[2].textContent = text.dueDate;
	child[3].textContent = text.priority;

	currentProject = document.getElementById(text.current);
	currentProject.appendChild(list);

	//delete button
	var btn = document.createElement('BUTTON');
	btn.classList.add('btn-delete');
	btn.textContent = 'Delete';
	list.appendChild(btn);

	btn.addEventListener('click', () => {
		deleteList(text.title, text.current);
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
	if (input1.value !== '') {
		if (input2.value === 'Description') {
			input2.value = '';
		}
		let proj = new ProjectToDos(input1.value, input2.value, input3.value, checked(), 'todo', currentProject.id);
		//don't delete use for webpack
		//let proj = new mod.ProjectToDos(input1.value, input2.value, input3.value, checked());
		itemsArray.push(proj);

		localStorage.setItem('items', JSON.stringify(itemsArray));
		listMaker(proj);

		//reset to default after entry
		input1.value = '';
		input2.value = 'Description';
		input3.valueAsDate = new Date();
		radio1.checked = true;
	}
});

//Display after reload
data.forEach((item) => {
	if (item.type === 'todo') {
		listMaker(item);
	} else if (item.type === 'project') {
		listMakerProjects(item);
	}
});



//Delete
function deleteList(listTitle, project) {
	for (let i = 0; i < itemsArray.length; i++) {
		if (itemsArray[i].title === listTitle && itemsArray[i].current === project) {
			itemsArray.splice([i], 1);
			localStorage.setItem('items', JSON.stringify(itemsArray));
		}
	}
}

//don't delete will use for webpack
/*
const mod = (() => {
	class ProjectToDos {
		constructor(title, description, dueDate, priority) {
			this.title = title;
			this.description = description;
			this.dueDate = dueDate;
			this.priority = priority;
		}

		
	}

	return {
		ProjectToDos
	};
})();
*/
