import mongoose from "mongoose";

const runningNoticeSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
});

export const runningNotice = mongoose.models.runningnotice || mongoose.model("runningnotice", runningNoticeSchema);