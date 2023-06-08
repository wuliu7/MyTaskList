import React, { useState } from "react";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import Form from "./components/Form";
import { nanoid } from "nanoid";
import Save from "./components/Save";
import LoadTasks from "./components/LoadTasks";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");
  
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton key={name} name={name} 
    isPressed={name===filter}
    setFilter={setFilter}/>
  ));

  const taskList = tasks.filter(FILTER_MAP[filter])
    .map((task) => (
    <Todo id={task.id} 
    name={task.name} 
    completed={task.completed}
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    editTask={editTask}
    />));

  // const buttonList = props.states.map((state)=> (<FilterButton key={state.name} name={state.name} filterClicked={filterClicked}/>));
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  function saveTasks(){
    const fileData = JSON.stringify(tasks);
    const blob = new Blob([fileData],{type:"text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "tasks.json";
    link.href = url;
    link.click();

  }
  function editTask(id, newName) {
    const editedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {...task, name:newName};
      }
      return task;
    });
    setTasks(editedTasks); 
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => id !== task.id);
    setTasks(updatedTasks);
  }

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function loadTasksFromFile(fileName) {
    // alert("up;pad!");
    fetch(fileName)
    .then(response => response.json())
    .then(data=> {
      console.log(data);
      if (data!==null && data!=="") {
        setTasks(data);
      } else {
        alert("no tasks found in file" + fileName);
      }
      
    }).catch(error=>{
      alert("Error", error);

      }
    )
  }
  
  return (
    <div className="todoapp stack-large">
      <h1>My Task List</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
      {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
       {taskList}
       <Save saveTasks={saveTasks} />
       <LoadTasks loadTasks={loadTasksFromFile} />
      </ul>
      
    </div>
  );
}
export default App;