import { RootState } from 'app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ListResponse, Note } from 'models'

export interface NoteState {
  loading: boolean
  noteList: Note[]
}

const initialState: NoteState = {
  loading: false,
  noteList: [],
}

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    fetchNoteList(state) {
      state.loading = true
    },
    fetchNoteListSuccess(state, action: PayloadAction<ListResponse<Note>>) {
      state.loading = false
      state.noteList = action.payload.content.data
    },
    fetchNoteListFailed(state, action: PayloadAction<string>) {
      state.loading = false
    },
  },
})

// Action
export const noteAction = noteSlice.actions
// Selector
export const selectNoteLoading = (state: RootState) => state.note.loading
export const selectNoteList = (state: RootState) => state.note.noteList
// Reducer
const noteReducer = noteSlice.reducer
export default noteReducer
