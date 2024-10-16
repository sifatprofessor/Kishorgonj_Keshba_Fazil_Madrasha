import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
});

export const bannerimage = mongoose.models.bannerimages || mongoose.model("bannerimages", eventSchema);