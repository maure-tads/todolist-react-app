import { Form, Modal } from "react-bootstrap";

function Formulario() {
    return (
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
              Cadastrar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
}

export default Formulario