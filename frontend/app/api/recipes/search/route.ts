export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') || ''

  try {
    const r = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`
    )
    const data = await r.json()
    return Response.json(data)
  } catch {
    return Response.json({ meals: null }, { status: 500 })
  }
}