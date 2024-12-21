import {Button, Grid, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

const Posts = () => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Posts</Typography>
        </Grid>
        <Grid item>
          <Button color="primary" component={Link} to="/posts/new">Add new post</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Posts;