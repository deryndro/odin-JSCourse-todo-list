export const globalVariables = (() => {
  let addedProjectCounter = 0;
  let addedTodoListCounter = 0;
  let projects = [];
  let counter = 0;
  return { projects, counter, addedProjectCounter, addedTodoListCounter };
})();
