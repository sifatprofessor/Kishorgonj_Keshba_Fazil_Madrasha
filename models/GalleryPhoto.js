import mongoose from "mongoose";

const runningNoticeSchema = new mongoose.Schema({
  img: String,
  title: String,
  date: String,
});

export const photo = mongoose.models.photo || mongoose.model("photo", runningNoticeSchema);