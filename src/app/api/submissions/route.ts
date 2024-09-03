import { connectToMongoDB } from '@/lib/db'
import { getPagination } from '@/lib/utils'
import Submission from '@/models/submission.model'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    await connectToMongoDB()
    const body = await req.json()

    const result = await Submission.create(body)

    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('Error in POST /submissions:', error)

    return NextResponse.json({
      success: false,
      error
    })
  }
}

export async function GET(req: Request) {
  try {
    await connectToMongoDB()
    const page = 1
    const limit = 20
    const skip = (page - 1) * limit
    const sort = '-_id'
    const search = ''

    const query: Record<string, unknown> = {}

    if (search) {
      query['$or'] = [
        { name: { $regx: search, options: 'i' } },
        { university: { $regx: search, options: 'i' } }
      ]
    }

    const [result, count] = await Promise.all([
      Submission.find(query, '', { limit, skip, sort }),
      Submission.find(query).countDocuments()
    ])

    return NextResponse.json({
      success: true,
      data: result,
      pagination: getPagination({ page, limit, count })
    })
  } catch (error) {
    console.error('Error in GET /submissions:', error)

    return NextResponse.json({
      success: false,
      error
    })
  }
}
