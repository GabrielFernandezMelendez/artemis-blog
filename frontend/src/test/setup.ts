import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

const originalWarn = console.warn.bind(console)

vi.spyOn(console, 'warn').mockImplementation(
  (message?: unknown, ...optionalParams: unknown[]) => {
    // Deprecated top-level markdown.gfm/smartypants. Harmless in component tests.
    if (
      typeof message === 'string' &&
      message.includes(
        '`markdown.gfm` and `markdown.smartypants` are deprecated',
      )
    ) {
      return
    }

    originalWarn(message, ...optionalParams)
  },
)
