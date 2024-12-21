import {AppBar, Grid2, styled, Toolbar, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {Article} from '@mui/icons-material';

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    color: '#d3d3d3',
  },
});

const AppToolBar = () => {
  return (
    <AppBar
      color="primary"
      position="sticky"
      sx={{
        mb: 2,
        background: '#2196F3',
        boxShadow: '0 3px 10px rgba(0, 0, 0.2, 0.5)',
      }}
    >
      <Toolbar sx={{justifyContent: 'space-between'}}>
        <Grid2 sx={{display: 'flex', alignItems: 'center'}}>
          <Article fontSize="large" sx={{mr: 1}} />
          <Typography variant="h6" component="div">
            <StyledLink to="/">News</StyledLink>
          </Typography>
        </Grid2>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolBar;
