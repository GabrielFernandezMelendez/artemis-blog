import type { Post } from "./Post";
//Puerto
export interface PostRepository {
  findAll(): Promise<Post[]>;
  findBySlug(slug: string): Promise<Post | null>;
  findByTag(tag: string): Promise<Post[]>;
}
