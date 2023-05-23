export default function truncate(text: string): string {
  const n = text.length
  return `${text.substring(0, 2)}*****${text.substring(n - 2, n)}`
}
