import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'
import { render } from '@/test/render-astro-component'
import Header from './header.astro'

describe('Header', () => {
  it('should expose an accessible aria-label on the logo link', async () => {
    const ariaLabel = 'go to home'

    const container = await render(Header)

    const logoLink = getByRole(container, 'link', { name: ariaLabel })

    expect(logoLink).toBeInTheDocument()
  })
})
