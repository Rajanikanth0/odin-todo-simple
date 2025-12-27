import "./styles.css";
import { addProjects } from "./tab/initialProjects.js";
import { renderProjects } from "./tab/loadProjects.js";
import { renderViewProject } from "./tab/viewProject.js";
import { getStorageData } from "./modules/storage.js";

const data = getStorageData();

if (!Object.keys(data).length) {
  // initial projects data into localStorage
  addProjects();
}

// render projects from localStorage
renderProjects();

function renderProjectData(e) {
  const target = e.target.closest(".project");
  if (!target) return;

  const data = getStorageData();
  const project = data[target.dataset.id];
  renderViewProject(project);
}

const content = document.querySelector(".content");
content.addEventListener("click", renderProjectData);