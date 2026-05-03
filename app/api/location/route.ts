import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
      { next: { revalidate: 86400 } }
    );

    if (!res.ok) throw new Error("Geocode fetch failed");

    const data = await res.json();

    return NextResponse.json({
      country: data.countryName ?? "Unknown",
      countryCode: data.countryCode ?? "—",
      region: data.principalSubdivision ?? "—",
      city: data.city || data.locality || data.localityInfo?.administrative?.[2]?.name || "—",
      displayName: `${data.locality ?? ""}, ${data.principalSubdivision ?? ""}, ${data.countryName ?? ""}`.trim(),
    });
  } catch (err) {
    return NextResponse.json({ error: "Location lookup failed" }, { status: 500 });
  }
}