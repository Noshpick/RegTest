const Input = ({ label, type, value, onChange }) => (
  <div style={{ marginBottom: "10px" }}>
    <label>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      style={{ width: "100%", padding: "8px", marginTop: "5px" }}
    />
  </div>
);

export default Input;