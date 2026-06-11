import { getByRole, within } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'
import { render } from '@/test/render-astro-component'
import BaseLayout from './baseLayout.astro'

describe('BaseLayout', () => {
  it('should render header, main with default slot content and footer', async () => {
    const pageContent = 'Page content'

    const container = await render(BaseLayout, {
      slots: { default: pageContent },
    })

    const header = getByRole(container, 'banner')
    const footer = getByRole(container, 'contentinfo')
    const main = getByRole(container, 'main')

    expect(header).toBeInTheDocument()
    expect(footer).toBeInTheDocument()
    expect(within(main).getByText(pageContent)).toBeInTheDocument()
  })
})
