import axios from "axios";
import { createContext, useContext } from "react";

export const connection = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const ConnectionContext = createContext(null);

/**
 * @return { import('axios').AxiosInstance }
 */
export default function useConnection() {
  return useContext(ConnectionContext);
}
