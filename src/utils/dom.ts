export const applyTextAlign = (value: string) => {
  document.documentElement.style.setProperty('--text-align', value)
  document.body.style.textAlign = value
  document.getElementById('__next')?.setAttribute('data-align', value)

  document.querySelectorAll('h1,h2,h3,h4,h5,h6,span,p,div').forEach((el) => {
    if (el instanceof HTMLElement) {
      el.setAttribute('data-align', value)
      el.style.textAlign = value
    }
  })
}

export const applyScaling = (key: string, value: number) => {
  const cssVariableMap: Record<string, string> = {
    fontScale: '--font-scale',
    lineHeightScale: '--line-height-scale',
    letterSpacingScale: '--letter-spacing-scale',
  }

  document.documentElement.style.setProperty(
    cssVariableMap[key],
    value.toString(),
  )
}
