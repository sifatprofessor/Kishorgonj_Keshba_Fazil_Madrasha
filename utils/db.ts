import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

// Connection function to MongoDB using Mongoose
const connect = async (): Promise<unknown> => {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kysojnx.mongodb.net/kiskfmDB?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(uri);
        // console.log("Mongo connection successfully established.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return NextResponse.json({ message: "Error connecting to MongoDB", error: (error as Error).message }, { status: 500 });
    }
};

export default connect;
