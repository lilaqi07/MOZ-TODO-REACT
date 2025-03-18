import React from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { useState } from "react";
import { nanoid } from "nanoid";

function App(props) { 
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("全部");

  const FILTER_MAP = {
    全部: () => true,
    未完成: (task) => !task.completed,
    已完成: (task) => task.completed,
  };
  const FILTER_NAMES = Object.keys(FILTER_MAP);
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
    key={name}
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
  />
  ));
   
  
  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // Copy the task and update its name
        return { ...task, name: newName };
      }
      // Return the original task if it's not the edited task
      return task;
    });
    setTasks(editedTaskList);
  }
   
  
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  
  
  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const tasksNoun = taskList.length !== 0 ? `有${taskList.length}项任务`: "没有任务";
  const headingText = ` ${tasksNoun} `;
  return (
    <div className="todoapp stack-large">
      <h1>任 务 表</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
      {filterList}

      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
