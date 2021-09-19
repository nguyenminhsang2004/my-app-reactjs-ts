import { call, put, takeLatest } from '@redux-saga/core/effects'
import postApi from 'api/postApi'
import { ListResponse, Post } from 'models'
import { toast } from 'react-toastify'
import { postAction } from './postSlice'

function* fetchPostList() {
  try {
    const response: ListResponse<Post> = yield call(postApi.getAll)
    if (response.success) {
      yield put(postAction.fetchPostListSuccess(response))
    } else {
      toast.error(response.content.message)
      yield put(postAction.fetchPostListFailed(response.content.message))
    }
  } catch (error) {
    console.log(error)
    yield put(postAction.fetchPostListFailed('Fetch post data failed'))
  }
}

export default function* postSaga() {
  yield takeLatest(postAction.fetchPostList.type, fetchPostList)
}
