export interface AuthResponse {
  message: string;
  token: string | null;
}

export interface SignUpPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  verificationCode: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}
