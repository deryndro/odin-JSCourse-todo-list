import { globalVariables } from "./globalVariables.js";
import { everythingDOM } from "./everythingDOM.js";
import Project from "./Project.js";
import TodoList from "./TodoList.js";

export const utility = (() => {
  function projectFinder(id) {
    const projects = globalVariables.retrieveProjects();
    return projects.find((e) => e.id == id);
  }

  function addTodoListFormHandler(e) {
    e.preventDefault();
    // utility.addItemToProject()
    const projectid = e.target.getAttribute("projectid");
    const titleEntry = e.target.elements[0].value;
    const descriptionEntry = e.target.elements[1].value;
    const dateEntry = e.target.elements[2].value;

    const selectedProject = projectFinder(projectid);

    const todoListId = `${projectid}-${selectedProject.todolistCounter}`;
    const item = new TodoList(
      todoListId,
      titleEntry,
      descriptionEntry,
      dateEntry
    );

    globalVariables.addTodoListToProjectItem(item, selectedProject);

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

  function deleteProject() {
    const projectid = this.parentNode.parentNode.getAttribute("projectid");
    globalVariables.deleteProject(projectid);
    everythingDOM.initializeDOM();
  }

  function deleteTodolist() {
    const projectId = this.parentNode.getAttribute("projectId");
    const todoListId = this.parentNode.getAttribute("todoListId");

    // Deletes todolist
    globalVariables.deleteTodoList(projectId, todoListId);

    // Refresh DOM
    everythingDOM.initializeDOM();
  }

  // Creates project
  function addProject(projectName) {
    const project = new Project(
      globalVariables.retrieveProjectCounter(),
      projectName
    );
    // globalVariables.projects.push(project);
    // globalVariables.projectCounter++;
    globalVariables.increaseProjectCount();
    globalVariables.addItemToProjects(project);
  }

  // Function to handle adding priority in todolist
  function priorityHandler(e) {
    // Get projects using globalVariables.retrieveProjects() instead of globalVariables.projects
    const projects = globalVariables.retrieveProjects();

    // This selects the project item
    const currProject = projects.find(
      (item) => item.id == e.currentTarget.myParam
    );

    if (!currProject) return;

    // Adds priority attribute
    if (this.hasAttribute("priority")) {
      currProject.decreasePriorityCounter();
      this.removeAttribute("priority");
      this.removeChild(this.firstChild);
    } else {
      currProject.increasePriorityCounter();
      this.setAttribute("priority", currProject.priorityCounter);
      this.prepend(everythingDOM.priorityCounter(currProject.priorityCounter));
    }
    globalVariables.setProject();
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
    priorityHandler,
    checkboxHandler,
    deleteTodolist,
    showTodolist,
    deleteProject,
  };
})();
