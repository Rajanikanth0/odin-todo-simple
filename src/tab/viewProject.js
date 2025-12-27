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

function renderViewProject(project) {
  const projectData = getProjectData(project);
  const tasks = getTasks(project);

  const toggleTaskStatus = (e) => {
    const target = e.target.closest(".task");
    if (!target) return;

    const projectObject = Project.getProjectPrototype(project);
    const taskObject = Task.getTaskPrototype(project.tasks[target.dataset.id]);
    taskObject.toggleStatus();

    projectObject.addTask(taskObject);
  }
  tasks.addEventListener("click", toggleTaskStatus);

  const viewProject = createElement("div", { classes: ["viewProject"]});
  viewProject.append(projectData, tasks);

  const content = document.querySelector(".content");
  content.textContent = "";
  content.appendChild(viewProject);
}

export { renderViewProject };