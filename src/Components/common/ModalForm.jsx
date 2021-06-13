import { Modal, Button } from "react-bootstrap";

const ModalForm = (props) => {
    return (
        <Modal size="sm" show={props.show} onHide={props.close} dialogClassName='custom-dialog'>
            <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <form className="form-inline">
                    <div className="form-group">
                        <label htmlFor={props.name} class="sr-only">
                            {props.label}
                        </label>
                        <input
                            type="text"
                            class="form-control mt-2"
                            value={props.value}
                            id={props.name}
                            name={props.name}
                            placeholder={props.name}

                            onChange={(e) => props.onChange(e)}
                        />
                        {props.error && (
                            <div className="text-danger mt-2 mx-3">{props.error}</div>
                        )}
                    </div>
                </form>


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
export default ModalForm