import React from "react";
import { useState } from "react";

export default function Todo(props) {
  const [newName, setNewName] = useState("");
  const [isEditing, setEditing] = useState(false);
  function handleChange(e) {
    setNewName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }
  
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
           请为{props.name}更改名称
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
        />

      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel"onClick={()=>setEditing(false)} >
          取消
          <span className="visually-hidden">{props.name}的名称不进行更改</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit" onClick={() => props.editTask(props.id,)}>
         保存
          <span className="visually-hidden"> {props.name}的新名字为</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          编辑 <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}>
          删除 <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );



  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;

}
