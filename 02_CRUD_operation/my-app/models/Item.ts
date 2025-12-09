import mongoose from "mongoose";
import { Schema, Document, Model } from "mongoose";

interface Item extends Document {
    name: string;
    price: number;
}

const ItemSchema = new Schema<Item>({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

// Error: OverwriteModelError: Cannot overwrite Item model once compiled.
// REASON: Ye error iska matlab hai ke dev server (hot-reload / turbopack) ne model file ko multiple baar load kar diya aur mongoose same model ko dobara register karne laga — isliye OverwriteModelError
// FIX: model ko guard karo (agar already compiled ho to reuse karo) OPTIONAL: aur DB connection ko global cache karo.


// guard against model overwrite in dev
export const Item: Model<Item> = (mongoose.models.Item as Model<Item>) || mongoose.model<Item>("Item", ItemSchema);