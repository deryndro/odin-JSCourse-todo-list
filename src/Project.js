export default class Project {
  constructor(id, projectName) {
    this.id = id;
    this.projectName = projectName;
    this._storage = [];
    this.priorityCounter = 0;
    this.todolistCounter = 0;
  }

  deleteStorage(id) {
    const index = this._storage.findIndex((e) => e.id === id);
    if (index !== -1) {
      this._storage.splice(index, 1); // Add 1 as second argument
    }
  }

  increasePriorityCounter() {
    this.priorityCounter++;
  }

  decreasePriorityCounter() {
    if (this.priorityCounter >= 0) {
      this.priorityCounter--;
    } else {
      return;
    }
  }

  increaseTodoListCounter() {
    this.todolistCounter++;
  }

  set addStorage(newItem) {
    this._storage.push(newItem);
  }

  get storage() {
    return this._storage;
  }

  static fromJSON(json) {
    try {
      const project = new Project(json.id, json.projectName);
      project.priorityCounter = json.priorityCounter;
      project.todolistCounter = json.todolistCounter;
      project._storage = json._storage.map((item) => {
        // If you eventually reconstruct TodoList instances, add error handling here too
        return item;
      });
      return project;
    } catch (error) {
      console.error("Failed to parse project from JSON:", error);
      console.warn("Problematic JSON data:", json);

      // Create a default project to prevent app crash
      const defaultProject = new Project(Date.now(), "Recovered Project");
      defaultProject.priorityCounter = 0;
      defaultProject.todolistCounter = 0;
      defaultProject._storage = [];

      return defaultProject;
    }
  }
}
