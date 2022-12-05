import axiosBase from "axios";
import dotenv from 'dotenv';
dotenv.config()

const NOTION_ACCESS_TOKEN = process.env.NOTION_ACCESS_TOKEN
const database_id = process.env.NOTION_DATABASE_ID

const axios = axiosBase.create({
  baseURL: 'https://api.notion.com/v1',
  headers: {
    "Authorization": `Bearer ${NOTION_ACCESS_TOKEN}`,
    "Content-Type": 'text/plain;charset=utf-8',
    "Notion-Version": '2022-06-28',
  },
  responseEncoding: 'utf-8',
})

export async function getPages() {
  const url = `/databases/${database_id}/query`;

  const data = (await (await axios.post(url)).data)

  console.log(data)
  return data
}

export type CreatePageProps = {
  title: string;
  pageContents: PageContent[]
}

export type PageContent = {
  heading: string;
  content: string;
}

export async function createPage({
  title,
  pageContents
}:
  CreatePageProps
) {
  const url = "https://api.notion.com/v1/pages"

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

  const data = {
    "parent": {
      "type": "database_id",
      "database_id": database_id
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
  }

  await axios.post(url, { data: data })
}