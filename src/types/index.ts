import { getPagination } from '@/lib/utils'
import { Date, ObjectId } from 'mongoose'

export type TRole = ''

export type TSubmission = {
  _id: ObjectId | string
  name: string
  university: string
  createdAt: Date
  updatedAt: Date
}

export type TPagination = ReturnType<typeof getPagination>

export type TFilter = {
  page: number
  limit: number
  sort: string
  search: string
}
