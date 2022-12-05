import express from 'express';
import { createPage, getPages } from "../../lib/notion";
const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  const pages = await getPages()

  res.status(200).json(pages);
});

router.get('/create', async (req: express.Request, res: express.Response) => {
  await createPage({
    title: 'まとめ',
    pageContents: [
      {
        heading: 'Storage',
        content: "hoge"
      }
    ]
  })
  res.status(200).json({ message: "登録しました" });
});

export default router;