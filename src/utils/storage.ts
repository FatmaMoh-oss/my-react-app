export const getStoredValue = <T extends string | number>(
  key: string,
  defaultValue: T,
  parser: (value: string) => T,
): T => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(key)
    return stored ? parser(stored) : defaultValue
  }
  return defaultValue
}

export const getStoredMultiplier = (
  key: 'fontScale' | 'lineHeightScale' | 'letterSpacingScale',
  defaultValue: number,
) => getStoredValue(key, defaultValue, parseFloat)

export const getStoredTextAlign = () =>
  getStoredValue('textAlign', '', (v) => v)
