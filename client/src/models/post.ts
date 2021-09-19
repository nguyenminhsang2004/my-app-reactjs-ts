export interface Post {
  _id: string
  title: string
  content: string
  like: number
  imageUrl: string
  author: {
    _id: string
    fullName: string
    imageUrl: string
  }
  createdAt: Date
  updatedAt: Date
}
