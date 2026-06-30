import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await apiFetch("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminEmail", data.email);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 bg-opacity-50 rounded-2xl shadow-2xl backdrop-blur-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Soydeli Admin</h1>
          <p className="mt-2 text-gray-400">
            Welcome back, please login to your account.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-500 bg-opacity-20 text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
              placeholder="Email"
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-amber-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
