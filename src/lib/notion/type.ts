// get all

// create
export type CreatePageProps = {
  title: string;
  pageContents: PageContent[]
}

export type PageContent = {
  heading: string;
  content: string;
}