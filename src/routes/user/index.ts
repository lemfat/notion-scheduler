import express from 'express';

const router = express.Router();

// GETリクエスト
router.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).json({ userId: "U001", userName: "Yamada Taro" });
});

// POSTリクエスト
router.post('/', (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "登録しました" });
});

export default router;