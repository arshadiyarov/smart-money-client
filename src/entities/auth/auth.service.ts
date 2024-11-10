import { axiosClient } from "@/shared/api/axios";
import {
  AuthResponse,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
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

  async forgotPassword({ ...payload }: ForgotPasswordPayload) {
    try {
      const res = await axiosClient.post<ForgotPasswordResponse>(
        "/auth/forgot-password",
        payload,
      );

      return res.data;
    } catch {
      throw new Error("Error while resetting password");
    }
  }
}

export const authService = new AuthService();
