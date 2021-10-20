import { User } from 'models'

export const getCurrentUser = (): User => JSON.parse(localStorage.getItem('user_login') as string)

export const getNoteColor = (isUsed: number) => (isUsed > 0 ? 'green' : 'red')
