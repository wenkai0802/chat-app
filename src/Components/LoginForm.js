import { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector, connect } from "react-redux";
import { fetchLoginRequest } from "../Redux/User/UserAction";
import DisplayMessage from "./DisplayMessage";
function LoginForm({ goToRegister }) {
  const dispatch = useDispatch();
  const IdRef = useRef();
  const passwordRef = useRef();
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const message = useSelector((state) => state.user.message);
  const Login = (e) => {
    e.preventDefault();
    console.log(IdRef.current.value);
    dispatch(fetchLoginRequest(IdRef.current.value, passwordRef.current.value));
  };

  return (
    <div className="form-component">
      <h1>Login</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>User ID</Form.Label>
          <Form.Control type="text" ref={IdRef} placeholder="Enter User ID" />
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
          <Button variant="primary" type="submit" onClick={Login}>
            Sign In
          </Button>
        </Form.Group>
      </Form>
      <div>
        {message && <DisplayMessage type="danger" text={message} />}
        <p>
          New Member?{" "}
          <a href="#" onClick={goToRegister}>
            Register
          </a>{" "}
          here
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
