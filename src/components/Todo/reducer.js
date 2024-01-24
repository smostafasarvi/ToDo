export const TODO_ACTIONS = {
  ADD: "add",
  TOGGLE_STATE: "toggle",
  REMOVE: "remove",
};

export function TodoReducer(tasks = [], action) {
  switch (action.type) {
    case TODO_ACTIONS.ADD:
      if (action.payload.title != "") {
        return [
          ...tasks,
          {
            id:
              tasks.length > 0
                ? `${parseInt(tasks[tasks.length - 1].id) + 1}`
                : "0",
            title: action.payload.title,
            state: false,
          },
        ];
      }
      return tasks;

    case TODO_ACTIONS.TOGGLE_STATE:
      return [
        ...tasks.map((task) => {
          return {
            ...task,
            state: task.id === action.payload.id ? !task.state : task.state,
          };
        }),
      ];

    case TODO_ACTIONS.REMOVE:
      return tasks.filter((task) => {
        return task.id !== action.payload.id;
      });

    default:
      return tasks;
  }
}
