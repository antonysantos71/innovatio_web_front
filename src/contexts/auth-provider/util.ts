import { api } from "@/services/api";
import { IUser } from "./types";

export const setUserLocalStorage = (user: IUser | null) => {
  localStorage.setItem("u", JSON.stringify(user));
};

export const getUserLocalStorage = () => {
  const json = localStorage.getItem("u");

  if (!json) {
    return null;
  }
  const user = JSON.parse(json);

  return user ?? null;
};

export const loginRequest = async (email: string, password: string) => {
  try {
    const request = await api.post("/users", {
      email,
      password,
    });
    return request.data;
  } catch (error) {
    return error;
  }
};
