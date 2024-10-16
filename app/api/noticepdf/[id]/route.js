import connect from "@/utils/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { noticePdf } from "@/models/NoticePdf";


export const DELETE = async(request, {params}) => {
  const {id} = params
  await connect()
  try {
    const deleteEvent = await noticePdf.findByIdAndDelete(id)
    return NextResponse.json("Item Deleted", {status: 200})
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}