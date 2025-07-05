import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "admin123") {
      localStorage.setItem("admin", "true");
      navigate("/admin");
    } else {
      alert("Incorrect password!");
    }
  };

  return (
    <div className="max-w-sm mx-auto py-12 px-6 shadow-md rounded-lg mt-12 border border-gray-300">
      <h2 className="text-xl font-bold mb-6 text-center">Admin Login</h2>
      <input
        type="password"
        className="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring focus:ring-primary"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-primary hover:bg-primary-variant text-white px-4 py-2 rounded w-full transition-all duration-300 cursor-pointer">
        Login
      </button>
    </div>
  );
};

export default Login;
