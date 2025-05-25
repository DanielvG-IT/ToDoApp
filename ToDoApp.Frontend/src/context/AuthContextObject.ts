import type { AuthResponse } from "@/api/auth";
import { createContext } from "react";
// import type { AuthResponse } from "@/api/auth";

interface AuthContextType {
  token: AuthResponse["token"];
  // user: AuthResponse["user"] | null;
  // loading: boolean;
  login: (email: string, pw: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    pw: string,
    number: string
  ) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export type { AuthContextType };
