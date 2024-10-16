import { event } from "@/models/Event";
import connect from "@/utils/db";
import { NextResponse } from "next/server";


export async function GET(){
  await connect();
  const data = await event.find();
  return NextResponse.json(data, {status:200});

}

export const POST = async (req) => {
  try {
    const database = await req.json()
console.log('receive from google', database)
    await connect()
    try {
      await event.create(database)
      return new NextResponse("Event successfully created", {status: 200})
    } catch (error) {
      console.log(error)
      return new NextResponse(error, {status: 500})
      
    }
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal Server Error", {status: 500})
  }

}