export interface CoverImage {
  src: string;
  alt: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: number;
  coverImage: CoverImage;
  author: string;
  tags: string;
  content: string;
}
