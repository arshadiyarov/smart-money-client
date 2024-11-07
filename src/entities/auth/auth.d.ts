export interface AuthResponse {
  message: string;
  token: string;
}

export interface SignUpPayload {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  verificationCode: string;
}

export interface SignInPayload {
  username: string;
  password: string;
}
