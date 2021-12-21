import { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector, connect } from "react-redux";
import HttpClient from "../HttpClient";
import DisplayMessage from "./DisplayMessage";
function RegisterForm({ goToLogin }) {
  const IdRef = useRef();
  const passwordRef = useRef();
  const NameRef = useRef();
  const [message, setMessage] = useState("");
  function Register(e) {
    e.preventDefault();
    const id = IdRef.current.value;
    const name = NameRef.current.value;
    const pw = passwordRef.current.value;
    if (id === "" || name === "" || pw === "") {
      setMessage("Please fill in the information");
    } else {
      HttpClient({
        url: "/user/register",
        method: "post",
        data: {
          id: id,
          name: name,
          password: pw,
        },
      })
        .then((result) => {
          console.log(result.data);
          if (result.data.Error) {
            setMessage("userID already in use, please try another ID");
          } else {
            goToLogin();
          }
        })
        .catch((err) => console.log(err.message));
    }
  }
  return (
    <div className="form-component">
      <h1>Register</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>User ID</Form.Label>
          <Form.Control type="text" ref={IdRef} placeholder="Enter User ID" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            ref={NameRef}
            placeholder="Enter your name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            ref={passwordRef}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="text-center">
          <Button variant="primary" type="submit" onClick={Register}>
            Sign Up
          </Button>
        </Form.Group>
      </Form>
      <div>
        {message && <DisplayMessage type="danger" text={message} />}
        <p>
          Already have an accoount?{" "}
          <a href="#" onClick={goToLogin}>
            Login
          </a>{" "}
          here
        </p>
      </div>
    </div>
  );
}
export default RegisterForm;
