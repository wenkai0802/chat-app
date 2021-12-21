import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./Pages/LoginPage";
import HttpClient from "./HttpClient";
import { useEffect, useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./Redux/store";
import {
  addContact,
  fetchAddContact,
  fetchLoginSuccess,
} from "./Redux/User/UserAction";
import HomePage from "./Pages/HomePage";
import RegisterPage from "./Pages/RegisterPage";
function App() {
  const user = useSelector((state) => state.user.user);
  const [register, setRegister] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    HttpClient({
      method: "get",
      url: "/user",
    })
      .then((result) => {
        if (!result.data.status) {
          dispatch(fetchLoginSuccess(result.data));
        }
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function goToRegister() {
    setRegister(true);
  }
  function goToLogin() {
    setRegister(false);
  }
  return (
    <div className="App">
      {user.userID ? (
        <HomePage />
      ) : register ? (
        <RegisterPage goToLogin={goToLogin} />
      ) : (
        <LoginPage goToRegister={goToRegister} />
      )}
    </div>
  );
}

export default App;
