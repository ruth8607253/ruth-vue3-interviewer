export interface LoginPayload {
  email: string
  password: string
}

export interface AuthUser {
  email: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  expiresAt: number
  user: AuthUser
}

export interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  expiresAt: number | null
  user: AuthUser | null
}
