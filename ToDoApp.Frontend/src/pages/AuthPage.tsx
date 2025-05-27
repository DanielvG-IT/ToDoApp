import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { login, register } = useAuth();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    number: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      try {
        await register(form.username, form.email, form.password, form.number);
        setSuccess("Registration successful! You can now log in.");
        setTimeout(() => {
          setSuccess("");
          setIsRegister(false);
        }, 2000);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Registration failed.");
        } else {
          setError("Registration failed.");
        }
      }
    } else {
      try {
        await login(form.email, form.password);
        setSuccess("Login successful!");
        setTimeout(() => {
          setSuccess("");
          setRedirect(true);
        }, 2000);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Registration failed.");
        } else {
          setError("Registration failed.");
        }
      }
    }
  };
  if (redirect) {
    return <Navigate to="/todos" replace />;
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl mb-6">{isRegister ? "Register" : "Login"}</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        {isRegister && (
          <Input
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        )}
        <Input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {isRegister && (
          <Input
            placeholder="Phone number"
            type="tel"
            value={form.number}
            onChange={(e) => setForm({ ...form, number: e.target.value })}
          />
        )}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative"
            role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {success && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative"
            role="alert">
            <span className="block sm:inline">{success}</span>
          </div>
        )}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition-colors duration-200">
          {isRegister ? "Sign Up" : "Sign In"}
        </Button>
      </form>
      <p className="mt-4 text-center">
        {isRegister ? "Already have an account? " : "Don't have an account? "}
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          className="ml-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 text-white font-medium shadow hover:from-purple-500 hover:to-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300">
          {isRegister ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
};
