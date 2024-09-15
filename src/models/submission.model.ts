import { TSubmission } from '@/types'
import mongoose, { Model } from 'mongoose'

const schema = new mongoose.Schema<TSubmission>(
  {
    country: { type: String, trim: true, required: true },
    university: { type: String, trim: true, required: true },
    professorName: { type: String, trim: true, required: true },
    designation: { type: String, trim: true, required: true },
    researchInterests: [{ type: String, trim: true, required: true }],
    website: { type: String, trim: true },
    email: { type: String, trim: true, required: true },
    mailingDate: { type: Date, trim: true, required: true },
    emailType: { type: String, enum: ['Shortlisted', 'New', 'Reply', 'Followup'], default: 'Shortlisted' },
    priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Low' },
    result: { type: String, enum: ['Positive', 'Negative', 'Neutral', 'No Response'], default: 'No Response' }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const Submission: Model<TSubmission> = mongoose.models.Submission || mongoose.model('Submission', schema)

export default Submission
