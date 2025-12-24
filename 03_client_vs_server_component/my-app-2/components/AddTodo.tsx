"use server"

import { Item } from "@/models/Item";
import { connectDB } from "@/lib/db";

export async function addTodo(formData: FormData) {
    try {
        await connectDB();
        await Item.insertOne({
            name: formData.get("name")?.toString() || "",
            price: Number(formData.get("price")?.toString() || 0)
        }); 

        console.log("data inserted!")
    } catch (e) {
        console.error("error in addTodo: ", e);
    }
}