import authSaga from 'features/auth/authSaga'
import dashboardSaga from 'features/dashboard/dashboardSaga'
import noteSaga from 'features/note/noteSaga'
import postSaga from 'features/posts/postSaga'
import { all } from 'redux-saga/effects'

export default function* rootSaga() {
  yield all([authSaga(), postSaga(), noteSaga(), dashboardSaga(),])
}
