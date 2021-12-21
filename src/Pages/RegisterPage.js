import RegisterForm from "../Components/RegisterForm";

function RegisterPage({ goToLogin }) {
  return (
    <div>
      <h1 className="title">WeTalk</h1>
      <div className="background">
        <RegisterForm goToLogin={goToLogin} />
      </div>
    </div>
  );
}
export default RegisterPage;
