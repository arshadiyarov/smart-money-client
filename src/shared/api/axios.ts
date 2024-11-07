import { apiUrl } from "@/shared/api/config";
import axios from "axios";

export const axiosClient = axios.create({
  withCredentials: true,
  baseURL: apiUrl,
  headers: {
    Accept: "application/json",
  },
});
