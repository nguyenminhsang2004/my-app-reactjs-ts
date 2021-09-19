import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  LinearProgress,
  makeStyles,
  Tooltip
} from '@material-ui/core'
import { Add } from '@material-ui/icons'
import noteApi from 'api/noteApi'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { Note } from 'models'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import NoteForm from '../components/NoteForm'
import { noteAction, selectNoteLoading } from '../noteSlice'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },

  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },

  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

export default function NoteListPage() {
  const classes = useStyles()
  const loading = useAppSelector(selectNoteLoading)
  const dispatch = useAppDispatch()
  const [openFormAdd, setOpenFormAdd] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [note, setNote] = useState<Note>()
  
  useEffect(() => {
    dispatch(noteAction.fetchNoteList)
  }, [dispatch])

  const handleCloseFormAdd = () => {
    setOpenFormAdd(false)
  }

  const initialValue: Note = {
    title: '',
    content: '',
    ...note,
  } as Note

  const handleSubmitForm = async (formValue: Note) => {
    setOpenFormAdd(false)
    console.log(formValue)
    if (isEdit) {
      await noteApi.update(formValue)
      setIsEdit(false)
    } else {
      await noteApi.add(formValue)
    }
    toast.success('Save note successfully.')
  }

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Tooltip title="Add New Note" aria-label="add">
        <Fab
          className={classes.fab}
          color="primary"
          size="large"
          onClick={() => setOpenFormAdd(true)}
        >
          <Add />
        </Fab>
      </Tooltip>

      <Dialog
        open={openFormAdd}
        onClose={handleCloseFormAdd}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">{isEdit ? 'Update Note' : 'Add New Note'}</DialogTitle>
        <DialogContent>
          <NoteForm initialValue={initialValue} onSubmit={handleSubmitForm} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFormAdd} color="secondary" variant="outlined" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
