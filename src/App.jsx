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

function App() {
  const [tasks, setTasks] = useState([]);
  const [formWidth, setFormWidth] = useState(window.innerWidth * 0.3);
  const [lastTask, setLastTask] = useState("");

  const getFormWidth = () =>
    setFormWidth(
      window.innerWidth > 900
        ? window.innerWidth * 0.3
        : window.innerWidth * 0.75
    );

  window.addEventListener("resize", getFormWidth);

  const [tituloTarefa, setTituloTarefa] = useState("");
  const [dataTarefa, setDataTarefa] = useState("");

  const cadastrarTarefa = () => {
    const novaTarefa = {
      titulo: tituloTarefa,
      data: Date.parse(dataTarefa),
      createdAt: Date.now(),
    };

    setLastTask(novaTarefa.titulo);

    setTituloTarefa("");
    setDataTarefa("");

    tasks.push(novaTarefa);
    setTasks(tasks);

    setShowToast(true);
    handleClose();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showToast, setShowToast] = useState(false);

  return (
    <>
      <ToastContainer className="p-5" position="top-center">
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
        <Button variant="primary" onClick={handleShow}>
          Nova Tarefa
        </Button>

        <Col className="m-5" style={{ height: "50vh" }}>
          {tasks.map((t) => (
            <Task titulo={t.titulo} />
          ))}
        </Col>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Nova Tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex flex-column">
            <Form.Group className="mb-3" controlId="tituloTarefa">
              <Form.Label>Título da tarefa</Form.Label>
              <Form.Control
                type="text"
                value={tituloTarefa}
                onChange={(e) => setTituloTarefa(e.target.value)}
                placeholder="Título da Tarefa"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="dataTarefa">
              <Form.Label>Data da tarefa</Form.Label>
              <Form.Control
                type="date"
                value={dataTarefa}
                onChange={(e) => setDataTarefa(e.target.value)}
                placeholder="Data da Tarefa"
              />
            </Form.Group>

            <Button variant="success" onClick={cadastrarTarefa}>
              Cadastrar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
