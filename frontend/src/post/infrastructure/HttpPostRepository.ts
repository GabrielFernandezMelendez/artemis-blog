import type { Post } from "../domain/Post";
import type { PostRepository } from "../domain/PostRepository";

const API_URL = "http://localhost:3000/api/v1";

export class HttpPostRepository implements PostRepository {
  async findAll(): Promise<Post[]> {
    const response = await fetch(`${API_URL}/posts`);

    if (!response.ok) {
      throw new Error(`Error fetching posts: ${response.status}`);
    }

    return response.json();
  }

  async findBySlug(slug: string): Promise<Post | null> {
    const response = await fetch(`${API_URL}/posts/${slug}`);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Error fetching post: ${response.status}`);
    }

    return response.json();
  }

  async findByTag(tag: string): Promise<Post[]> {
    const response = await fetch(`${API_URL}/posts?tag=${encodeURIComponent(tag)}`);

    if (!response.ok) {
      throw new Error(`Error fetching posts by tag: ${response.status}`);
    }

    return response.json();
  }
}
