import type { Post } from "./types";

const API_URL = "http://localhost:3000/api/v1";

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${API_URL}/posts`);

  if (!response.ok) {
    throw new Error(`Error fetching posts: ${response.status}`);
  }

  return response.json();
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const response = await fetch(`${API_URL}/posts/${slug}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Error fetching post: ${response.status}`);
  }

  return response.json();
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const response = await fetch(`${API_URL}/posts?tag=${encodeURIComponent(tag)}`);

  if (!response.ok) {
    throw new Error(`Error fetching posts by tag: ${response.status}`);
  }

  return response.json();
}