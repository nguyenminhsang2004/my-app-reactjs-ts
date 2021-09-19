import { DataResponse, ListResponse } from 'models/common'
import { Post } from 'models/post'
import axiosClient from './axiosClient'

const postApi = {
  getAll(): Promise<ListResponse<Post>> {
    const url = '/api/posts/get-all'
    return axiosClient.get(url)
  },
  getPostById(id: string): Promise<DataResponse<Post>> {
    const url = `/api/posts/get-by-id/${id}`
    return axiosClient.get(url)
  },
  add(data: Post): Promise<Post> {
    const url = '/api/posts/add'
    return axiosClient.post(url, { data })
  },
  update(data: Post): Promise<DataResponse<Post>> {
    const url = `/api/posts/update/${data._id}`
    return axiosClient.put(url, { data })
  },
  remove(id: string): Promise<any> {
    const url = `/api/posts/remove/${id}`
    return axiosClient.delete(url)
  },
}

export default postApi
