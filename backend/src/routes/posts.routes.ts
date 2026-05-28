import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Router } from "express";

const postsPath = join(dirname(fileURLToPath(import.meta.url)), "posts.json");

interface Post {
  id: string;
  slug: string;
  publishedAt: string;
  [key: string]: unknown;
}

function loadPosts(): Post[] {
  return JSON.parse(readFileSync(postsPath, "utf8"));
}

function findPostByIdOrSlug(posts: Post[], idOrSlug: string): Post | undefined {
  return posts.find((post) => post.id === idOrSlug || post.slug === idOrSlug);
}

export const postsRouter = Router();

postsRouter.get("/", (req, res) => {
  let posts = loadPosts();

  const { tag, author, limit } = req.query;

  if (tag && typeof tag === "string") {
    posts = posts.filter((post) =>
      String(post.tags)
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .includes(tag.toLowerCase()),
    );
  }

  

  if (author && typeof author === "string") {
    posts = posts.filter(
      (post) => String(post.author).toLowerCase() === author.toLowerCase(),
    );
  }

  const parsedLimit = parseInt(String(limit), 10);
  if (!isNaN(parsedLimit) && parsedLimit > 0) {
    posts = posts.slice(0, parsedLimit);
  }

  res.json(posts);
});

postsRouter.get("/:id", (req, res) => {
  const posts = loadPosts();
  const post = findPostByIdOrSlug(posts, req.params.id);

  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }

  res.json(post);
});
