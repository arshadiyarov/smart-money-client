export interface AuthResponse {
  message: string;
  token: string | null;
}

export interface ForgotPasswordResponse {
  first: string;
  second: number;
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

export interface ForgotPasswordPayload {
  email: string;
  password: string;
  verificationCode: string;
}
