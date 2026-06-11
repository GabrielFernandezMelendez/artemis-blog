import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'
import type { Post } from '@/core/api'
import { render } from '@/test/render-astro-component'
import PostCard from './postCard.astro'

const mockPost: Post = {
  id: '1',
  publishedAt: '2026-04-10',
  title: 'Splashdown! Artemis II Crew Returns Safely to Earth',
  slug: 'artemis-ii-splashdown-crew-returns-earth',
  excerpt:
    'After nearly 10 days and 694,481 miles around the Moon and back, the Orion spacecraft splashed down safely.',
  coverImage: {
    src: 'http://localhost:3000/images/test.jpg',
    alt: 'Orion spacecraft during recovery',
  },
  author: 'NASA Recovery Team',
  tags: 'artemis II, splashdown',
  content: '<p>Test content</p>',
  readingTime: 4,
}

describe('PostCard', () => {
  it('should expose an accessible aria-label on the article link', async () => {
    const ariaLabel = `go to "${mockPost.title}" article`

    const container = await render(PostCard, {
      props: { post: mockPost },
    })

    const articleLink = getByRole(container, 'link', { name: ariaLabel })

    expect(articleLink).toBeInTheDocument()
  })
})
