import { Item } from "@/models/Item";
import { NextResponse } from "next/server";
import { connectDB } from "@/libs/db";


export async function GET() {
    try {
        await connectDB();
        const items = await Item.find();
        if (!items) return;
        console.log("items fetched: ", items);
        return NextResponse.json(items);
    } catch(e) {
        console.error("error in fetching items: ", e)
        return NextResponse.json({ "error in fetching items": e });
    }
}
