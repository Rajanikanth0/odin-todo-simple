import { Project, Task } from "./project.js";

// Define projects with their tasks
const projectsData = [
  {
    name: "Project Alpha",
    description: "A prototype web app for tracking daily habits.",
    date: "15-01-2025",
    tasks: [
      "Design wireframe",
      "Set up database schema",
      "Implement login system"
    ]
  },
  {
    name: "Project Beta",
    description: "Mobile app for food delivery with dummy data.",
    date: "28-02-2025",
    tasks: [
      "Create UI mockups",
      "Integrate map API",
      "Add order tracking feature",
      "Run performance tests"
    ]
  },
  {
    name: "Project Gamma",
    description: "Internal dashboard for employee productivity.",
    date: "10-03-2025",
    tasks: [
      "Develop authentication module",
      "Build analytics charts"
    ]
  },
  {
    name: "Project Delta",
    description: "E-commerce demo site with sample products.",
    date: "25-04-2025",
    tasks: [
      "Design product catalog",
      "Set up shopping cart",
      "Integrate payment gateway",
      "Perform usability testing"
    ]
  }
];

// Create projects and add tasks
const projects = projectsData.map(data => {
  const project = new Project(data.name, data.description, data.date);
  data.tasks.forEach(taskName => project.addTask( new Task(taskName) ));
  return project;
});

function addProjects() {
  projects.forEach(project => project.addData());
}

export { addProjects };