import { createElement } from "../modules/utility.js";

function getProject() {
  const p = createElement("p", {
    classes: ["project"],
    text: "Project Alpha"
  });

  return p;
}

function renderProject() {
  const array = new Array(4);
  const box = document.createDocumentFragment();

  for (const project of array) {
    box.appendChild( getProject() );
  }

  const content = document.querySelector(".content");
  content.appendChild(box);
}

export { renderProject };