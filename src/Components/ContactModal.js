import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddContact, setMessage } from "../Redux/User/UserAction";
import ErrorMessage from "./DisplayMessage";
function ContactModal({ show, handleClose }) {
  const textRef = useRef();
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.user.user.userID);
  const message = useSelector((state) => state.user.message);
  function handleAddContact() {
    dispatch(fetchAddContact(userID, textRef.current.value));
  }
  function onClose() {
    handleClose();
    dispatch(setMessage(null));
  }
  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add Contacts</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Add Friend</Form.Label>
            <Form.Control
              type="text"
              ref={textRef}
              placeholder="Enter your friend's ID"
            ></Form.Control>
            {message !== null ? <ErrorMessage {...message} /> : null}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAddContact}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ContactModal;
