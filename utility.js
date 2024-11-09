import { globalVariables } from "./globalVariables.js";
import { everythingDOM } from "./everythingDOM.js";
import Project from "./Project.js";
import TodoList from "./TodoList.js";

export const utility = (() => {
  function addTodoListFormHandler(e) {
    e.preventDefault();
    // utility.addItemToProject()
    const projectid = e.target.getAttribute("projectid");
    const titleEntry = e.target.elements[0].value;
    const descriptionEntry = e.target.elements[1].value;
    const dateEntry = e.target.elements[2].value;

    addTodoList(projectid, titleEntry, descriptionEntry, dateEntry);
    everythingDOM.initializeDOM();
  }

  function showTodolist() {
    const nextSibling = this.nextSibling;
    if (nextSibling.classList.contains("hidden")) {
      nextSibling.classList.remove("hidden");
    } else {
      nextSibling.classList.add("hidden");
    }
  }

  function deleteTodolist() {
    const [projectid, todolistid] = this.parentNode
      .getAttribute("todolistid")
      .split("-");

    const parent = this.parentNode;
    console.log(parent);

    // Finds project
    const project = globalVariables.projects.find((e) => e.id == projectid);

    // Deletes todolist
    project.deleteStorage(todolistid);

    // Refresh DOM
    everythingDOM.initializeDOM();
  }

  // Creates project
  function addProject(projectName) {
    const project = new Project(
      globalVariables.addedProjectCounter,
      projectName
    );
    globalVariables.projects.push(project);
    globalVariables.addedProjectCounter++;
  }

  // Adds item to selected project
  function addTodoList(projectid, title, description, date) {
    const todoListId = `${projectid}-${globalVariables.addedTodoListCounter}`;
    const item = new TodoList(todoListId, title, description, date);
    const selectedProject = globalVariables.projects.find(
      (e) => e.id == projectid
    );

    selectedProject.projectStorage = item;
    globalVariables.addedTodoListCounter++;
  }

  // Function to handle adding priority in todolist
  function priorityHandler(e) {
    // This selects the project item from globalVarables.projects
    const [currProject] = globalVariables.projects.filter(
      (item) => item.id == e.currentTarget.myParam
    );

    // Adds priority attribute to a clicked todolist that doesnt have it, and removes priority attribute if the todolist already have one
    if (this.hasAttribute("priority")) {
      currProject.decreasePriorityCounter();
      this.removeAttribute("priority");
      this.removeChild(this.firstChild);
    } else if (!this.hasAttribute("priority")) {
      currProject.increasePriorityCounter();
      this.setAttribute("priority", currProject.priorityCounter);
      this.prepend(everythingDOM.priorityCounter(currProject.priorityCounter));
    }
  }

  // Marking items as done
  function checkboxHandler() {
    if (this.checked) {
      this.parentNode.classList.add("todo-list-done");
    } else {
      this.parentNode.classList.remove("todo-list-done");
    }
  }
  return {
    addTodoListFormHandler,
    addProject,
    addTodoList,
    priorityHandler,
    checkboxHandler,
    deleteTodolist,
    showTodolist,
  };
})();
