export const getQuery = (req: Request) => {
  const url = new URL(req.url)
  return Object.fromEntries(url.searchParams.entries())
}

export const getPagination = ({ page, limit, count }: { page: number; limit: number; count: number }) => {
  return {
    current: page,
    total: Math.ceil(count / limit),
    next: page < Math.ceil(count / limit) ? page + 1 : null,
    prev: page > 1 ? page - 1 : null,
    records: count
  }
}

export const qString = (obj: Record<string, unknown>, remove: string[] = []): string => {
  const keyValuePairs: string[] = []

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== '' && !remove.includes(key)) {
      keyValuePairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(obj[key]))}`)
    }
  }

  return keyValuePairs.join('&')
}
