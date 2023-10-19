export default async function fetcher (url: string): Promise<string | null> {
  const res = await fetch(url)
  if (!res.ok) {
    return null
  }
  return await res.text()
}
