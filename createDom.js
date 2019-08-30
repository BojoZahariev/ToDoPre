const createDom = () => {
    //form
    let formDiv = document.createElement('form');
    formDiv.id = 'formContainer';

    let inputTitle = document.createElement('input');
    inputTitle.id = 'item1';
    inputTitle.type = 'text';
    inputTitle.placeholder = "Title";
    formDiv.appendChild(inputTitle);

    let inputDetails = document.createElement('textarea');
    inputDetails.id = 'item2';
    inputDetails.rows = '1';
    inputDetails.cols = '20';
    inputDetails.placeholder = "Details";
    formDiv.appendChild(inputDetails);

    let inputDate = document.createElement('input');
    inputDate.id = 'item3';
    inputDate.type = 'date';
    formDiv.appendChild(inputDate);

    //Radio buttons
    let radioBigContainer = document.createElement('div');
    radioBigContainer.id = 'radioBigContainer';

    //label1
    let label1 = document.createElement('label');
    label1.classList.add('radioContainer');
    label1.textContent = 'Can Wait';

    let labelInput1 = document.createElement('input');
    labelInput1.id = 'radio1';
    labelInput1.value = 'Can Wait';
    labelInput1.type = 'radio';
    labelInput1.checked = true;
    labelInput1.name = 'radio';

    let checkmark1 = document.createElement('span');
    checkmark1.classList.add('checkmark');

    label1.appendChild(labelInput1);
    label1.appendChild(checkmark1);

    //label2
    let label2 = document.createElement('label');
    label2.classList.add('radioContainer');
    label2.textContent = 'ASAP';

    let labelInput2 = document.createElement('input');
    labelInput2.id = 'radio2';
    labelInput2.value = 'ASAP';
    labelInput2.type = 'radio';
    labelInput2.name = 'radio';

    let checkmark2 = document.createElement('span');
    checkmark2.classList.add('checkmark');

    label2.appendChild(labelInput2);
    label2.appendChild(checkmark2);

    //label3
    let label3 = document.createElement('label');
    label3.classList.add('radioContainer');
    label3.textContent = 'URGENT';

    let labelInput3 = document.createElement('input');
    labelInput3.id = 'radio3';
    labelInput3.value = 'URGENT';
    labelInput3.type = 'radio';
    labelInput3.name = 'radio';

    let checkmark3 = document.createElement('span');
    checkmark3.classList.add('checkmark');

    label3.appendChild(labelInput3);
    label3.appendChild(checkmark3);

    radioBigContainer.appendChild(label1);
    radioBigContainer.appendChild(label2);
    radioBigContainer.appendChild(label3);

    //submit button
    let submitFormButton = document.createElement('p');
    submitFormButton.id = 'submit';
    submitFormButton.textContent = 'SUBMIT';

    formDiv.appendChild(radioBigContainer);
    formDiv.appendChild(submitFormButton);

    //main content
    //left and right big container
    let smallContainer = document.createElement('div');

    //Left
    //big container
    let projectsContainer = document.createElement('div');
    projectsContainer.id = 'projectsContainer';
    let title1 = document.createElement('h1');
    title1.classList.add('titles');
    title1.id = 'firstTitle';
    title1.textContent = 'THINGS TO DO';

    let listContainer = document.createElement('div');

    projectsContainer.appendChild(title1);
    projectsContainer.appendChild(listContainer);

    //Right
    //big container
    let projectsListContainer = document.createElement('div');
    projectsListContainer.id = 'projectsListContainer';

    let projectsBigContainer = document.createElement('div');
    projectsBigContainer.id = 'projectsBigContainer';

    let title2 = document.createElement('h1');
    title2.classList.add('titles');
    title2.textContent = 'PROJECTS';

    projectsBigContainer.appendChild(title2);

    //form
    let newProjectFormContainer = document.createElement('div');
    newProjectFormContainer.id = 'newProjectFormContainer';
    let newProjectButton = document.createElement('p');
    newProjectButton.id = 'newProjectButton';
    newProjectButton.textContent = 'NEW PROJECT';

    newProjectFormContainer.appendChild(newProjectButton);

    let formContainerNewProject = document.createElement('form');
    formContainerNewProject.id = 'formContainerNewProject';

    let item1NewProject = document.createElement('input');
    item1NewProject.id = 'item1NewProject';
    item1NewProject.type = 'text';
    item1NewProject.placeholder = 'Title';

    let submitNewProject = document.createElement('p');
    submitNewProject.id = 'submitNewProject';
    submitNewProject.classList.add('btn-delete');
    submitNewProject.textContent = 'SUBMIT';

    formContainerNewProject.appendChild(item1NewProject);
    formContainerNewProject.appendChild(submitNewProject);

    newProjectFormContainer.appendChild(formContainerNewProject);

    //projects list
    let projectsListDiv = document.createElement('div');
    projectsListDiv.id = 'projectsListDiv';

    projectsBigContainer.appendChild(newProjectFormContainer);
    projectsListContainer.appendChild(projectsBigContainer);

    smallContainer.appendChild(projectsContainer);
    smallContainer.appendChild(projectsListContainer);

    //wrapper
    let wrapper = document.createElement('div');
    wrapper.id = 'wrapper'

    wrapper.appendChild(formDiv);
    wrapper.appendChild(smallContainer);

    return wrapper

};

export {
    createDom
}
