import { Note } from 'models'
import { DataResponse, ListResponse } from 'models/common'
import axiosClient from './axiosClient'

const noteApi = {
  getAll(): Promise<ListResponse<Note>> {
    const url = '/api/notes/get-all'
    return axiosClient.get(url)
  },
  getNoteById(id: string): Promise<DataResponse<Note>> {
    const url = `/api/notes/get-by-id/${id}`
    return axiosClient.get(url)
  },
  add(data: Note): Promise<Note> {
    const url = '/api/notes/add'
    return axiosClient.post(url, { data })
  },
  update(data: Note): Promise<DataResponse<Note>> {
    const url = `/api/notes/update/${data._id}`
    return axiosClient.put(url, { data })
  },
  remove(id: string): Promise<any> {
    const url = `/api/notes/remove/${id}`
    return axiosClient.delete(url)
  },
}

export default noteApi
