import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    AZURE_STORAGE_ACCOUNT_URL_len: process.env.AZURE_STORAGE_ACCOUNT_URL?.length ?? 0,
    AZURE_BLOB_SAS_TOKEN_len: process.env.AZURE_BLOB_SAS_TOKEN?.length ?? 0,
    NEXT_PUBLIC_MAPBOX_TOKEN_len: process.env.NEXT_PUBLIC_MAPBOX_TOKEN?.length ?? 0,
    ts: Date.now(),
  });
}
