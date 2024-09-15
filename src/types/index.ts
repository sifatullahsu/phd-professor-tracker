import { getPagination } from '@/lib/utils'
import { Date, ObjectId } from 'mongoose'

export type TRole = ''

export type TSubmission = {
  _id: ObjectId | string
  country: string
  university: string
  professorName: string
  designation: string
  researchInterests: string[]
  website: string
  email: string
  mailingDate: Date | string
  emailType: 'Shortlisted' | 'New' | 'Reply' | 'Followup'
  priority: 'High' | 'Medium' | 'Low'
  result: 'Positive' | 'Negative' | 'Neutral' | 'No Response'
  isEmailSent: boolean
  createdAt: Date | string
  updatedAt: Date | string
}

export type TPagination = ReturnType<typeof getPagination>

export type TFilter = {
  page: number
  limit: number
  sort: string
  search: string
}
