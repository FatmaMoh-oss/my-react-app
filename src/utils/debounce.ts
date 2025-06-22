export interface DebouncedFunction<T extends (...args: unknown[]) => void> {
  (...args: Parameters<T>): void;
  cancel: () => void;
}

export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): DebouncedFunction<T> {
  let timeout: NodeJS.Timeout;

  const debouncedFunction = function executedFunction(
    ...args: Parameters<T>
  ): void {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  } as DebouncedFunction<T>;

  debouncedFunction.cancel = function cancel() {
    clearTimeout(timeout);
  };

  return debouncedFunction;
}
