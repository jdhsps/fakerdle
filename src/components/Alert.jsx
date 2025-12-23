import "../Alert.css";

const Alert = ({ message, onClose }) => {
  return (
    <div className="alert-backdrop">
      <div className="alert-box">
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default Alert;
