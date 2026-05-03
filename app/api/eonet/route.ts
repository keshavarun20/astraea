import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const days = searchParams.get("days") || "30";
  const limit = searchParams.get("limit") || "50";

  const url = `https://eonet.gsfc.nasa.gov/api/v3/events?days=${days}&limit=${limit}&status=open`;

  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch EONET data" }, { status: 500 });
  }
}
