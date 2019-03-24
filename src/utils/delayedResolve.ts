
export default function delayedResolve<T>(data: T, timeout: number): Promise<T> {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, timeout)
  });
}

