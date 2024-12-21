import express from 'express';
import cors from 'cors';
import mysqlDb from './mysqlDb';
import postsRouter from './routers/postsRouter';
import commentsRouter from './routers/commentsRouter';


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

const run = async () => {
  await mysqlDb.init();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

void run();