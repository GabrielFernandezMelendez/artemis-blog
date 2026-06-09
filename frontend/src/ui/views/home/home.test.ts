import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'
import { render } from '@/test/render-astro-component'
import Home from './home.astro'

describe('Home', () => {
  it('should show the main heading', async () => {
    const container = await render(Home)

    const heading = getByRole(container, 'heading', { level: 1 })

    expect(heading).toHaveTextContent('Hello Moon!')
  })
})
