import { getByRole, getByText } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'
import { render } from '@/test/render-astro-component'
import Home from './home.astro'

vi.mock('@/core/api', () => ({
  getAllPosts: vi.fn().mockResolvedValue([
    {
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
    },
  ]),
}))

describe('Home', () => {
  it('should show the main heading', async () => {
    const container = await render(Home)

    const heading = getByRole(container, 'heading', { level: 1 })

    expect(heading).toHaveTextContent('The Artemis Diary')
  })

  it('should list posts', async () => {
    const container = await render(Home)

    const firstPostTitle = getByText(
      container,
      'Splashdown! Artemis II Crew Returns Safely to Earth',
    )

    expect(firstPostTitle).toBeInTheDocument()
  })
})
