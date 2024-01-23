import { tasksUpdateContext } from "../../contexts";
import { ReactComponent as CheckIcon } from "/src/images/check.svg";
import { ReactComponent as TrashIcon } from "/src/images/trash.svg";

import { useContext } from "react";

function Task({ task }) {
  const updateTasks = useContext(tasksUpdateContext);

  const taskChangeState = (e) => {
    updateTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      e.target.checked
        ? e.target.removeAttribute("checked")
        : e.target.setAttribute("checked", "checked");
      newTasks[e.target.id].state = !newTasks[e.target.id].state;
      return newTasks;
    });
  };

  const deleteTask = (e) => {
    const element = e.target.parentElement;

    updateTasks((prevTasks) => {
      let newTasks = [...prevTasks];
      let index = -1;
      for (let i = 0; i < newTasks.length; i++) {
        if (newTasks[i].id == element.id) {
          index = i;
        }
      }
      newTasks.splice(index, 1);
      return newTasks;
    });
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
