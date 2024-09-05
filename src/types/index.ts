import { getPagination } from '@/lib/utils'
import { Date, ObjectId } from 'mongoose'

export type TRole = ''

export type TSubmission = {
  _id: ObjectId | string
  university: string
  professorName: string
  designation: string
  researchInterests: string[]
  website: string
  email: string
  mailingDate: Date
  emailType: 'new' | 'reply' | 'followup'
  priority: 'High' | 'Medium' | 'Low'
  result: 'Positive' | 'Negative' | 'Neutral' | 'No Response'
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