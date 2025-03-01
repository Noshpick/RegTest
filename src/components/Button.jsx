const Button = ({ text, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: "100%",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      cursor: "pointer",
      marginTop: "10px"
    }}
  >
    {text}
  </button>
);

export default Button;