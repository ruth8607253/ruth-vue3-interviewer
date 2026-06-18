export type RoleLevel = 'ADMIN' | 'EDITOR' | 'USER' | 'CLIENT'
export type AccountStatus = 'ON' | 'OFF'

export interface Account {
  id: string
  name: string
  email: string
  roleLevel: RoleLevel
  status: AccountStatus
  createdAt: string
}

export interface AccountFormDto {
  name: string
  email: string
  roleLevel: RoleLevel
  status: AccountStatus
}
