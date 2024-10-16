import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  NameBangla: String,
  NameEnglish: String,
  Address: String,
  Date: String,
  Time: String,
  Description: String,
  Image: String,
  Link: String,
  Status: String,
  CreatedAt: String,
  UpdatedAt: String,
});

export const event = mongoose.models.events || mongoose.model("events", eventSchema);