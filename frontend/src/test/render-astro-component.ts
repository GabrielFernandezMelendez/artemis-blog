import {
  experimental_AstroContainer as AstroContainer,
  type ContainerRenderOptions,
} from 'astro/container'
import { Window } from 'happy-dom'

type AstroComponent = Parameters<AstroContainer['renderToString']>[0]

export async function render(
  Component: AstroComponent,
  options: ContainerRenderOptions = {},
): Promise<HTMLElement> {
  const html = await (
    await AstroContainer.create()
  ).renderToString(Component, options)

  const window = new Window()
  const container = window.document.createElement('div')
  container.innerHTML = html
  window.document.body.append(container)

  return container as unknown as HTMLElement
}
