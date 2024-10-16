import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
  NameBangla: String,
  NameEnglish: String,
  Address: String,
});

export const task = mongoose.models.madrashaDB || mongoose.model("madrashaDB", taskSchema);