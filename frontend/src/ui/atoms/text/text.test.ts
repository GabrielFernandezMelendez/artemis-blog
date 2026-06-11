import { describe, expect, it, test } from 'vitest'
import { render } from '@/test/render-astro-component'
import Text from './text.astro'

describe('Text', () => {
  test.each([
    ['display', 'text-display'],
    ['heading-1', 'text-heading-1'],
    ['heading-2', 'text-heading-2'],
    ['heading-3', 'text-heading-3'],
    ['body-large', 'text-body-large'],
    ['body', 'text-body'],
    ['caption', 'text-caption'],
    ['label', 'text-label'],
  ] as const)(
    'applies the variant "%s class"',
    async (variant, expectedClass) => {
      const container = await render(Text, {
        props: { variant },
        slots: { default: 'Content' },
      })

      const element = container.querySelector('p')

      expect(element).toHaveClass(expectedClass)
    },
  )

  test.each([
    ['p', 'p'],
    ['span', 'span'],
    ['h1', 'h1'],
    ['h2', 'h2'],
    ['h3', 'h3'],
    ['label', 'label'],
    ['time', 'time'],
    ['a', 'a'],
    ['div', 'div'],
  ] as const)('renders the "%s" tag', async (tag, selector) => {
    const container = await render(Text, {
      props: { tag },
      slots: { default: 'Content' },
    })

    const element = container.querySelector(selector)

    expect(element).toBeInTheDocument()
    expect(element).toHaveTextContent('Content')
  })

  test.each([
    ['display', 'md:text-display'],
    ['heading-1', 'md:text-heading-1'],
    ['heading-2', 'md:text-heading-2'],
    ['heading-3', 'md:text-heading-3'],
    ['body-large', 'md:text-body-large'],
    ['body', 'md:text-body'],
    ['caption', 'md:text-caption'],
    ['label', 'md:text-label'],
  ] as const)(
    'applies the desktop variant "%s class"',
    async (variant, expectedClass) => {
      const container = await render(Text, {
        props: { variant, desktopVariant: variant },
        slots: { default: 'Content' },
      })

      const element = container.querySelector('p')

      expect(element).toHaveClass(expectedClass)
    },
  )

  it('combines the variant class with an additional class', async () => {
    const container = await render(Text, {
      props: {
        variant: 'heading-1',
        class: 'text-center',
      },
      slots: { default: 'Title' },
    })

    const element = container.querySelector('p')

    expect(element).toHaveClass('text-heading-1')
    expect(element).toHaveClass('text-center')
  })
})
