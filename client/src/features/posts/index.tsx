import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import AddEditPostPage from './pages/AddEditPostPage'
import PostListPage from './pages/PostListPage'

export default function Post() {
  const match = useRouteMatch()

  return (
    <Switch>
      <Route exact path={match.path}>
        <PostListPage />
      </Route>

      <Route path={`${match.path}/add`}>
        <AddEditPostPage />
      </Route>

      <Route path={`${match.path}/:postId`}>
        <AddEditPostPage />
      </Route>
    </Switch>
  )
}
