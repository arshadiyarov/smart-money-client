import { axiosClient } from "@/shared/api/axios";
import {
  AuthResponse,
  SignInPayload,
  SignUpPayload,
} from "@/entities/auth/auth";

class AuthService {
  async signUp({ ...payload }: SignUpPayload) {
    try {
      const res = await axiosClient.post<AuthResponse>(
        "/auth/sign-up",
        payload,
      );

      return res.data;
    } catch {
      throw new Error("Can't sign up");
    }
  }

  async signIn({ ...payload }: SignInPayload) {
    try {
      const res = await axiosClient.post<AuthResponse>(
        "/auth/sign-in",
        payload,
      );

      return res.data;
    } catch {
      throw new Error("Can't sign in");
    }
  }
}

export const authService = new AuthService();
