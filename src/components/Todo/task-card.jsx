import { useContext } from "react";
import { TODO_ACTIONS } from "./reducer";
import { ReactComponent as CheckIcon } from "/src/images/check.svg";
import { ReactComponent as TrashIcon } from "/src/images/trash.svg";
import { TodoReducerContext } from "./todoReducer.context";

function Task({ task }) {
  const todoDispatch = useContext(TodoReducerContext);

  const taskChangeState = (e) => {
    e.target.checked
      ? e.target.removeAttribute("checked")
      : e.target.setAttribute("checked", "checked");

    todoDispatch({
      type: TODO_ACTIONS.TOGGLE_STATE,
      payload: { id: e.target.id },
    });
  };

  const deleteTask = (e) => {
    let element = e.target;
    while (!element.classList.contains("taskDelete")) {
      element = element.parentElement;
    }

    todoDispatch({ type: TODO_ACTIONS.REMOVE, payload: { id: element.id } });
  };

  return (
    <div className="taskCard">
      <div className="taskDetails">
        <input
          type="checkbox"
          name=""
          id={task.id}
          onChange={taskChangeState}
          defaultChecked={task.state}
        />
        <label className="check" htmlFor={task.id}>
          <CheckIcon />
        </label>
        <label className="title" htmlFor={task.id}>
          {task.title}
        </label>
      </div>
      <button className="taskDelete" onClick={deleteTask} id={task.id}>
        <TrashIcon />
      </button>
    </div>
  );
}

export default Task;
