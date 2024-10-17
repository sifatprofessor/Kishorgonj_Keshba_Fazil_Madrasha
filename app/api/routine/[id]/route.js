import { routinePdf } from "@/models/RoutinePDF";
import connect from "@/utils/db";
import { NextResponse } from "next/server";


export const GET = async (request, { params }) => {
    const { id } = params;
    const title = id;
    const query = { title: title };
    await connect();
    const data = await routinePdf.find(query);
    return new NextResponse(JSON.stringify(data), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const PATCH = async (request, { params }) => {
    const { id } = params;
    const title = id;
    const query = { title: title };
    await connect();

    try {
        // Parse the JSON body from the request
        const updatedData = await request.json();

        // Find the document by id and update it with the new data
        const updatedEvent = await routinePdf.findOneAndUpdate(query, updatedData, { new: true });

        if (!updatedEvent) {
            return new NextResponse("Item Not Found", { status: 404 });
        }

        return new NextResponse("Item Updated", { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
