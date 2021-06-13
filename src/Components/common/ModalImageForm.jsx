import { Modal, Button } from "react-bootstrap";

const ModalImageForm = (props) => {
    return (
        <Modal size="sm" show={props.show} onHide={props.close} dialogClassName='custom-dialog'>
            <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <form className="form-inline">
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="File01">{props.label}</label>
                        <input type="file" accept="image/*" className="form-control" id="File01" name="file" onChange={props.onChange} />
                    </div>
                    {props.error && <div className="text-danger mt-2 mx-3">{props.error}</div>}


                </form>


            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.reject}>
                    Cancel
      </Button>
                <Button variant="danger" onClick={props.accept}>
                    Save changes
      </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ModalImageForm