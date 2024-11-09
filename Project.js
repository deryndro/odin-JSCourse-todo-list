export default class Project {
  constructor(id, projectName) {
    this.id = id;
    this.projectName = projectName;
    this.storage = [];
    this.priorityCounter = 0;
  }

  deleteStorage(id) {
    const index = this.storage.findIndex((e) => e.id === id);
    this.storage.splice(index);
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

  set projectStorage(newItem) {
    this.storage.push(newItem);
  }

  get projectStorage() {
    return this.storage;
  }
}
