import connect from "@/utils/db";
import { NextResponse } from "next/server";
import PrincipleAndFounder from "@/models/PrincipleAndFounder";


export const PATCH = async (request, { params }) => {
  const { id } = params;
  await connect();

  try {
    // Parse the JSON body from the request
    const updatedData = await request.json();

    // Find the document by id and update it with the new data
    const updatedEvent = await PrincipleAndFounder.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedEvent) {
      return new NextResponse("Item Not Found", { status: 404 });
    }

    return NextResponse.json("Item Updated", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};