export function debounce(func: any, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    const callback = () => {
      func(...args);
    };
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
}
