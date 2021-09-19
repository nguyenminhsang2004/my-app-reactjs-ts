import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { ListResponse, Post } from 'models'

export interface PostState {
  loading: boolean
  list: Post[]
}

const initialState: PostState = {
  loading: false,
  list: [],
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    fetchPostList(state) {
      state.loading = true
    },
    fetchPostListSuccess(state, action: PayloadAction<ListResponse<Post>>) {
      state.loading = false
      state.list = action.payload.content.data
    },
    fetchPostListFailed(state, action: PayloadAction<string>) {
      state.loading = false
    },
  },
})

// Actions
export const postAction = postSlice.actions

// Selector
export const selectPostLoading = (state: RootState) => state.post.loading
export const selectPostList = (state: RootState) => state.post.list

// Reducers
const postReducer = postSlice.reducer
export default postReducer
