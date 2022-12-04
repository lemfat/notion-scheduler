import { Client } from "@notionhq/client";
import dotenv from 'dotenv';
import express from 'express';
import { createPage } from "../../lib/notion";
dotenv.config()
const router = express.Router();

const NOTION_ACCESS_TOKEN = process.env.NOTION_ACCESS_TOKEN
const databaseId = process.env.NOTION_DATABASE_ID

const notion = new Client({
  auth: NOTION_ACCESS_TOKEN,
})

router.get('/', async (req: express.Request, res: express.Response) => {
  const response = await notion.databases.query({
    database_id: databaseId!,
  });

  const pages = response.results

  res.status(200).json(pages);
});

router.get('/create', async (req: express.Request, res: express.Response) => {
  await createPage({
    parentDatabaseId: databaseId!,
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