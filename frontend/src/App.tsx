import AppToolBar from './UI/AppBar/AppToolBar';
import {Container, Typography} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import Posts from './features/posts/Posts';
import NewPost from './features/posts/NewPost';
import OnePost from './features/posts/OnePost';

const App = () => {
  return (
    <>
      <header>
        <AppToolBar/>
      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/" element={<Posts/>}/>
          <Route path="/posts/new" element={<NewPost/>}/>
          <Route path="/posts/:id" element={<OnePost/>}/>
          <Route path="*" element={<Typography variant="h1">Page Doesn't Exist</Typography>}/>
        </Routes>
      </Container>
    </>
  );
};

export default App;
