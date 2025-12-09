"use server";
import { connectDB } from "@/libs/db";
import { Item } from "@/models/Item";

export async function deleteItem(formData: FormData) {
  try {
    await connectDB();

    const name = formData.get("name")?.toString() || "";

    if (!name) throw new Error("name is required");

    const item = await Item.findOne({ name });
    
    if (!item) throw new Error("item not found");

    await Item.findOneAndDelete({ name });
    
    console.log({ ok: true, item: item })
    // optionally: return something or use revalidatePath / redirect
    // return { ok: true, item: { name, price } };
  } catch (e) {
    console.error({ ok: false, error: e });
  }
}