import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getPosts, getPostBySlug, getPostsByTag } from "../lib/api";
import type { Post } from "../lib/types";
import type { Mock } from "vitest";

const mockPosts: Post[] = [
  {
    id: "1",
    slug: "post-1",
    title: "Post 1",
    excerpt: "Excerpt 1",
    publishedAt: "2026-01-01",
    readingTime: 5,
    coverImage: { src: "/img.jpg", alt: "Image" },
    author: "Author",
    tags: "astro,web",
    content: "Content",
  },
];

const mockResponse = (data: unknown, ok = true, status = 200) => ({
  ok,
  status,
  json: vi.fn().mockResolvedValue(data),
});

describe("api.ts", () => {
  let originalFetch: typeof global.fetch;
  let fetchMock: Mock;

  beforeEach(() => {
    originalFetch = global.fetch;
    fetchMock = vi.fn();
    global.fetch = fetchMock as unknown as typeof global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  describe("getPosts()", () => {
    it("returns an array of posts", async () => {
      fetchMock.mockResolvedValueOnce(mockResponse(mockPosts));

      const posts = await getPosts();

      expect(posts).toEqual(mockPosts);
      expect(fetchMock).toHaveBeenCalledWith(
        "http://localhost:3000/api/v1/posts",
      );
    });

    it("throws an error if the server fails", async () => {
      fetchMock.mockResolvedValueOnce(mockResponse(null, false, 500));

      await expect(getPosts()).rejects.toThrow("Error fetching posts: 500");
    });
  });

  describe("getPostBySlug(slug)", () => {
    it("returns the correct post for a valid slug", async () => {
      fetchMock.mockResolvedValueOnce(mockResponse(mockPosts[0]));

      const post = await getPostBySlug("post-1");

      expect(post).toEqual(mockPosts[0]);
      expect(fetchMock).toHaveBeenCalledWith(
        "http://localhost:3000/api/v1/posts/post-1",
      );
    });

    it("returns null for a nonexistent slug", async () => {
      fetchMock.mockResolvedValueOnce({ ok: false, status: 404 });

      const result = await getPostBySlug("slug-that-does-not-exist");

      expect(result).toBeNull();
    });
  });

  describe("getPostsByTag(tag)", () => {
    it("returns posts for an existing tag", async () => {
      fetchMock.mockResolvedValueOnce(mockResponse(mockPosts));

      const result = await getPostsByTag("astro");

      expect(result).toEqual(mockPosts);
      expect(fetchMock).toHaveBeenCalledWith(
        "http://localhost:3000/api/v1/posts?tag=astro",
      );
    });

    it("returns an empty array for a nonexistent tag", async () => {
      fetchMock.mockResolvedValueOnce(mockResponse([], true, 200));

      const result = await getPostsByTag("tag-that-does-not-exist");

      expect(result).toEqual([]);
    });
  });

  it("getPostsByTag devuelve posts para un tag existente", async () => {
    fetchMock.mockResolvedValueOnce(mockResponse(mockPosts));
    fetchMock.mockResolvedValueOnce(mockResponse(mockPosts));

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

  it("getPostsByTag devuelve array vacío para un tag inexistente", async () => {
    fetchMock.mockResolvedValueOnce(mockResponse([], true, 200));

    const result = await getPostsByTag("tag-que-no-existe");
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);
  });
});
