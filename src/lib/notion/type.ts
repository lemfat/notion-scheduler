// get all

// create
export type CreatePageProps = {
  parentDatabaseId: string;
  title: string;
  pageContents: PageContent[]
}

export type PageContent = {
  heading: string;
  content: string;
}