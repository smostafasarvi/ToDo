import { useState, useEffect, useRef } from "react";

import Task from "./task-card";

import { tasksContext, tasksUpdateContext } from "../../contexts";

import { ReactComponent as PlusIcon } from "/src/images/plus-icon.svg";
import { ReactComponent as ClipboardIcon } from "/src/images/clipboard-icon.svg";

const addTask = (setTasks, tasksTitle) => {
  setTasks((prevTasks) => {
    let newTasks = [...prevTasks];
    if (tasksTitle.current.value != "") {
      newTasks.push({
        id: newTasks.length > 0 ? newTasks[newTasks.length - 1].id + 1 : 0,
        title: tasksTitle.current.value,
        state: false,
      });
      tasksTitle.current.value = "";
    }
    return newTasks;
  });
};

function ToDoInput() {
  const [tasks, setTasks] = useState([]);
  const tasksTitle = useRef();
  const [doneCount, setDoneCount] = useState(0);
  const updateTasks = (newTasks) => setTasks(newTasks);
  const [junk, setJunk] = useState(0);

  useEffect(() => {
    setJunk((prevJunk) => prevJunk + 1);
  }, [tasks]);

  useEffect(() => {
    let doneCount = 0;
    tasks.map((task) => {
      task.state ? doneCount++ : "";
    });
    setDoneCount(doneCount);
  }, [junk, tasks]);

  useEffect(() => {
    tasksTitle.current.focus();
    const onKeyDown = (e) => {
      if (e.key === "Enter") {
        console.log("You pressed Enter", tasksTitle);
        addTask(setTasks, tasksTitle);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <tasksContext.Provider value={tasks}>
      <tasksUpdateContext.Provider value={updateTasks}>
        <section className="body">
          <section className="todoInput">
            <input
              ref={tasksTitle}
              type="text"
              id="addTask"
              className="newTaskTitle"
              placeholder="Add a new task..."
            />
            <button
              className="btn"
              id="addTask"
              onClick={() => {
                addTask(tasks, setTasks, tasksTitle.current);
              }}
            >
              <span>Add Task</span>
              <PlusIcon />
            </button>
          </section>
          <section className="status">
            <div>
              <span className="allTasks">All Tasks</span>
              <span className="badge">{tasks.length}</span>
            </div>
            <div>
              <span className="doneTasks">Done</span>
              <span className="badge">{`${doneCount} of ${tasks.length}`}</span>
              ;
            </div>
          </section>
          <section className="tasks">
            {tasks.length != 0 ? (
              <>
                {tasks.map((task) => {
                  return !task.state ? <Task task={task} key={task.id} /> : "";
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
      </tasksUpdateContext.Provider>
    </tasksContext.Provider>
  );
}

export default ToDoInput;
