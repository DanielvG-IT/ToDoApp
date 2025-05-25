import { type ReactNode } from "react";
import { login, register } from "@/api/auth";
import { AuthContext } from "@/context/AuthContextObject";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<AuthContextType["user"]>(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   // const storedUser = localStorage.getItem("user");
  //   // if (token && storedUser) {
  //   //   setUser(JSON.parse(storedUser));
  //   // }
  //   setLoading(false);
  // }, []);

  const doLogin = async (email: string, pw: string) => {
    const { data } = await login({ email, password: pw });
    localStorage.setItem("token", data.token);
    // localStorage.setItem("refreshToken", data.refreshToken);
    // localStorage.setItem("user", JSON.stringify(data.user));
    // setUser(data.user);
  };

  const doRegister = async (
    username: string,
    email: string,
    pw: string,
    number: string
  ) => {
    await register({
      username,
      email,
      password: pw,
      phoneNumber: number,
    });
  };

  const logout = () => {
    localStorage.clear();
    // setUser(null);
    window.location.href = "/auth";
  };

  return (
    <AuthContext.Provider
      value={{ login: doLogin, register: doRegister, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
