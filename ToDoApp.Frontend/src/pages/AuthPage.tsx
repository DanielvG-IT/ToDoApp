// src/pages/AuthPage.tsx
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const AuthPage = () => {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    number: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      await register(form.username, form.email, form.password, form.number);
    } else {
      await login(form.email, form.password);
    }
  };

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
