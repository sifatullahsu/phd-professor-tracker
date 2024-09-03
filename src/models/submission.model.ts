import { TSubmission } from "@/types";
import mongoose, { Model } from "mongoose";

const schema = new mongoose.Schema<TSubmission>(
  {
    name: { type: String, trim: true, required: true },
    university: { type: String, trim: true, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Submission: Model<TSubmission> =
  mongoose.models.Submission || mongoose.model("Submission", schema);

export default Submission;
