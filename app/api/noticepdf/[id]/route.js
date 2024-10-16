import connect from "@/utils/db";
import { NextResponse } from "next/server";
import { noticePdf } from "@/models/NoticePdf";


export const DELETE = async (request, { params }) => {
    const { id } = params
    await connect()
    try {
        await noticePdf.findByIdAndDelete(id)
        return NextResponse.json("Item Deleted", { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const GET = async (request, { params }) => {
    const { id } = params
    await connect()
    try {
        const getEvent = await noticePdf.findById(id)
        return NextResponse.json(getEvent, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
