import { Box, LinearProgress, makeStyles } from '@material-ui/core'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import React, { useEffect } from 'react'
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

  useEffect(() => {
    dispatch(noteAction.fetchNoteList)
  }, [dispatch])

  return (
    <Box className={classes.root}>{loading && <LinearProgress className={classes.loading} />}</Box>
  )
}
