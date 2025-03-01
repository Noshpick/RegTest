import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Input from "../components/Input";
import Button from "../components/Button";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (email && password.length >= 8) {
      await register({ firstName: "User", lastName: "Test", email, password, emailConfirmed: false, role: "ROLE_USER" });
      navigate("/login");
    } else {
      alert("Password must be at least 8 characters long.");
    }
  };

  return (
    <div style={{ width: "300px", margin: "auto", marginTop: "100px" }}>
      <h2>Register</h2>
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button text="Register" onClick={handleRegister} />
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Register;