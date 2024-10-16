
import { runningNotice } from "@/models/RunningNotice";
import connect from "@/utils/db"
import { NextResponse } from "next/server";

export const GET = async () => {
  await connect();
  const data = await runningNotice.find();
  return NextResponse.json(data, {status:200});
}

export const POST = async (req) => {
  try {
    const database = await req.json()
    await connect()
    try {
      await runningNotice.create(database)
      return new NextResponse("Task successfully created", {status: 200})
    } catch (error) {
      return new NextResponse(error, {status: 500})
      
    }
    
  } catch (error) {
    return new NextResponse("Internal Server Error", {status: 500})
  }
}