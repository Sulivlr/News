import express from 'express';
import {imagesUpload} from '../multer';
import {Post, PostMutation} from '../types';
import {ResultSetHeader} from 'mysql2/promise';
import mysqlDb from '../mysqlDb';

const postsRouter = express.Router();

postsRouter.get('/', async (req, res, next) => {
  try {
    const connection = mysqlDb.getConnection();
    const result = await connection.query('SELECT id, title, image, created_at FROM posts');
    const posts = result[0] as Post[];

    res.send(posts);
  } catch (error) {
    next(error);
  }
});

postsRouter.get('/:id', async (req, res, next) => {
  try {
    const connection = mysqlDb.getConnection();
    const id = req.params.id;
    const result = await connection.query(
      'SELECT * FROM posts WHERE id = ?',
      [id],
    );
    const posts = result[0] as Post[];

    if (posts.length === 0) {
      res.status(404).send('No post found');
    }

    res.send(posts[0]);
  } catch (error) {
    next(error);
  }
});

postsRouter.delete('/:id', async (req, res, next) => {
  try {
    const connection = mysqlDb.getConnection();
    const id = req.params.id;
    const result = await connection.query('SELECT * FROM posts WHERE id = ?', [id]);
    const posts = result[0] as Post[];
    if (posts.length === 0) {
      res.status(404).send({error: `No post`});
    }
    const deletedResult = await connection.query('DELETE FROM posts WHERE id = ?', [id]);
    res.send(deletedResult[0]);

  } catch (error) {
    next(error);
  }
});


postsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.text) {
      res.status(400).send({error: 'Title or text are required!'});
    }

    const postMutation: PostMutation = {
      title: req.body.title,
      text: req.body.text,
      image: req.file ? req.file.filename : null,
    };

    const connection = mysqlDb.getConnection();
    const insertResult = await connection.query(
      'INSERT INTO posts (title, text, image) VALUES (?, ?, ?)',
      [postMutation.title, postMutation.text, postMutation.image],
    );

    const resultHeader = insertResult[0] as ResultSetHeader;

    const getNewResult = await mysqlDb.getConnection().query(
      'SELECT * FROM posts WHERE id = ?',
      [resultHeader.insertId]
    );

    const posts = getNewResult[0] as Post[];

    res.send(posts[0]);

  } catch (error) {
    next(error);
  }
});

export default postsRouter;