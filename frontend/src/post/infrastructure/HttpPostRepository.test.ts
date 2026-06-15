import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import type { Mock } from "vitest";
import type { Post } from "../domain/Post";
import { HttpPostRepository } from "./HttpPostRepository";

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

describe("HttpPostRepository", () => {
  let originalFetch: typeof global.fetch;
  let fetchMock: Mock;
  let repository: HttpPostRepository;

  beforeEach(() => {
    originalFetch = global.fetch;
    fetchMock = vi.fn();
    global.fetch = fetchMock as unknown as typeof global.fetch;
    repository = new HttpPostRepository();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  describe("findAll()", () => {
    it("returns an array of posts", async () => {
      fetchMock.mockResolvedValueOnce(mockResponse(mockPosts));

      const posts = await repository.findAll();

      expect(posts).toEqual(mockPosts);
      expect(fetchMock).toHaveBeenCalledWith("http://localhost:3000/api/v1/posts");
    });

    it("throws an error if the server fails", async () => {
      fetchMock.mockResolvedValueOnce(mockResponse(null, false, 500));

      await expect(repository.findAll()).rejects.toThrow("Error fetching posts: 500");
    });
  });

  describe("findBySlug(slug)", () => {
    it("returns the correct post for a valid slug", async () => {
      fetchMock.mockResolvedValueOnce(mockResponse(mockPosts[0]));

      const post = await repository.findBySlug("post-1");

      expect(post).toEqual(mockPosts[0]);
      expect(fetchMock).toHaveBeenCalledWith("http://localhost:3000/api/v1/posts/post-1");
    });

    it("returns null for a nonexistent slug", async () => {
      fetchMock.mockResolvedValueOnce({ ok: false, status: 404 });

      const result = await repository.findBySlug("slug-that-does-not-exist");

      expect(result).toBeNull();
    });
  });

  describe("findByTag(tag)", () => {
    it("returns posts for an existing tag", async () => {
      fetchMock.mockResolvedValueOnce(mockResponse(mockPosts));

      const result = await repository.findByTag("astro");

      expect(result).toEqual(mockPosts);
      expect(fetchMock).toHaveBeenCalledWith("http://localhost:3000/api/v1/posts?tag=astro");
    });

    it("returns an empty array for a nonexistent tag", async () => {
      fetchMock.mockResolvedValueOnce(mockResponse([], true, 200));

      const result = await repository.findByTag("tag-that-does-not-exist");

      expect(result).toEqual([]);
    });
  });
});
