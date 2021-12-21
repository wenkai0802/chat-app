import LoginForm from "../Components/LoginForm";

function LoginPage({ goToRegister }) {
  return (
    <div>
      <h1 className="title">WeTalk</h1>
      <div className="background">
        <LoginForm goToRegister={goToRegister} />
      </div>
    </div>
  );
}

export default LoginPage;
