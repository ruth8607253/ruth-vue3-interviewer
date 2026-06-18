import { apiClient } from '@/api/axios'
import type { Account, AccountFormDto } from '@/types/account'

export const fetchAccounts = async (): Promise<Account[]> => {
  const response = await apiClient.get<Account[]>('/accounts')
  return response.data
}

export const createAccount = async (payload: AccountFormDto): Promise<Account> => {
  const response = await apiClient.post<{ account: Account }>('/create-account', payload)
  return response.data.account
}
