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

export async function PUT(req: Request, ctx: { params: { name: string } | Promise<{ name: string }> }) {
    try {
        await connectDB();
        const params = await ctx.params;
        const body = await req.json();
        const { itemNewPrice } = body;
        // Mongoose by default returns the document before update. Use the option to return the updated doc (and enable validators).
        const item = await Item.findOneAndUpdate(
            { name: params.name }, 
            { price: itemNewPrice }, 
             { new: true, runValidators: true } // <-- return updated doc & validate
        );
        if (!item) throw new Error("item not found");
        console.log("item updated: ", item);
        return NextResponse.json(item);
    } catch (e) {
        console.error("error in updatting item: ", e);
        return NextResponse.json({ "error in updatting item": e });
    }
}