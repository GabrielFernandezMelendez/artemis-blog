import type { Post } from "../domain/Post";
import type { PostRepository } from "../domain/PostRepository";
//Adaptador
export class GetPostBySlug {
  private repository: PostRepository;

  constructor(repository: PostRepository) {
    this.repository = repository;
  }

  execute(slug: string): Promise<Post | null> {
    return this.repository.findBySlug(slug);
  }
}
