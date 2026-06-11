type Post = {
  id: string
  publishedAt: string
  title: string
  slug: string
  excerpt: string
  coverImage: {
    src: string
    alt: string
  }
  author: string
  tags: string
  content: string
  readingTime: number
}

export const getAllPosts = async (): Promise<Post[]> => {
  const response = await fetch('http://localhost:3000/api/v1/posts')
  const data = (await response.json()) as Post[]
  return data
}
