import {Button, CircularProgress, Grid, Paper, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {selectPosts, selectPostsIsFetching} from './postsSlice';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useEffect} from 'react';
import {fetchPosts} from './postsThunks';
import {API_URL} from '../../config';
import notFoundImg from '../../assets/images/imgNotFound.jpg';

const Posts = () => {
  const posts = useAppSelector(selectPosts);
  const postsIsFetching = useAppSelector(selectPostsIsFetching);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Posts</Typography>
        </Grid>
        <Grid item>
          <Button color="primary" component={Link} to="/posts/new">Add new post</Button>
        </Grid>
        <Grid item container direction="column" spacing={1} sx={{paddingTop: 1}}>
          {postsIsFetching && (<CircularProgress/>)}
          {posts.map((post) => {
            let image = notFoundImg;

            if (post.image) {
              image = API_URL + '/' + post.image;
            }
            return (
              <Grid item xs key={post.id}>
                <Paper sx={{p: 2}}>
                  <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                    <Grid item container spacing={1} alignItems="center" sx={{flexGrow: 1, flexBasis: 'content'}}>
                      <Grid item>
                        <img src={image} style={{width: 150}}/>
                      </Grid>
                      <Grid item>
                        <Typography variant="h5">{post.title}</Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Button component={Link} to={`/posts/${post.id}`}>View full post</Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Posts;