import { Grid } from '@material-ui/core'
import { Post } from 'models'
import React from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import PostItem from './PostItem'

export interface PostListProps {
  initialValue: Post[]
  onRemove: (id: string) => void
}

export default function PostList({ initialValue, onRemove }: PostListProps) {
  const match = useRouteMatch()
  const history = useHistory()

  const handleEditClick = (post: Post) => {
    history.push(`${match.url}/${post._id}`)
  }

  const handleRemoveClick = (id: string) => {
    onRemove?.(id)
  }

  return (
    <Grid container spacing={2}>
      {Array.isArray(initialValue) &&
        initialValue.length > 0 &&
        initialValue.map((post, idx) => (
          <Grid key={idx} item xs={12} md={6} lg={3}>
            <PostItem post={post} onEdit={handleEditClick} onRemove={handleRemoveClick} />
          </Grid>
        ))}
    </Grid>
  )
}
