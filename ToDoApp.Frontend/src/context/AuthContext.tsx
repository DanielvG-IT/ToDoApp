import { useState, useEffect, type ReactNode } from "react";
import { login, register } from "@/api/auth";
import { AuthContext, type AuthContextType } from "@/context/AuthContextObject";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const doLogin = async (email: string, pw: string) => {
    const { data } = await login({ email, password: pw });
    localStorage.setItem("accessToken", data.accessToken);
    // localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const doRegister = async (
    username: string,
    email: string,
    pw: string,
    number: string
  ) => {
    const { data } = await register({
      username,
      email,
      password: pw,
      phoneNumber: number,
    });
    localStorage.setItem("accessToken", data.accessToken);
    // localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/auth";
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login: doLogin, register: doRegister, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
