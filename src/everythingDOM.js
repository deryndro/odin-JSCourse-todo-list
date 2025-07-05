import { globalVariables } from "./globalVariables.js";
import { utility } from "./utility.js";

export const everythingDOM = (() => {
  const mainContainer = document.querySelector("#main-container");

  function priorityCounter(num) {
    const div = document.createElement("div");
    div.classList.add("priority-counter");
    div.prepend(num);
    return div;
  }

  // This is where we set the layout of the dom
  function initializeDOM() {
    // Clears the DOM before initializing
    while (mainContainer.children) {
      if (mainContainer.children.length == 0) {
        break;
      }
      mainContainer.removeChild(mainContainer.firstChild);
    }

    // Add new project form
    const newProjectForm = document.createElement("form");
    const newProjectNameInput = document.createElement("input");
    const newProjectButton = document.createElement("button");
    newProjectButton.setAttribute("type", "submit");
    newProjectButton.textContent = "Add new project";
    newProjectNameInput.setAttribute("type", "text");
    newProjectForm.append(newProjectNameInput);
    newProjectForm.append(newProjectButton);
    mainContainer.prepend(newProjectForm);
    newProjectForm.addEventListener("submit", (e) => {
      e.preventDefault();

      utility.addProject(newProjectNameInput.value);
      newProjectNameInput.value = "";
      initializeDOM();
    });

    const projects =
      globalVariables.retrieveProjects() == undefined
        ? []
        : globalVariables.retrieveProjects();

    projects.forEach((project) => {
      // Creates project node
      const projectItem = document.createElement("div");
      projectItem.classList.add("project-item");
      projectItem.setAttribute("projectId", project.id);

      const projectTitleContainer = document.createElement("div");
      projectTitleContainer.classList.add("project-title-container");

      const projectDeleteBtn = document.createElement("div");
      projectDeleteBtn.textContent = "x";
      projectDeleteBtn.classList.add("delete-button");
      projectDeleteBtn.addEventListener("click", utility.deleteProject);
      projectTitleContainer.append(projectDeleteBtn);

      const projectTitle = document.createElement("h1");
      projectTitle.append(project.projectName);
      projectTitleContainer.append(projectTitle);

      projectItem.append(projectTitleContainer);
      mainContainer.append(projectItem);

      // Creates todo list node
      const todolistNodes = project._storage;
      if (todolistNodes !== undefined) {
        todolistNodes.forEach((todoList) => {
          const todoListContainer = document.createElement("div");
          todoListContainer.classList.add("todo-list-container");

          // Item 1 title
          const todoListTitle = document.createElement("p");
          todoListTitle.append(todoList.title);

          // Item 2 description
          const todoListDescription = document.createElement("p");
          todoListDescription.append(todoList.description);

          // Item 3 date
          const todoListDate = document.createElement("p");
          todoListDate.append(todoList.date);

          // Put project id and todolist id as attribute to todoListContainer
          todoListContainer.setAttribute("projectId", project.id);
          todoListContainer.setAttribute("todoListId", todoList.id); // Store full ID

          // Delete button on todolist
          const deleteButton = document.createElement("div");
          deleteButton.classList.add("delete-button");
          deleteButton.textContent = "X";
          todoListContainer.prepend(deleteButton);
          deleteButton.addEventListener("click", utility.deleteTodolist);

          // Text container inside todolist container
          const textContainer = document.createElement("div");
          textContainer.classList.add("text-container");
          textContainer.myParam = project.id;
          textContainer.addEventListener("click", utility.priorityHandler); // Passing in project.id to enable looking up project

          // Checkbox functionality
          const checkbox = document.createElement("input");
          checkbox.setAttribute("type", "checkbox");
          checkbox.addEventListener("click", utility.checkboxHandler);

          // Appending items to todoListContainer
          projectItem.append(todoListContainer);
          todoListContainer.append(textContainer);
          todoListContainer.append(checkbox);
          textContainer.append(todoListTitle);
          textContainer.append(todoListDescription);
          textContainer.append(todoListDate);
        });
      }

      // Addtodolist container
      const addTodolistContainer = document.createElement("div");
      addTodolistContainer.classList.add("add-todolist-container");

      // Button to show form
      const addTodolistButton = document.createElement("div");
      addTodolistButton.classList.add("add-todolist-button");
      addTodolistButton.classList.add("not-selectable");
      addTodolistButton.textContent = "Add a to do list";
      addTodolistButton.addEventListener("click", utility.showTodolist);

      // The FORM for addtodolist
      const addTodolistForm = document.createElement("form");
      addTodolistForm.setAttribute("projectid", project.id);
      addTodolistForm.classList.add("hidden");
      addTodolistForm.addEventListener(
        "submit",
        utility.addTodoListFormHandler
      );

      // Addtodolist item 1 Title
      const addTodolistForm_Title = document.createElement("input");
      const addTodolistForm_TitleText = document.createElement("p");
      addTodolistForm_Title.setAttribute("type", "text");
      addTodolistForm_TitleText.textContent = "Title";

      // Addtodolist item 2 Description
      const addTodolistForm_Description = document.createElement("input");
      const addTodolistForm_DescriptionText = document.createElement("p");
      addTodolistForm_DescriptionText.textContent = "Description";

      // Addtodolist item 3 Date
      const addTodolistForm_Date = document.createElement("input");
      const addTodolistForm_DateText = document.createElement("p");
      addTodolistForm_Date.setAttribute("type", "date");
      addTodolistForm_DateText.textContent = "Due date";

      // Addtodolist item 4 Submit button
      const addTodolistForm_Button = document.createElement("button");
      addTodolistForm_Button.textContent = "Submit";
      addTodolistForm_Button.setAttribute("type", "submit");

      // li elements
      const ul = document.createElement("ul");
      const li1 = document.createElement("li");
      const li2 = document.createElement("li");
      const li3 = document.createElement("li");
      const li4 = document.createElement("li");

      addTodolistForm.append(ul);

      ul.append(li1);
      ul.append(li2);
      ul.append(li3);
      ul.append(li4);

      li1.append(addTodolistForm_Title);
      li1.append(addTodolistForm_TitleText);

      li2.append(addTodolistForm_Description);
      li2.append(addTodolistForm_DescriptionText);

      li3.append(addTodolistForm_Date);
      li3.append(addTodolistForm_DateText);

      li4.append(addTodolistForm_Button);

      addTodolistContainer.classList.add("add-todolist-container");
      addTodolistContainer.append(addTodolistButton);
      addTodolistContainer.append(addTodolistForm);

      projectItem.appendChild(addTodolistContainer);
    });
  }
  return { mainContainer, initializeDOM, priorityCounter };
})();
