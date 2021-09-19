import { Box, Fab, makeStyles } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import postApi from 'api/postApi';
import { DataResponse, Post } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PostForm from '../components/PostForm';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function AddEditPostPage() {
  const classes = useStyles();
  const history = useHistory();
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post>();
  console.log(post);
  const isEdit = Boolean(postId);

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const response: DataResponse<Post> = await postApi.getPostById(postId);
        if (response.success) {
          setPost(response.content.data);
        } else {
          toast.error(response.content.message);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [postId]);

  const initialValue: Post = {
    title: '',
    content: '',
    author: '',
    like: 0,
    category: '',
    imageUrl: '',
    ...post,
  } as Post;

  const handleSubmitForm = async (formValue: Post) => {
    if (isEdit) {
      await postApi.update(formValue);
    } else {
      await postApi.add(formValue);
    }
    toast.success('Save post successfully.');
    history.push('/home/post');
  };

  return (
    <Box className={classes.root}>
      {(!isEdit || Boolean(post)) && (
        <Box>
          <PostForm isEdit={isEdit} initialValue={initialValue} onSubmit={handleSubmitForm} />
        </Box>
      )}

      <Link style={{ textDecoration: 'none' }} to="/home/post">
        <Fab className={classes.fab} color="primary" size="large" variant="extended">
          {' '}
          <ArrowBack /> Back to post
        </Fab>
      </Link>
    </Box>
  );
}
