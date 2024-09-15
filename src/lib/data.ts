import { TSubmission } from '@/types'

export const professorDesignations: { value: string; label: string }[] = [
  { value: 'Assistant Professor', label: 'Assistant Professor' },
  { value: 'Associate Professor', label: 'Associate Professor' },
  { value: 'Professor', label: 'Professor' },
  { value: 'Distinguished Professor', label: 'Distinguished Professor' },
  { value: 'Emeritus Professor', label: 'Emeritus Professor' },
  { value: 'Visiting Professor', label: 'Visiting Professor' },
  { value: 'Adjunct Professor', label: 'Adjunct Professor' },
  { value: 'Research Professor', label: 'Research Professor' },
  { value: 'Clinical Professor', label: 'Clinical Professor' },
  { value: 'Lecturer', label: 'Lecturer' },
  { value: 'Senior Lecturer', label: 'Senior Lecturer' }
]

export const emailTypes: { value: TSubmission['emailType']; label: TSubmission['emailType'] }[] = [
  { value: 'Shortlisted', label: 'Shortlisted' },
  { value: 'Followup', label: 'Followup' },
  { value: 'Reply', label: 'Reply' },
  { value: 'New', label: 'New' }
]

export const priority: { value: TSubmission['priority']; label: TSubmission['priority'] }[] = [
  { value: 'High', label: 'High' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Low', label: 'Low' }
]

export const results: { value: TSubmission['result']; label: TSubmission['result'] }[] = [
  { value: 'Positive', label: 'Positive' },
  { value: 'Negative', label: 'Negative' },
  { value: 'Neutral', label: 'Neutral' },
  { value: 'No Response', label: 'No Response' }
]

export const countries: { value: string; label: string }[] = [
  { value: 'United States', label: 'USA' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Australia', label: 'Australia' }
]

export const researchInterests = [
  { value: 'HCI', label: 'HCI' },
  { value: 'NLP', label: 'NLP' },
  { value: 'ML', label: 'ML' },
  { value: 'Visualization', label: 'Visualization' },
  { value: 'Data Science', label: 'Data Science' }
]
