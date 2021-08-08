export async function client<TResult = unknown>(
  endpoint: string
): Promise<TResult> {
  try {
    const res = await fetch(endpoint)
    const result = (await res.json()) as unknown
    if (!res.ok) return Promise.reject(result)
    return result as TResult
  } catch (error) {
    return Promise.reject(error)
  }
}
