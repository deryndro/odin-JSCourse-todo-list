export default class TodoList {
  constructor(id, title, description, date) {
    this.id = id;
    this.title = `Title: ${title}`;
    this.description = `Description: ${description}`;
    this.checked = false;
    this.priority = 0;
    this.date = `Due date: ${date}`;
  }
  checkedToggler() {
    this.checked = this.checked == false ? true : false;
  }
}
