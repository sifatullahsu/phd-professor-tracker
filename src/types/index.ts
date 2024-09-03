import { Date, ObjectId } from "mongoose";

export type TRole = "";

export type TSubmission = {
  _id: ObjectId | string;
  name: string;
  university: string;
  createdAt: Date;
  updatedAt: Date;
};
