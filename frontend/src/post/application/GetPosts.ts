import type { Post } from "../domain/Post";
import type { PostRepository } from "../domain/PostRepository";
//Adaptador
export class GetPosts {
  private repository: PostRepository;

  constructor(repository: PostRepository) {
    this.repository = repository;
  }

  execute(): Promise<Post[]> {
    return this.repository.findAll();
  }
}
