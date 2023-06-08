import React from "react";

function Save(props){
    return(
        <button type="button" className="btn btn__primary btn__lg"
        onClick={props.saveTasks}>
        Save Tasks to File
      </button>
    )
}
export default Save;