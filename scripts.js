import { everythingDOM } from "./everythingDOM.js";

// Creates project list
// export class Project {
//   constructor(id, projectName) {
//     this.id = id;
//     this.projectName = projectName;
//     this.storage = [];
//     this.priorityCounter = 0;
//   }

//   deleteStorage(id) {
//     const index = this.storage.findIndex((e) => e.id === id);
//     this.storage.splice(index);
//   }

//   increasePriorityCounter() {
//     this.priorityCounter++;
//   }

//   decreasePriorityCounter() {
//     if (this.priorityCounter >= 0) {
//       this.priorityCounter--;
//     } else {
//       return;
//     }
//   }

//   set projectStorage(newItem) {
//     this.storage.push(newItem);
//   }

//   get projectStorage() {
//     return this.storage;
//   }
// }

// Creates todo list
// export class TodoList {
//   constructor(id, title, description, date) {
//     this.id = id;
//     this.title = `Title: ${title}`;
//     this.description = `Description: ${description}`;
//     this.checked = false;
//     this.priority = 0;
//     this.date = `Due date: ${date}`;
//   }
//   checkedToggler() {
//     this.checked = this.checked == false ? true : false;
//   }
// }

// This is where all generic variables are stored
// const globalVariables = (() => {
//   let addedProjectCounter = 0;
//   let addedTodoListCounter = 0;
//   let projects = [];
//   let counter = 0;
//   return { projects, counter, addedProjectCounter, addedTodoListCounter };
// })();

// This takes care of DOM stuff
// const everythingDOM = (() => {
//   const mainContainer = document.querySelector("#main-container");

//   function priorityCounter(num) {
//     const div = document.createElement("div");
//     div.classList.add("priority-counter");
//     div.prepend(num);
//     return div;
//   }

//   // This is where we set the layout of the dom
//   function initializeDOM() {
//     // Clears the DOM before initializing
//     while (mainContainer.children) {
//       if (mainContainer.children.length == 0) {
//         break;
//       }
//       mainContainer.removeChild(mainContainer.firstChild);
//     }

//     // Add new project form
//     const newProjectForm = document.createElement("form");
//     const newProjectNameInput = document.createElement("input");
//     const newProjectButton = document.createElement("button");
//     newProjectButton.setAttribute("type", "submit");
//     newProjectButton.textContent = "Add new project";
//     newProjectNameInput.setAttribute("type", "text");
//     newProjectForm.append(newProjectNameInput);
//     newProjectForm.append(newProjectButton);
//     mainContainer.prepend(newProjectForm);
//     newProjectForm.addEventListener("submit", (e) => {
//       e.preventDefault();

//       utility.addProject(newProjectNameInput.value);
//       newProjectNameInput.value = "";
//       initializeDOM();
//     });

//     globalVariables.projects.forEach((project) => {
//       // Creates project node
//       const projectItem = document.createElement("div");
//       projectItem.classList.add("project-item");

//       const title = document.createElement("h1");
//       title.append(project.projectName);

//       projectItem.append(title);
//       mainContainer.append(projectItem);

//       // Creates todo list node
//       project.storage.forEach((todoList) => {
//         const todoListContainer = document.createElement("div");
//         todoListContainer.classList.add("todo-list-container");

//         // Item 1 title
//         const todoListTitle = document.createElement("p");
//         todoListTitle.append(todoList.title);

//         // Item 2 description
//         const todoListDescription = document.createElement("p");
//         todoListDescription.append(todoList.description);

//         // Item 3 date
//         const todoListDate = document.createElement("p");
//         todoListDate.append(todoList.date);

//         // Put project id and todolist id as attribute to todoListContainer
//         todoListContainer.setAttribute("projectId", `${project.id}`);
//         todoListContainer.setAttribute("todoListId", `${todoList.id}`);

//         // Delete button on todolist
//         const deleteButton = document.createElement("div");
//         deleteButton.classList.add("delete-button");
//         deleteButton.textContent = "X";
//         todoListContainer.prepend(deleteButton);
//         deleteButton.addEventListener("click", utility.deleteTodolist);

//         // Text container inside todolist container
//         const textContainer = document.createElement("div");
//         textContainer.classList.add("text-container");
//         textContainer.myParam = project.id;
//         textContainer.addEventListener("click", utility.priorityHandler); // Passing in project.id to enable looking up project

//         // Checkbox functionality
//         const checkbox = document.createElement("input");
//         checkbox.setAttribute("type", "checkbox");
//         checkbox.addEventListener("click", utility.checkboxHandler);

//         // Appending items to todoListContainer
//         projectItem.append(todoListContainer);
//         todoListContainer.append(textContainer);
//         todoListContainer.append(checkbox);
//         textContainer.append(todoListTitle);
//         textContainer.append(todoListDescription);
//         textContainer.append(todoListDate);
//       });

//       // Addtodolist container
//       const addTodolistContainer = document.createElement("div");
//       addTodolistContainer.classList.add("add-todolist-container");

//       // Button to show form
//       const addTodolistButton = document.createElement("div");
//       addTodolistButton.classList.add("add-todolist-button");
//       addTodolistButton.classList.add("not-selectable");
//       addTodolistButton.textContent = "Add a to do list";
//       addTodolistButton.addEventListener("click", utility.showTodolist);

//       // The FORM for addtodolist
//       const addTodolistForm = document.createElement("form");
//       addTodolistForm.setAttribute("projectid", project.id);
//       addTodolistForm.classList.add("hidden");
//       addTodolistForm.addEventListener(
//         "submit",
//         utility.addTodoListFormHandler
//       );

