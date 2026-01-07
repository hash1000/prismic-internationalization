import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST() {
  // The second argument can be 'default' or a CacheLifeConfig
  revalidateTag("prismic", "default");

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
  });
}
