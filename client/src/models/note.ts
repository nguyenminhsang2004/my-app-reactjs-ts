export interface Note {
  _id: string
  title: string
  content: string
  author: {
    _id: string
    fullName: string
    imageUrl: string
  }
  createdAt: Date
  updatedAt: Date
  completedAt: Date
  status: 'COMPLETED' | 'NOT COMPLETED'
}
