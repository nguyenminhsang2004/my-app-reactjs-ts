import { Box, Fab, LinearProgress, makeStyles, Tooltip } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import postApi from 'api/postApi'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import React, { useEffect } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { toast } from 'react-toastify'
import PostList from '../components/PostList'
import { postAction, selectPostList, selectPostLoading } from '../postSlice'

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

export default function PostListPage() {
  const match = useRouteMatch()
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const postList = useAppSelector(selectPostList)
  const loading = useAppSelector(selectPostLoading)

  useEffect(() => {
    dispatch(postAction.fetchPostList())
  }, [dispatch])

  const handleRemovePost = async (id: string) => {
    try {
      await postApi.remove(id)
      dispatch(postAction.fetchPostList())
      toast.success('Remove successfully')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <PostList onRemove={handleRemovePost} initialValue={postList} />
      {/* Add new post */}
      <Link style={{ textDecoration: 'none' }} to={`${match.url}/add`}>
        <Tooltip title="Add New Post" aria-label="add">
          <Fab className={classes.fab} color="primary" size="large">
            {' '}
            <Add />
          </Fab>
        </Tooltip>
      </Link>
    </Box>
  )
}
