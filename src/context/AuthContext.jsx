import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../config.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const API_URL = `${API_BASE_URL}/api/users`;

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // You might want to fetch user profile here to validate the token
      // For now, we'll assume the token is valid if it exists.
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } else {
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
    }
  }, [token]);

  const signup = async (name, email, phone, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        phone,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      setToken(data.token);
      setUser(data);
      Swal.fire("Success!", "Account created successfully!", "success");
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "An error occurred";
      Swal.fire("Error", message, "error");
      if (message === "User already exists") {
        // Optionally suggest logging in
      }
      return false;
    }
  };

  const login = async (email, password, onLoginSuccess) => {
    try {
      const { data } = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      setToken(data.token);
      setUser(data);
      Swal.fire("Logged In!", `Welcome back, ${data.name}!`, "success");
      if (onLoginSuccess) onLoginSuccess();
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Invalid credentials";
      Swal.fire("Error", message, "error");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
    Swal.fire("Logged Out", "You have been logged out.", "info");
  };

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
