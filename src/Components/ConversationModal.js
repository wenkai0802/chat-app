import { useEffect, useState } from "react";
import { Modal, Form, Button, CheckBox } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import HttpClient from "../HttpClient";
import {
  fetchCreateConversation,
  setErrorMessage,
} from "../Redux/Members/MembersAction";
import DisplayMessage from "./DisplayMessage";
function ConversationModal({ handleClose, show }) {
  const contacts = useSelector((state) => state.user.user.contact);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const errorMessage = useSelector((state) => state.members.errorMessage);
  const dispatch = useDispatch();

  function handleCheck(e) {
    console.log(e.target.checked);
    if (e.target.checked && !selectedUsers.includes(e.target.value))
      setSelectedUsers((users) => {
        return [...users, e.target.value];
      });
    else if (!e.target.checked && selectedUsers.includes(e.target.value)) {
      setSelectedUsers((users) =>
        users.filter((user) => user !== e.target.value)
      );
    }
  }

  function handleSubmit() {
    if (selectedUsers.length !== 0) {
      dispatch(fetchCreateConversation(selectedUsers));
    } else {
      dispatch(setErrorMessage("Please Choose at least one contact"));
    }
  }
  function onClose() {
    handleClose();
    dispatch(setErrorMessage(null));
  }
  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add Conversation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Start a conversation</Form.Label>
            {contacts.length === 0 && (
              <p>Please add your friend to contact first</p>
            )}
            {errorMessage !== null ? (
              <DisplayMessage {...errorMessage} />
            ) : null}
            <div className="checkbox-grp">
              {contacts.map((contact, index) => {
                const isChecked = selectedUsers.includes(contact);
                return (
                  <div key={index} className="checkbox-item">
                    <input
                      type="checkbox"
                      onChange={handleCheck}
                      value={contact}
                      checked={isChecked}
                      style={{
                        marginRight: "3px",
                      }}
                    />
                    <span>{contact}</span>
                  </div>
                );
              })}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ConversationModal;
