import { User } from './user'
export interface PaginationParams {
  _limit: number
  _totalRows: number
}
export interface ListResponse<T> {
  success: boolean
  content: {
    message: string
    data: T[]
    //pagination: PaginationParams;
  }
}
export interface ListResponseStatistics {
  success: boolean
  content: {
    message: string
    data: {
      postCount: number,
      likeCount: number,
      noteCount: number,
      other:number,
    }
  }
}
export interface Auth {
  success: boolean
  content: {
    message: string
    accessToken: string
    user: User
  }
}
export interface DataResponse<T> {
  success: boolean
  content: {
    message: string
    data: T
  }
}
export interface LoginPayLoad {
  email: string
  passWord: string
}
