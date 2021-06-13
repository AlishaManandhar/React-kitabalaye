import { Modal, Button } from "react-bootstrap";

const ModalPassword =(props) =>{
    return (
        <Modal size="sm" show={props.show} onHide={props.close} dialogClassName='custom-dialog'>
            <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    
            <form className="form-inline">
                        <div className="form-group">
                            <label htmlFor="oldPassword" id="old" class="sr-only">
                                OldPassword
                            </label>
                            <input
                                type="password"
                                class="form-control mt-2"
                                value={props.old}
                                id="oldPassword"
                                name="oldPassword"
                                placeholder="oldPassword"
                                onChange={(e) => props.onChange(e)}
                            />
                            {props.error1 && (
                                <div className="text-danger mt-2 mx-3">{props.error1}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="new" id="new" class="sr-only">
                                New Password
                            </label>
                            <input
                                type="password"
                                class="form-control mt-2"
                                value={props.new}
                                id="new"
                                name="password"
                                placeholder="password"
                                onChange={(e) => props.onChange(e)}
                            />
                            {props.error2 && (
                                <div className="text-danger mt-2 mx-3">{props.error2}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="repassword" id="repassword" class="sr-only">
                                ReEnter Password
                            </label>
                            <input
                                type="password"
                                class="form-control mt-2"
                                value={props.re}
                                id="repassword"
                                name="rePassword"
                                placeholder="reenter password"
                                onChange={(e) => props.onChange(e)}
                            />
                            {props.error3 && (
                                <div className="text-danger mt-2 mx-3">{props.error3}</div>
                            )}
                        </div>
                    
                    
                    </form>
               

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.reject}>
                    Cancel
      </Button>
                <Button variant="danger" onClick={props.accept}>
                    Save Changes
      </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ModalPassword