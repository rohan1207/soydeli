import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import AccountDashboard from "../components/auth/AccountDashboard";

const Account = () => {
  const { user } = useContext(AuthContext);
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'signup'

  const toggleForm = (mode) => {
    setAuthMode(mode);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6 sm:py-12 pt-24 sm:pt-32 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {user ? (
          <AccountDashboard />
        ) : (
          <div className="w-full max-w-[90%] sm:max-w-md mx-auto bg-white rounded-xl shadow-md sm:shadow-lg p-6 sm:p-8">
            <div className="mb-6 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {authMode === "login" ? "Welcome Back!" : "Create Account"}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                {authMode === "login"
                  ? "Please sign in to your account"
                  : "Sign up to start ordering delicious food"}
              </p>
            </div>
            {authMode === "login" ? (
              <Login toggleForm={toggleForm} />
            ) : (
              <Signup toggleForm={toggleForm} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
