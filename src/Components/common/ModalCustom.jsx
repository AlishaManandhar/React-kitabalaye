import { Modal, Button } from "react-bootstrap";

const ModalCustom =(props) =>{
    return (
        <Modal size="sm" show={props.show} onHide={props.close} dialogClassName='custom-dialog'>
            <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                    <p>{props.body}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.reject}>
                    {props.rejectTitle}
      </Button>
                <Button variant="danger" onClick={props.accept}>
                    {props.acceptTitle}
      </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ModalCustom