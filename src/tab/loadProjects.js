import { createElement } from "../modules/utility.js";
import { getStorageData } from "../modules/storage.js";

function getProjectElement(project) {
  const p = createElement("p", {
    classes: ["project"],
    text: project.name
  });
  p.setAttribute("data-id", project.id);

  return p;
}

function renderProjects() {
  const projects = Object.values( getStorageData() );
  const projectLabels = createElement("div", { classes: ["projectLabels"] });

  for (const project of projects) {
    projectLabels.appendChild( getProjectElement(project) );
  }

  const content = document.querySelector(".content");
  content.textContent = "";
  content.appendChild(projectLabels);
}

export { renderProjects };