import { useState, useEffect } from "react";

import Task from "./task-card";

import { ReactComponent as PlusIcon } from "/src/images/plus-icon.svg";
import { ReactComponent as ClipboardIcon } from "/src/images/clipboard-icon.svg";
import { TodoReducer, TODO_ACTIONS } from "./reducer";
import { TodoReducerContext } from "./todoReducer.context";
import { useLocalStorage } from "./useLocalStorageHook";

function ToDoInput() {
  const [tasks, dispatch] = useLocalStorage("Tasks", TodoReducer, []);
  const [taskTitle, setTaskTitle] = useState("");
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    let doneCount = 0;
    tasks.map((task) => {
      task.state ? doneCount++ : "";
    });
    setDoneCount(doneCount);
  }, [tasks]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: TODO_ACTIONS.ADD, payload: { title: taskTitle } });
    setTaskTitle("");
  };

  return (
    <TodoReducerContext.Provider value={dispatch}>
      <section className="body">
        <form className="todoInput" onSubmit={onFormSubmit}>
          <input
            type="text"
            id="addTask"
            value={taskTitle}
            className="newTaskTitle"
            placeholder="Add a new task..."
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <button className="btn" type="submit" id="addTask">
            <span>Add Task</span>
            <PlusIcon />
          </button>
        </form>
        <section className="status">
          <div>
            <span className="allTasks">All Tasks</span>
            <span className="badge">{tasks.length}</span>
          </div>
          <div>
            <span className="doneTasks">Done</span>
            <span className="badge">{`${doneCount} of ${tasks.length}`}</span>;
          </div>
        </section>
        <section className="tasks">
          {tasks.length != 0 ? (
            <>
              {tasks.map((task) => {
                return !task.state ? (
                  <Task task={task} key={task.id} todoDispatch={dispatch} />
                ) : (
                  ""
                );
              })}
              <hr />
              {tasks.map((task) => {
                return task.state ? <Task task={task} key={task.id} /> : "";
              })}
            </>
          ) : (
            <div className="empty">
              <ClipboardIcon />
              <p className="no-task">You still have no tasks registered</p>
              <p>Create tasks and organize your items to do</p>
            </div>
          )}
        </section>
      </section>
    </TodoReducerContext.Provider>
  );
}

export default ToDoInput;
