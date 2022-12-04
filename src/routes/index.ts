import express from 'express';
import notionRouter from './notion';
import usersRouter from './user';

const router = express.Router();

router.use('/user', usersRouter);
router.use('/notion', notionRouter);

export default router;