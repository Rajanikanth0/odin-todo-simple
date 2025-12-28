import { getStorageData, setStorageData } from "./storage.js";

class Project {
  static getProjectPrototype(obj) {
    const project = new Project(
      obj.name,
      obj.description,
      obj.date,
    );
    project.id = obj.id;
    project.done = obj.done;
    project.tasks = obj.tasks;

    return project;
  }

  constructor(name, description, date) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.description = description;
    this.date = date;
    this.done = false;
    this.tasks = {};
  }

  // Return a plain object snapshot of the project
  getData() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      date: this.date,
      done: this.done,
      tasks: this.tasks,
    };
  }

  // Save project data into storage (create or update)
  addData() {
    const data = getStorageData();
    
    data[this.id] = this.getData(); // always create/update
    setStorageData(data);
  }

  // Remove project data from storage
  removeData() {
    const data = getStorageData();

    if (!data[this.id]) {
      console.error(`Project with id {this.id} not found in storage`);
      return;
    }
    
    delete data[this.id];
    setStorageData(data);
  }

  setStatus() {
    const tasks = Object.values(this.tasks);
    const result = tasks.every(task => task.done);

    this.done = result;
    this.addData();
  }

  // Add a task to this project
  addTask(task) {
    this.tasks[task.id] = task.getData();
    this.addData();
  }

  // Remove a task from this project
  removeTask(task) {
    if (this.tasks[task.id]) {
      delete this.tasks[task.id];
      this.addData();
    }
  }
}

class Task {
  static getTaskPrototype(obj) {
    const task = new Task(obj.name);
    task.id = obj.id;
    task.done = obj.done;

    return task;
  }

  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.done = false;
  }

  // Return a plain object snapshot of the task
  getData() {
    return {
      id: this.id,
      name: this.name,
      done: this.done
    };
  }

  toggleStatus() {
    this.done = !this.done;
  }
}

export { Project, Task };