import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ status: "ok", timestamp: new Date().toISOString() });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ status: "error", message: "Service Unavailable" }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
