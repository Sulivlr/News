import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectOnePost, selectOnePostIsFetching} from './postsSlice';
import {useEffect} from 'react';
import {fetchOnePost} from './postsThunk';
import {useParams} from 'react-router-dom';
import {CircularProgress, Divider, Grid, Paper, Typography} from '@mui/material';
import {API_URL} from '../../config';
import dayjs from 'dayjs';
import {fetchComments} from '../comments/commentsThunks';
import {selectComments} from '../comments/commentsSlice';

const OnePost = () => {
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectOnePost);
  const comments = useAppSelector(selectComments);
  const postIsFetching = useAppSelector(selectOnePostIsFetching);
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchOnePost(parseInt(id)));
      dispatch(fetchComments(parseInt(id)));
    }
  }, [dispatch, id]);

  return (
    <Grid container direction="column" spacing={2}>
      {postIsFetching && <Grid item><CircularProgress/></Grid>}
      {post && (
        <>
          <Grid item>
            <Typography variant="h5">{post.title}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">{dayjs(post.created_at).format('DD.MM.YYYY HH:mm:ss')}</Typography>
          </Grid>
          <Grid item>
            {post.image && (
              <Grid item>
                <img src={API_URL + '/' + post.image} style={{maxHeight: 150}}/>
              </Grid>
            )}
            <Grid item>
              <Typography variant="body1">
                {post.text}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Divider/>
          </Grid>
          <Grid item>
            <Typography variant="h4">Comments</Typography>
          </Grid>
          <Grid item container direction="column" spacing={1}>
            {comments.map(comment => (
              <Grid item key={comment.id}>
                <Paper sx={{p: 1}}>
                  <strong>
                    {comment.author || 'Anonymous'} wrote: </strong> {comment.text}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      )}

    </Grid>
  );
};

export default OnePost;