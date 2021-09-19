import { call, put, takeLatest } from '@redux-saga/core/effects'
import noteApi from 'api/noteApi'
import { ListResponse, Note } from 'models'
import { toast } from 'react-toastify'
import { noteAction } from './noteSlice'

function* fetchNoteList() {
  try {
    const response: ListResponse<Note> = yield call(noteApi.getAll)
    if (response.success) {
      yield put(noteAction.fetchNoteListSuccess(response))
    } else {
      toast.error(response.content.message)
      yield put(noteAction.fetchNoteListFailed(response.content.message))
    }
  } catch (error) {
    console.log(error)
    yield put(noteAction.fetchNoteListFailed('Failed to load data'))
  }
}

export default function* noteSaga() {
  yield takeLatest(noteAction.fetchNoteList.type, fetchNoteList)
}
