import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import { Note } from 'models'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { getNoteColor } from 'utils'

export interface NoteItemProps {
  note: Note
  onRemove: (id: string) => void
  onEdit: (id: string) => void
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    maxWidth: 360,
    minHeight: 250,
    backgroundColor: theme.palette.background.paper,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  section1: {
    padding: theme.spacing(2, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    margin: theme.spacing(1, 1, 1),
    float: 'right',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

export default function NoteItem({ note, onRemove, onEdit }: NoteItemProps) {
  const [isUsed, setIsUsed] = useState(0)
  const classes = useStyles()
  const [openContent, setOpenContent] = useState(false)
  const handleCloseContent = () => {
    setOpenContent(false)
  }
  useEffect(() => {
    const timeEnd = new Date(note.completedAt).valueOf() - new Date().valueOf()
    setIsUsed(timeEnd)
  }, [])

  const [openConfirmRemove, setConfirmRemove] = useState(false)

  const handleRemoveNote = () => {
    setConfirmRemove(false)
    onRemove?.(note._id)
  }

  //   const [status, setStatus] = React.useState('')

  //   const handleChangeSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
  //     setStatus(event.target.value as string)
  //   }

  return (
    <Paper elevation={3} className={classes.root} color="red">
      <Box
        color={getNoteColor(isUsed)}
        className={classes.section1}
        onClick={() => setOpenContent(true)}
      >
        <Typography gutterBottom variant="h5">
          {note.title}
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Box className={classes.section1} onClick={() => setOpenContent(true)}>
        <Typography color="textPrimary" variant="body1">
          Completed: {moment(note.completedAt).format('HH:MM MMM DD, YYYY')}
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Box
        color={getNoteColor(isUsed)}
        className={classes.section2}
        onClick={() => setOpenContent(true)}
      >
        <Typography gutterBottom variant="body1">
          {note.status}
        </Typography>
        {/* <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          onChange={handleChangeSelect}
        >
          <MenuItem value="NOT COMPLETED">Not Completed</MenuItem>
          <MenuItem value="COMPLETED">Completed</MenuItem>
        </Select> */}
      </Box>
      <Box className={classes.section3}>
        <ButtonGroup>
          {isUsed > 0 && (
            <Button onClick={() => onEdit?.(note._id)} size="small" variant="contained" color="primary">
              Edit
            </Button>
          )}
          <Button
            onClick={() => setConfirmRemove(true)}
            size="small"
            variant="contained"
            color="secondary"
          >
            Delete
          </Button>
        </ButtonGroup>
      </Box>

      <Dialog
        open={openContent}
        onClose={handleCloseContent}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">
          <Box color={getNoteColor(isUsed)}>
            <Typography gutterBottom variant="h4">
              {note.title}
            </Typography>
          </Box>
          <Typography color="primary" variant="body1">
            Created: {moment(note.createdAt).format('HH:MM MMM DD, YYYY')}
          </Typography>
          <Typography color="secondary" variant="body1">
            Completed: {moment(note.completedAt).format('HH:MM MMM DD, YYYY')}
          </Typography>
        </DialogTitle>
        <DialogContent>{note.content}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseContent} color="secondary" variant="outlined" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog confirm remove post */}
      <Dialog
        open={openConfirmRemove}
        onClose={() => setConfirmRemove(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove post</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure remove note title: "{note?.title}". <br />
            This action can&apos;t undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmRemove(false)} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleRemoveNote} color="secondary" variant="contained" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}
