import { Grid } from '@material-ui/core'
import { Note } from 'models'
import React from 'react'
import NoteItem from './NoteItem'

export interface NoteListProps {
  noteList: Note[]
  onRemove: (id: string) => void
  onEdit: (id: string) => void
}

export default function NoteList({ noteList, onRemove, onEdit }: NoteListProps) {
  const handleRemoveNote = (id: string) => {
    onRemove?.(id)
  }

  const handleEditNote = (id: string) => {
    onEdit?.(id)
  }

  return (
    <Grid container spacing={2}>
      {Array.isArray(noteList) &&
        noteList.length > 0 &&
        noteList.map((note, idx) => (
          <Grid key={idx} item xs={12} md={6} lg={3}>
            <NoteItem note={note} onEdit={handleEditNote} onRemove={handleRemoveNote} />
          </Grid>
        ))}
    </Grid>
  )
}
