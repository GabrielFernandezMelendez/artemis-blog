import { describe, it, expect } from "vitest";
import { getPosts, getPostBySlug, getPostsByTag } from "../lib/api";

describe("api.ts", () => {
  it("getPosts devuelve un arreglo de posts", async () => {
    const posts = await getPosts();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toMatchObject({
      id: expect.any(String),
      slug: expect.any(String),
      title: expect.any(String),
      excerpt: expect.any(String),
      publishedAt: expect.any(String),
      readingTime: expect.any(Number),
      coverImage: expect.objectContaining({
        src: expect.any(String),
        alt: expect.any(String),
      }),
      author: expect.any(String),
      tags: expect.any(String),
      content: expect.any(String),
    });
  });

  it("getPostBySlug devuelve null para un slug inexistente", async () => {
    const result = await getPostBySlug("slug-que-no-existe");
    expect(result).toBeNull();
  });

  it("getPostBySlug devuelve el post correcto para un slug válido", async () => {
    const posts = await getPosts();
    const post = await getPostBySlug(posts[0].slug);
    expect(post).not.toBeNull();
    expect(post?.slug).toBe(posts[0].slug);
  });

  it("getPostsByTag devuelve posts para un tag existente", async () => {
    const posts = await getPosts();
    const tag = posts[0].tags.split(",")[0].trim(); // un tag individual
    const result = await getPostsByTag(tag);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every((post) =>
        post.tags
          .split(",")
          .map((t) => t.trim().toLowerCase())
          .includes(tag.toLowerCase()),
      ),
    ).toBe(true);
  });
});
