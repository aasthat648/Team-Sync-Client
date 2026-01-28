export interface RegisterRequest {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  name: string;
  email: string;
  username: string;
  token: string;
  avatarUrl: string | null;
  currentWorkspace: string;
}
