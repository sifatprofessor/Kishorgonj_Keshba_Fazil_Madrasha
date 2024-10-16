import { noticePdf } from "@/models/NoticePdf";
import connect from "@/utils/db";
import next from "next";
import { NextResponse } from "next/server";

export const GET = async () => {
  console.log("hit");
  await connect();
  const data = await noticePdf.find();
  return new NextResponse(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const POST = async (req) => {
  try {
    const database = await req.json();
    await connect();
    try {
      await noticePdf.create(database);
      return new NextResponse("Task successfully created", { status: 200 });
    } catch (error) {
      return new NextResponse(error, { status: 500 });
    }
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

