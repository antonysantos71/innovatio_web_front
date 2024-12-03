import { api } from "@/services/api";
import { createContext, useState, ReactNode } from "react";

// Definindo o tipo dos dados do usuário
interface User {
  id: string;
  username: string;
  email: string;
  token: string;
}

// Tipos das ações do contexto
interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

// Criando o contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provedor de contexto
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // Função de login
  const login = async (username: string, password: string) => {
    try {
      const response = await api.post("/login", { username, password });
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data)); // Armazenando no localStorage
    } catch (error) {
      console.error("Falha no login:", error);
      throw new Error("Falha no login");
    }
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Função para verificar autenticação
  const checkAuth = async () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
