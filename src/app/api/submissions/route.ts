import { connectToMongoDB } from '@/lib/db'
import { getPagination } from '@/lib/utils'
import Submission from '@/models/submission.model'

export async function POST(req: Request) {
  try {
    await connectToMongoDB()
    const body = await req.json()

    const result = await Submission.create(body)

    return Response.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('Error in POST /submissions:', error)

    return Response.json({
      success: false,
      error
    })
  }
}

export async function GET(req: Request) {
  const searchParams = new URLSearchParams(new URL(req.url).search)

  try {
    await connectToMongoDB()
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit
    const sort = searchParams.get('sort') || '-_id'
    const search = searchParams.get('search')

    const query: Record<string, unknown> = {}

    if (search) {
      query['$or'] = [
        { professorName: new RegExp(search, 'i') },
        { university: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') }
      ]
    }

    const [result, count] = await Promise.all([
      Submission.find(query, '', { limit, skip, sort }),
      Submission.find(query).countDocuments()
    ])

    return Response.json({
      success: true,
      data: result,
      pagination: getPagination({ page, limit, count })
    })
  } catch (error) {
    console.error('Error in GET /submissions:', error)

    return Response.json({
      success: false,
      error
    })
  }
}
