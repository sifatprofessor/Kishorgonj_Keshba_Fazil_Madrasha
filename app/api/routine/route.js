import { routinePdf } from "@/models/RoutinePDF";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async () => {
    await connect();
    const data = await routinePdf.find();
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
            await routinePdf.create(database);
            return new NextResponse("Task successfully created", { status: 200 });
        } catch (error) {
            return new NextResponse(error, { status: 500 });
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
