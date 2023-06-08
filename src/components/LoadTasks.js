import React, { useState } from "react";

function LoadTasks(props){
    const [isEditing, setEditing] = useState(false);
    const [fileName, setFileName] = useState("")

    function handleSubmit(e) {
        e.preventDefault();
        props.loadTasks(fileName);
        setEditing(false);
      }
    
      function handleChange(e) {
        setFileName(e.target.value);
      }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          File Name to Upload:
        </label>
        <input className="todo-text" type="text" value={fileName} onChange={handleChange}/>
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={()=>setEditing(false)}>
          Cancel
          <span className="visually-hidden">Cancel Uploading</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit" 
        >
          Upload
          <span className="visually-hidden">File Name to Upload</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <button type="button" className="btn btn__primary btn__lg"
        onClick={()=>setEditing(true)}>
        Upload Tasks From File
      </button>
  );

    return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;

}
export default LoadTasks

// another way: https://stackoverflow.com/questions/3582671/how-to-open-a-local-disk-file-with-javascript
