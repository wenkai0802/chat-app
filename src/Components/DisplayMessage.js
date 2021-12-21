function DisplayMessage({ type, text }) {
  return (
    <div className={type === "danger" ? `error-message` : "success-message"}>
      {text}
    </div>
  );
}
export default DisplayMessage;
