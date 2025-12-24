import { connectDB } from "@/lib/db";
import { Item } from "@/models/Item";
import { NextResponse } from "next/server";

interface Item {
    name: string;
    price: number;
}

export async function GET() {
    await connectDB();
    const items: Item[] = await Item.find();
    console.log(items)
    return NextResponse.json(items);
}