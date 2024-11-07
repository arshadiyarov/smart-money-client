import { axiosClient } from "@/shared/api/axios";
import {
  AuthResponse,
  SignInPayload,
  SignUpPayload,
} from "@/entities/auth/auth";

class AuthService {
  async signUp({ ...payload }: SignUpPayload) {
    const res = await axiosClient.post<AuthResponse>("/auth/sign-up", payload);

    return res.data;
  }

  async signIn({ ...payload }: SignInPayload) {
    const res = await axiosClient.post<AuthResponse>("/auth/sign-in", payload);

    return res.data;
  }
}
