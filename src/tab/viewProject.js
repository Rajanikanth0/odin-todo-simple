import { createElement } from "../modules/utility.js";
import { Project, Task } from "../modules/project.js";

function getProjectData(project) {
  const projectData = createElement("div", { classes: ["projectData"] });

  const title = createElement("h1", {
    classes: ["title"],
    text: project.name
  });
  const description = createElement("p", {
    classes: ["description"],
    text: project.description
  });
  const date = createElement("p", {
    classes: ["date"],
    text: project.date
  });

  projectData.append(title, description, date);
  return projectData;
}

function getTasks(project) {
  const tasks = createElement("div", { classes: ["tasks"] });
  const taskData = Object.values(project.tasks);

  for (const data of taskData) {
    const task = createElement("div", { classes: ["task"] });
    task.setAttribute("data-id", data.id);

    const input = createElement("input");
    input.setAttribute("type", "checkbox");
    input.checked = data.done;

    const label = createElement("p", {
      text: data.name
    });

    task.append(input, label);
    tasks.appendChild(task);
  }

  return tasks;
}

function renderCreateTask(e, projectData) {
  const target = e.target;
  const targetParent = target.parentElement;
  targetParent.removeChild(target);

  const input = createElement("input", { classes: ["createTaskInput"] });
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Name..");
  
  const saveTaskButton = createElement("button", {
    classes: ["saveTaskButton"],
    text: "Save"
  });

  saveTaskButton.addEventListener("click", (e) => {
    const inputValue = targetParent.querySelector(".createTaskInput").value;
    if (!inputValue) return;
    
    const task = new Task(inputValue);

    const projectObject = Project.getProjectPrototype(projectData);
    projectObject.addTask(task);

    renderViewProject(projectData);
  });

  targetParent.append(input, saveTaskButton);
}

function getCreateButton(projectData) {
  const createTaskContainer = createElement("div", { classes: ["createTaskContainer"]});

  const createTaskButton = createElement("button", {
    classes: ["createTaskButton"],
    text: "New Task"
  });

  createTaskButton.addEventListener("click", (e) => renderCreateTask(e, projectData));

  createTaskContainer.appendChild(createTaskButton);
  return createTaskContainer;
}

function toggleTaskStatus(e, projectData) {
  const target = e.target.closest(".task");
  if (!target) return;

  const projectObject = Project.getProjectPrototype(projectData);
  const taskObject = Task.getTaskPrototype(projectData.tasks[target.dataset.id]);
  taskObject.toggleStatus();

  target.querySelector("input").checked = taskObject.done;

  projectObject.addTask(taskObject);
}

function renderViewProject(project) {
  const projectData = getProjectData(project);
  const tasks = getTasks(project);
  const createButton = getCreateButton(project);
  
  tasks.addEventListener("click", (e) => toggleTaskStatus(e, project));

  const viewProject = createElement("div", { classes: ["viewProject"]});
  viewProject.append(projectData, tasks, createButton);

  const content = document.querySelector(".content");
  content.textContent = "";
  content.appendChild(viewProject);
}

export { renderViewProject };