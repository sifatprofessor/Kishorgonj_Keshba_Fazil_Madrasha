import connect from "@/utils/db";
import { NextResponse } from "next/server";
import { runningNotice } from "@/models/RunningNotice";


export const DELETE = async(request, {params}) => {
  const {id} = params
  await connect()
  try {
    const deleteEvent = await runningNotice.findByIdAndDelete(id)
    return NextResponse.json("Item Deleted", {status: 200})
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}