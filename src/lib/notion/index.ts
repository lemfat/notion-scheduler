import { Client } from "@notionhq/client";
import dotenv from 'dotenv';
import { CreatePageProps } from "./type";

dotenv.config()

const NOTION_ACCESS_TOKEN = process.env.NOTION_ACCESS_TOKEN

const notion = new Client({
  auth: NOTION_ACCESS_TOKEN,
})

export const createPage = async ({
  parentDatabaseId,
  title,
  pageContents
}:
  CreatePageProps
) => {
  const children: any[] = []
  pageContents.forEach((pc) => {
    const heading = {
      "object": "block",
      "heading_3": {
        "rich_text": [
          {
            "text": {
              "content": pc.heading,
            }
          }
        ]
      }
    }
    const content = {
      "object": "block",
      "paragraph": {
        "rich_text": [
          {
            "text": {
              "content": pc.content
            }
          }
        ],
        "color": "default"
      }
    }
    const blank = {
      "object": "block",
      "paragraph": {
        "rich_text": [],
        "color": "default"
      }
    }
    children.push(heading, content, blank)
  })

  const response = await notion.pages.create({
    "parent": {
      "type": "database_id",
      "database_id": parentDatabaseId
    },
    "properties": {
      "名前": {
        "title": [
          {
            "text": {
              "content": title
            }
          }
        ]
      },
    },
    children: children
  });
  return response
}

export const deleteBlock = async (blockId: string) => {
  await notion.blocks.delete({
    block_id: blockId,
  });
}

export const deleteBlocks = async (blockIds: string[]) => {
  for (const blockId of blockIds) {
    await deleteBlock(blockId);
  }
}