//       // Addtodolist item 1 Title
//       const addTodolistForm_Title = document.createElement("input");
//       const addTodolistForm_TitleText = document.createElement("p");
//       addTodolistForm_Title.setAttribute("type", "text");
//       addTodolistForm_TitleText.textContent = "Title";

//       // Addtodolist item 2 Description
//       const addTodolistForm_Description = document.createElement("input");
//       const addTodolistForm_DescriptionText = document.createElement("p");
//       addTodolistForm_DescriptionText.textContent = "Description";

//       // Addtodolist item 3 Date
//       const addTodolistForm_Date = document.createElement("input");
//       const addTodolistForm_DateText = document.createElement("p");
//       addTodolistForm_Date.setAttribute("type", "date");
//       addTodolistForm_DateText.textContent = "Due date";

//       // Addtodolist item 4 Submit button
//       const addTodolistForm_Button = document.createElement("button");
//       addTodolistForm_Button.textContent = "Submit";
//       addTodolistForm_Button.setAttribute("type", "submit");

//       // li elements
//       const ul = document.createElement("ul");
//       const li1 = document.createElement("li");
//       const li2 = document.createElement("li");
//       const li3 = document.createElement("li");
//       const li4 = document.createElement("li");

//       addTodolistForm.append(ul);

//       ul.append(li1);
//       ul.append(li2);
//       ul.append(li3);
//       ul.append(li4);

//       li1.append(addTodolistForm_Title);
//       li1.append(addTodolistForm_TitleText);

//       li2.append(addTodolistForm_Description);
//       li2.append(addTodolistForm_DescriptionText);

//       li3.append(addTodolistForm_Date);
//       li3.append(addTodolistForm_DateText);

//       li4.append(addTodolistForm_Button);

//       addTodolistContainer.classList.add("add-todolist-container");
//       addTodolistContainer.append(addTodolistButton);
//       addTodolistContainer.append(addTodolistForm);

//       projectItem.appendChild(addTodolistContainer);
//     });
//   }
//   return { mainContainer, initializeDOM, priorityCounter };
// })();

// This is where most functions are
// const utility = (() => {
//   function addTodoListFormHandler(e) {
//     e.preventDefault();
//     // utility.addItemToProject()
//     const projectid = e.target.getAttribute("projectid");
//     const titleEntry = e.target.elements[0].value;
//     const descriptionEntry = e.target.elements[1].value;
//     const dateEntry = e.target.elements[2].value;

//     addTodoList(projectid, titleEntry, descriptionEntry, dateEntry);
//     everythingDOM.initializeDOM();
//   }

//   function showTodolist() {
//     const nextSibling = this.nextSibling;
//     if (nextSibling.classList.contains("hidden")) {
//       nextSibling.classList.remove("hidden");
//     } else {
//       nextSibling.classList.add("hidden");
//     }
//   }

//   function deleteTodolist() {
//     const [projectid, todolistid] = this.parentNode
//       .getAttribute("todolistid")
//       .split("-");

//     const parent = this.parentNode;
//     console.log(parent);

//     // Finds project
//     const project = globalVariables.projects.find((e) => e.id == projectid);

//     // Deletes todolist
//     project.deleteStorage(todolistid);

//     // Refresh DOM
//     everythingDOM.initializeDOM();
//   }

//   // Creates project
//   function addProject(projectName) {
//     const project = new Project(
//       globalVariables.addedProjectCounter,
//       projectName
//     );
//     globalVariables.projects.push(project);
//     globalVariables.addedProjectCounter++;
//   }

//   // Adds item to selected project
//   function addTodoList(projectid, title, description, date) {
//     const todoListId = `${projectid}-${globalVariables.addedTodoListCounter}`;
//     const item = new TodoList(todoListId, title, description, date);
//     const selectedProject = globalVariables.projects.find(
//       (e) => e.id == projectid
//     );

//     selectedProject.projectStorage = item;
//     globalVariables.addedTodoListCounter++;
//   }

//   // Function to handle adding priority in todolist
//   function priorityHandler(e) {
//     // This selects the project item from globalVarables.projects
//     const [currProject] = globalVariables.projects.filter(
//       (item) => item.id == e.currentTarget.myParam
//     );

//     // Adds priority attribute to a clicked todolist that doesnt have it, and removes priority attribute if the todolist already have one
//     if (this.hasAttribute("priority")) {
//       currProject.decreasePriorityCounter();
//       this.removeAttribute("priority");
//       this.removeChild(this.firstChild);
//     } else if (!this.hasAttribute("priority")) {
//       currProject.increasePriorityCounter();
//       this.setAttribute("priority", currProject.priorityCounter);
//       this.prepend(everythingDOM.priorityCounter(currProject.priorityCounter));
//     }
//   }

//   // Marking items as done
//   function checkboxHandler() {
//     if (this.checked) {
//       this.parentNode.classList.add("todo-list-done");
//     } else {
//       this.parentNode.classList.remove("todo-list-done");
//     }
//   }
//   return {
//     addTodoListFormHandler,
//     addProject,
//     addTodoList,
//     priorityHandler,
//     checkboxHandler,
//     deleteTodolist,
//     showTodolist,
//   };
// })();

// utility.addProject("Survive");
// utility.addTodoList(0, "Make breakfast", "Noodle sounds good");
// utility.addTodoList(0, "Shower", "No more stinky");

// utility.addProject("Shop");
// utility.addTodoList(1, "Egg", "-");
// utility.addTodoList(1, "Milk", "-");

everythingDOM.initializeDOM();
