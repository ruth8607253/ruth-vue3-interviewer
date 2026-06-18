import type { AuthResponse, LoginPayload } from '@/types/auth'

const createToken = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2)}-${Date.now()}`

export const loginWithCredentials = async (payload: LoginPayload): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 400))
  if (!payload.email || !payload.password) {
    throw new Error('Email and password are required.')
  }
  return {
    accessToken: createToken('access'),
    refreshToken: createToken('refresh'),
    expiresAt: Date.now() + 1000 * 60 * 30,
    user: {
      email: payload.email,
    },
  }
}

export const refreshAuthToken = async (refreshToken: string): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  if (!refreshToken) {
    throw new Error('Refresh token is missing.')
  }
  return {
    accessToken: createToken('access'),
    refreshToken: createToken('refresh'),
    expiresAt: Date.now() + 1000 * 60 * 30,
    user: {
      email: 'session@user.local',
    },
  }
}
