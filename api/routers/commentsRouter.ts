import express from 'express';
import {Comment, CommentMutation} from '../types';
import mysqlDb from '../mysqlDb';
import {ResultSetHeader} from 'mysql2/promise';

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
  try {
    const connection = mysqlDb.getConnection();
    const postId = parseInt(req.query.postId as string);
    let query = 'SELECT * FROM comments';
    if (postId) {
      query = 'SELECT * FROM comments WHERE post_id = ?'
    }
    const result = await connection.query(query, [postId]);
    const comments = result[0] as Comment[];

    res.send(comments);
  } catch (error) {
    next(error);
  }
});

commentsRouter.post('/', async (req, res, next) => {
  try {
    if (!req.body.postId || !req.body.text) {
      res.status(400).send({error: 'PostId and text are required!'});
    }

    const commentMutation: CommentMutation = {
      postId: parseInt(req.body.postId),
      author: req.body.author || null,
      text: req.body.text,
    }

    const connection = mysqlDb.getConnection();
    const insertResult = await connection.query(
      'INSERT INTO comments (post_id, author, text) VALUES (?, ?, ?)',
      [commentMutation.postId, commentMutation.author, commentMutation.text],
    );

    const resultHeader = insertResult[0] as ResultSetHeader;

    const getNewResult = await mysqlDb.getConnection().query(
      'SELECT * FROM comments WHERE id = ?',
      [resultHeader.insertId],
    );

    const comments = getNewResult[0] as Comment[];

    res.send(comments[0]);
  } catch (error) {
    next(error);
  }
});

commentsRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const connection = mysqlDb.getConnection();
    const deleteResult = await connection.query('DELETE FROM comments WHERE id = ?', [id]);
    const resultHeader = deleteResult[0] as ResultSetHeader;
    if (resultHeader.affectedRows > 0) {
      res.send('OK!')
    }
    res.status(404).send({error: 'not found'});
  } catch (error) {
    next(error);
  }
});

export default commentsRouter;