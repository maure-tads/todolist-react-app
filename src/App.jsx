import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Container,
  Button,
  Modal,
  Toast,
  ToastContainer,
  Col,
} from "react-bootstrap";

import Task from "./components/Task";

let lastKey = 0;
let taskKey = undefined;

function App() {
  const [tasks, setTasks] = useState([]);
  const [formWidth, setFormWidth] = useState(window.innerWidth * 0.3);
  const [lastTask, setLastTask] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [formAction, setFormAction] = useState();

  /* Configuração da largura do formulário */

  const getFormWidth = () =>
    setFormWidth(
      window.innerWidth > 900
        ? window.innerWidth * 0.3
        : window.innerWidth * 0.75
    );

  window.addEventListener("resize", getFormWidth);

  /** Submissão do formulário dentro do Modal
   *  TODO Integrar com um back/api (Ainda inexistente kk)
   */

  /* Controle da abertura e fechamento do modal */

  const handleShow = (msg) => {
    setTaskTitle("");
    setTaskDate("");
    setShow(true);
    setModalAction(msg);
  };
  const handleClose = () => {
    setShow(false);
  };

  const sort = (l) => {
    l.sort((a,b) => new Date(b.date) - new Date(a.date));
  }

  const submitTask = () => {
    handleShow("Cadastrar");
    const tempTask = tasks.find((t) => t.key == taskKey);
    if (tempTask) {
      updateTask(tempTask);
      tasks.sort((a,b) => new Date(b.date) - new Date(a.date));
      setTasks(tasks);
      return;
    }
    const newTask = {
      title: taskTitle,
      date: taskDate,
      createdAt: new Date(),
      key: ++lastKey,
    };
    setLastTask(newTask.title);
    
    tasks.push(newTask);
    tasks.sort((a,b) => new Date(a.date) - new Date(b.date));
    setShowToast(true);
    setTasks(tasks);
    handleClose();
  };

  const updateTask = (tempTask) => {
    tempTask.title = taskTitle;
    tempTask.date = taskDate;
    let newTasks = tasks.filter((task) => task.key !== tempTask.id);
    newTasks.push(tempTask);
    newTasks.sort((a,b) => new Date(a.date) - new Date(b.date));
    setTaskDate(newTasks); 
    taskKey = undefined;
    handleClose();
  }

  const newTask = () => {
    setFormAction("Cadastrar");
    handleShow("Cadastrar nova tarefa");
  }

  /**
   *  Handlers de edição e remoção das tarefas ja cadastradas
   * */
  function handleDeleteTask(taskId) {
    const tempTasks = tasks.filter((task) => task.key !== taskId);
    setTasks(tempTasks);
  }

  function handleEditTask(taskId) {
    handleShow("Editar tarefa");
    setFormAction("Atualizar");
    const tempTask = tasks.find((t) => t.key == taskId);
    setTaskTitle(tempTask.title);
    setTaskDate(tempTask.date);
    taskKey = tempTask.key;
    console.log(taskKey);
  }

  return (
    <>
      <ToastContainer className="p-5" position="top-end">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Body>Sua nova tarefa "{lastTask}" foi cadastrada!</Toast.Body>
        </Toast>
      </ToastContainer>
      <Container className="mt-5 d-flex flex-column align-items-center">
        <Button
          variant="primary"
          onClick={newTask}
        >
          Nova Tarefa
        </Button>

        <Col className="m-5" style={{ height: "50vh" }}>
          {          
          tasks.map((t) => (
            <Task
              titulo={t.title}
              key={t.key}
              id={t.key}
              deadline={t.date}
              handleDelete={handleDeleteTask}
              handleEdit={handleEditTask}
            />
          ))}
        </Col>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalAction}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex flex-column">
            <Form.Group className="mb-3" controlId="tituloTarefa">
              <Form.Label>Título da tarefa</Form.Label>
              <Form.Control
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Título da Tarefa"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="dataTarefa">
              <Form.Label>Data da tarefa</Form.Label>
              <Form.Control
                type="date"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                placeholder="Data da Tarefa"
              />
            </Form.Group>

            <Button variant="success" onClick={submitTask}>
              {formAction}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
