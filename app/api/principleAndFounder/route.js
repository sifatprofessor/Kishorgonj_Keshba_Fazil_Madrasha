import PrincipleAndFounder from "@/models/PrincipleAndFounder";
import connect from "@/utils/db";
import { NextResponse } from "next/server";



export const POST = async (req) => {
  try {
    const database = await req.json();
    console.log("receive from google", database);
    await connect();
    try {
      await PrincipleAndFounder.create(database);
      return new NextResponse("Task successfully created", { status: 200 });
    } catch (error) {
      console.log(error);
      return new NextResponse(error, { status: 500 });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};


export const GET = async () => {
  console.log("hit");
  await connect();
  const data = await PrincipleAndFounder.find();
  return new NextResponse(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
