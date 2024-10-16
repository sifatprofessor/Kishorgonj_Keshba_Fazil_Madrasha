import mongoose from "mongoose";

const noticePdfSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    time: {
      type: String,
    },
  }
);

export const noticePdf = mongoose.models.noticePdf || mongoose.model("noticePdf", noticePdfSchema);