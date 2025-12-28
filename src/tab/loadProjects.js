import { createElement } from "../modules/utility.js";
import { getStorageData } from "../modules/storage.js";
import { Project } from "../modules/project.js";

function getProjectElement(project) {
  const p = createElement("p", {
    classes: ["project"],
    text: project.name
  });
  p.setAttribute("data-id", project.id);

  return p;
}

function getFormData(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Array.from( formData.values() );

  const project = new Project(...data);
  project.addData();

  renderProjects();
}

function getProjectForm() {
  const name = createElement("input");
  name.setAttribute("name", "name");
  name.setAttribute("placeholder", "Name...");
  name.required = true;

  const description = createElement("input");
  description.setAttribute("name", "description");
  description.setAttribute("placeholder", "Description...");

  const date = createElement("input");
  date.setAttribute("type", "date");
  date.setAttribute("name", "date");

  const button = createElement("button", {text: "Save"});
  button.setAttribute("type", "submit");

  const form = createElement("form");
  form.addEventListener("submit", getFormData);

  form.append(name, description, date, button);

  return form;
}

function renderCreateProject(e) {
  const target = e.target;
  const targetParent = target.parentElement;
  targetParent.removeChild(target);

  const formElement = getProjectForm();
  
  targetParent.appendChild(formElement);
}

function getCreateButton() {
  const createProjectContainer = createElement("div", { classes: ["createProjectContainer"]});

  const createProjectButton = createElement("button", {
    classes: ["createProjectButton"],
    text: "New Project"
  });

  createProjectButton.addEventListener("click", renderCreateProject);

  createProjectContainer.appendChild(createProjectButton);
  return createProjectContainer;
}

function renderProjects() {
  const projects = Object.values( getStorageData() );
  const projectLabels = createElement("div", { classes: ["projectLabels"] });
  const createButton = getCreateButton();

  for (const project of projects) {
    projectLabels.appendChild( getProjectElement(project) );
  }

  const content = document.querySelector(".content");
  content.textContent = "";
  content.append(projectLabels, createButton);
}

export { renderProjects };