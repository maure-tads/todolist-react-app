import { useState } from "react";
import { Button } from "react-bootstrap";
import "./Task.css"

function Task({ titulo, id }) {
  const [checked, setChecked] = useState(false);
  function handleClick(e) {
    setChecked(!checked);
  }

  function handleDelete() {
    console.log(id);
  }

  return (
    <div
      className="m-3 shadow bg-white rounded d-flex align-items-center justify-content-between p-3"
      style={{ height: "65px", width: "50vw" }}
    >
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id={id}
          checked={checked}
          onChange={handleClick}
        />
        <label
          className="form-check-label"
          style={
            checked
              ? { textDecoration: "line-through", color: "gray" }
              : { textDecoration: "none" }
          }
          htmlFor={id}
        >
          {titulo}
        </label>
      </div>
      <div>
        
        <i className="btn--edit p-2 m-1 fa-regular fa-pen-to-square" style={{cursor:"pointer"}}></i>
        <i className="btn--remove p-2 m-1 fa-solid fa-trash" style={{cursor:"pointer"}} onClick={handleDelete}></i>
      </div>
    </div>
  );
}

export default Task;
