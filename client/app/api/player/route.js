import connectDB from "@/utils/database";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json(await User.findOne({ _id: "6561ab3091fc267d87234c46" }));
}
