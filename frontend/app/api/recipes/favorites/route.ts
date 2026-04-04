import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')?.value

  if (!token) {
    return Response.json({ detail: 'unauthorized' }, { status: 401 })
  }

  try {
    const r = await fetch(
      `${process.env.RECIPE_SERVICE_URL || 'http://localhost:5000'}/recipes/favorites`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const data = await r.json()
    return Response.json(data, { status: r.status })
  } catch {
    return Response.json({ detail: 'recipe service unreachable' }, { status: 503 })
  }
}

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')?.value

  if (!token) {
    return Response.json({ detail: 'unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const r = await fetch(
      `${process.env.RECIPE_SERVICE_URL || 'http://localhost:5000'}/recipes/favorites`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    )
    const data = await r.json()
    return Response.json(data, { status: r.status })
  } catch {
    return Response.json({ detail: 'favorite creation failed' }, { status: 500 })
  }
}