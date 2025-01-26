export interface Request {
  email: string;
  password: string;
}

export interface SignupResponse {
  message: string;
  user: any;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    uid: string;
    email: string | null;
  };
}

export interface ErrorResponse {
  error: string;
}
