import { NextResponse } from "next/server";

export async function POST(request) {
  const { username, password } = await request.json();

  // Replace with your actual admin credentials
  if (username === "sumeetshankar" && password === "Sumeetms@123") {
    return NextResponse.json({ success: true});
  } else {
    return NextResponse.json({ success: false}, { status: 401 });
  }
}