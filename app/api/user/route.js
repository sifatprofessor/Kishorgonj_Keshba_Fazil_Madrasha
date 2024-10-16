
import { task } from "@/models/Task";
import user from "@/models/User";
import connect from "@/utils/db"; // Import the MongoDB connection utility

import { NextResponse } from "next/server";

// Route to get all tasks
export const GET = async () => {
  await connect();
  const data = await task.find();
  return NextResponse.json(data, {status:200});
}

export const POST = async (req) => {
  try {
    const database = await req.json()
    console.log('receive from google', database)
    await connect()
    try {
      await user.create(database)
      return new NextResponse("Task successfully created", {status: 200})
    } catch (error) {
      console.log(error)
      return new NextResponse(error, {status: 500})
      
    }
    
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal Server Error", {status: 500})
  }
}