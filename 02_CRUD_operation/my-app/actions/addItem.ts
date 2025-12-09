"use server";
import { connectDB } from "@/libs/db";
import { Item } from "@/models/Item";

export async function addItem(formData: FormData) {
  try {
    await connectDB();

    const name = formData.get("name")?.toString() || "";
    const price = Number(formData.get("price")?.toString() || 0);

    if (!name) throw new Error("name is required");

    const item = new Item({ name, price });
    await item.save();

    console.log({ ok: true, item: { name, price } })
    // optionally: return something or use revalidatePath / redirect
    // return { ok: true, item: { name, price } };
  } catch (e) {
    console.error({ ok: false, error: e });
  }
}