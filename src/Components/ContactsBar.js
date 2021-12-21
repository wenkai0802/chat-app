import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ContactModal from "./ContactModal";

function Contacts() {
  const contacts = useSelector((state) => state.user.user.contact);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <ContactModal handleClose={handleClose} show={show} />
      <div className="tab">
        <div className="btn-container">
          <Button className="btn-add" onClick={handleShow}>
            Add Contact
          </Button>
        </div>
        <div className="list">
          {contacts.map((contact, index) => {
            return (
              <div key={`${contact}${index}`} className="contact-name">
                {contact}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Contacts;
