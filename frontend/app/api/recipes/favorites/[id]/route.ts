import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest, context: any) {
  const access = req.cookies.get('access_token')?.value
  if (!access) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await context.params

  try {
    const response = await fetch(
      `${process.env.RECIPE_SERVICE_URL || 'http://localhost:5000'}/recipes/favorites/${id}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${access}` },
      }
    )
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch {
    return NextResponse.json({ detail: 'delete failed' }, { status: 500 })
  }
}