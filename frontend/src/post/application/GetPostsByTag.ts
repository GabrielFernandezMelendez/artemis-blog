import type { Post } from "../domain/Post";
import type { PostRepository } from "../domain/PostRepository";
//Adaptador
export class GetPostsByTag {
  private repository: PostRepository;

  constructor(repository: PostRepository) {
    this.repository = repository;
  }

  execute(tag: string): Promise<Post[]> {
    return this.repository.findByTag(tag);
  }
}
