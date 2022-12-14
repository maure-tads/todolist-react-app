import { useState } from "react";
import { Badge, Col } from "react-bootstrap";
import "./Task.css";

function Task({ titulo, id, handleDelete, handleEdit, deadline }) {
  const [checked, setChecked] = useState(false);
  function handleClick(e) {
    setChecked(!checked);
  }

  function isLate() {
    const dl = Date.parse(deadline);
    const today = Date.parse(new Date());
    return dl < today;
  }

  return (
    <>
      <div
        className="m-3 shadow bg-white rounded d-flex align-items-center justify-content-between p-3"
        style={{ height: "65px", width: "50vw" }}
      >
        <Col sm={8}>
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
        </Col>
        <Col>
          <Badge bg={!isLate() ? "success" : "danger"}>
            {
              new Date(deadline.replace("-", "/"))
                .toLocaleString()
                .split(" ")[0]
            }
          </Badge>
        </Col>
        <Col className="d-sm-flex inline flex-row-reverse">
          <div>
            <i
              className="btn--edit p-2 fa-regular fa-pen-to-square"
              style={{ cursor: "pointer" }}
              onClick={() => handleEdit(id)}
            ></i>
            <i
              className="btn--remove p-2 fa-solid fa-trash"
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete(id)}
            ></i>
          </div>
        </Col>
      </div>
    </>
  );
}

export default Task;
