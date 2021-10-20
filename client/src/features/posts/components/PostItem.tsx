import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Delete, Edit } from '@material-ui/icons'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import postApi from 'api/postApi'
import { DataResponse, Post } from 'models'
import moment from 'moment'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export interface PostItemProps {
  post: Post
  onEdit: (post: Post) => void
  onRemove: (id: string) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    title: {
      cursor: 'pointer',
    },
  })
)

export default function PostItem({ post, onEdit, onRemove }: PostItemProps) {
  const classes = useStyles()

  const [openPost, setOpenPost] = useState(false)

  const [likeCount, setLikeCount] = useState(post.like)

  const [openConfirmRemove, setConfirmRemove] = useState(false)

  const handleCloseConfirmRemove = () => {
    setConfirmRemove(false)
    setAnchorEl(null)
  }

  const handleOpenConfirmRemove = () => {
    setConfirmRemove(true)
  }

  const handleOpenPost = () => {
    setOpenPost(true)
  }

  const handleClosePost = () => {
    setOpenPost(false)
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleEditPost = () => {
    setAnchorEl(null)
    onEdit?.(post)
  }

  const handleRemovePost = () => {
    setAnchorEl(null)
    setConfirmRemove(false)
    onRemove?.(post._id)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleLikeClick = async () => {
    try {
      const response: DataResponse<Post> = await postApi.update({ ...post, like: post.like + 1 })
      if (response.success) {
        setLikeCount(likeCount + 1)
      } else {
        toast.error(response.content.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src={post.author.imageUrl} />
        }
        action={
          <>
            <IconButton aria-label="settings" onClick={handleOpenMenu}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={openMenu}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleEditPost}>
                <Edit color="primary" />
              </MenuItem>
              <MenuItem onClick={handleOpenConfirmRemove}>
                <Delete color="secondary" />
              </MenuItem>
            </Menu>
          </>
        }
        title={post.author.fullName}
        subheader={moment(post.createdAt).format('HH:MM MMM DD, YYYY')}
      />
      <CardMedia className={classes.media} image={post.imageUrl} title="Paella dish" />
      <CardContent>
        <Typography
          className={classes.title}
          variant="body2"
          color="textSecondary"
          component="p"
          onClick={handleOpenPost}
        >
          {post.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
          <FavoriteIcon color="secondary" />
        </IconButton>
        &nbsp; {likeCount}
      </CardActions>
      {/* Dialog post content */}
      <Dialog
        open={openPost}
        onClose={handleClosePost}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{post.title}</DialogTitle>
        <DialogContent>
          <CardContent>
            <Typography paragraph>{post.content}</Typography>
          </CardContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePost} color="secondary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog confirm remove post */}
      <Dialog
        open={openConfirmRemove}
        onClose={handleCloseConfirmRemove}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove post</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure remove post title: "{post?.title}". <br />
            This action can&apos;t undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmRemove} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleRemovePost} color="secondary" variant="contained" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}
