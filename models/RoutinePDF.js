import mongoose from "mongoose";

const routinePdfSchema = new mongoose.Schema(
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

export const routinePdf = mongoose.models.routinePdf || mongoose.model("routinePdf", routinePdfSchema);
