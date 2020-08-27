import { createContext, useContext } from "react";

export const AuthStateContext = createContext({
  loggedIn: false,
  token: "",
});

export function useAuth() {
  return useContext(AuthStateContext);
}

export const AuthSetContext = createContext(() => {});

export function useSetAuth() {
  return useContext(AuthSetContext);
}
