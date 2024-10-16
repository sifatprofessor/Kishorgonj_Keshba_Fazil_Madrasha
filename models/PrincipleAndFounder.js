import mongoose from "mongoose";

const PrincipleAndFounderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const PrincipleAndFounder = mongoose.models.PrincipleAndFounder || mongoose.model("PrincipleAndFounder", PrincipleAndFounderSchema);

export default PrincipleAndFounder;