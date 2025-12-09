import { connectDB } from "@/libs/db";
import User from "@/models/User";

export async function GET() {
  await connectDB();
  const users = await User.find()
  return Response.json({ users: users });
}

