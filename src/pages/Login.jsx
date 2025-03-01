import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email && password) {
      await login({ email, password });
      navigate("/");
    } else {
      alert("Fill in all fields");
    }
  };

  return (
    <div style={{ width: "300px", margin: "auto", marginTop: "100px" }}>
      <h2>Login</h2>
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button text="Login" onClick={handleLogin} />
      <p>No account? <a href="/register">Register</a></p>
    </div>
  );
};

export default Login;
