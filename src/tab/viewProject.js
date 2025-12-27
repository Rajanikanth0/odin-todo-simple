import { createElement } from "../modules/utility.js";

function getProjectData() {
  const projectData = createElement("div", { classes: ["projectData"] });

  const title = createElement("h1", {
    classes: ["title"],
    text: "Project Alpha"
  });
  const description = createElement("p", {
    classes: ["description"],
    text: "Internal dashboard for employee productivity."
  });
  const date = createElement("p", {
    classes: ["date"],
    text: "20-02-2025"
  });

  projectData.append(title, description, date);
  return projectData;
}

function getTasks() {
  const tasks = createElement("div", { classes: ["tasks"] });
  const taskData = new Array(2);

  for (const data of taskData) {
    const task = createElement("div", { classes: ["task"] });

    const input = createElement("input");
    input.setAttribute("type", "checkbox");

    const label = createElement("p", {
      text: "Develop authentication module"
    });

    task.append(input, label);
    tasks.appendChild(task);
  }

  return tasks;
}

function renderViewProject() {
  const projectData = getProjectData();
  const tasks = getTasks();

  const viewProject = createElement("div", { classes: ["viewProject"]});
  viewProject.append(projectData, tasks);

  const content = document.querySelector(".content");
  content.appendChild(viewProject);
}

export { renderViewProject };