import Project from "./Project.js";

export const globalVariables = (() => {
  // Add projects
  let projectCounter = sessionStorage.projectCounter
    ? sessionStorage.getItem("projectCounter")
    : 0;

  let projects = retrieveProjects() || [];

  function setProject() {
    const JSONitem = JSON.stringify(projects);
    sessionStorage.setItem("projects", JSONitem);
  }

  function increaseProjectCount() {
    projectCounter++;
    sessionStorage.setItem("projectCounter", projectCounter);
  }

  function retrieveProjectCounter() {
    if (sessionStorage.getItem("projectCounter")) {
      return sessionStorage.getItem("projectCounter");
    } else {
      return 0;
    }
  }

  function addItemToProjects(item) {
    projects.push(item);
    setProject();
  }

  function retrieveProjects() {
    const savedData = JSON.parse(sessionStorage.getItem("projects"));
    if (!savedData) return [];

    projects = savedData.map((e) => Project.fromJSON(e));
    return projects;
  }

  function deleteProject(id) {
    const index = projects.findIndex((e) => e.id == id);
    projects.splice(index, 1);
    setProject();
  }

  // Add todolist
  function addTodoListToProjectItem(item, selectedProject) {
    selectedProject.addStorage = item;

    const index = projects.findIndex((p) => p.id === selectedProject.id);
    if (index !== -1) {
      projects[index] = {
        ...projects[index],
        _storage: selectedProject._storage,
      };
    }

    selectedProject.increaseTodoListCounter();
    setProject();
  }

  // Delete todolist
  function deleteTodoList(projectId, todoListId) {
    const projectIndex = projects.findIndex((p) => p.id == projectId);
    if (projectIndex === -1) return;

    const project = projects[projectIndex];
    project.deleteStorage(todoListId);
    setProject();
  }

  return {
    projects,
    increaseProjectCount,
    projectCounter,
    retrieveProjectCounter,
    addItemToProjects,
    retrieveProjects,
    setProject,
    deleteProject,
    addTodoListToProjectItem,
    deleteTodoList,
  };
})();
