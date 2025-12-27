import { createElement } from "../modules/utility.js";
import { getStorageData } from "../modules/storage.js";

function getProjectElement(project) {
  const p = createElement("p", {
    classes: ["project"],
    text: project.name
  });

  return p;
}

function renderProject() {
  const projects = Object.values( getStorageData() );
  const box = document.createDocumentFragment();

  for (const project of projects) {
    box.appendChild( getProjectElement(project) );
  }

  const content = document.querySelector(".content");
  content.appendChild(box);
}

export { renderProject };