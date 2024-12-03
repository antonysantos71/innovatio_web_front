import axios from "axios";

// Configuração do axios com a URL base
export const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const login = async (
  email: string,
  password: string
): Promise<boolean> => {
  try {
    // Requisição para obter todos os usuários
    const response = await api.get("/users");

    // Verifica se o usuário existe e a senha está correta
    const user = response.data.find(
      (user: { email: string; password: string }) =>
        user.email === email && user.password === password
    );

    // Se o usuário for encontrado, gera um "token" e armazena no localStorage
    if (user) {
      // Simula um token com o ID do usuário ou qualquer valor
      const token = `token-${user.id}`;

      // Armazena o "token" no localStorage
      localStorage.setItem("authToken", token);

      console.log("Login bem-sucedido:", user);
      return true; // Login bem-sucedido
    }

    // Caso o usuário não exista ou a senha não seja correta
    console.error("Login falhou: Usuário ou senha inválidos");
    return false; // Login falhou
  } catch (error) {
    console.error(
      "Falha no login:",
      error.response ? error.response.data : error.message
    );
    return false; // Login falhou
  }
};

// Função para cadastro de usuário
export const singUp = async (name: string, email: string, password: string) => {
  try {
    // Verifica se o email já existe
    const response = await api.get("/users?email=" + email);
    
    if (response.data.length > 0) {
      throw new Error("Email já cadastrado.");
    }

    // Se o email não existir, cria o novo usuário
    const createResponse = await api.post("/users", { name, email, password });
    console.log("Cadastro bem-sucedido:", createResponse.data);
    return createResponse.data; // Retorna a resposta do cadastro
  } catch (error) {
    console.error(
      "Falha no cadastro:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Cadastro falhou");
  }
};

// Função para verificar se o usuário está autenticado
const checkAuth = async () => {
  try {
    const response = await api.get("/auth-check");
    console.log("Usuário autenticado:", response.data);
    return response.data; // Retorna informações sobre a autenticação
  } catch (error) {
    console.error(
      "Falha ao verificar autenticação:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Falha na autenticação");
  }
};

// Função para logout
const logout = async () => {
  try {
    const response = await api.post("/logout");
    console.log("Logout bem-sucedido:", response.data);
    return response.data; // Retorna a resposta do logout
  } catch (error) {
    console.error(
      "Falha no logout:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Logout falhou");
  }
};
