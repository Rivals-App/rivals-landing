import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rateLimit = 10; // requests
const rateLimitWindow = 60 * 1000; // 1 minute

const ipRequestCount = new Map<string, { count: number; timestamp: number }>();

export function middleware(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
  const now = Date.now();
  const requestData = ipRequestCount.get(ip);

  if (!requestData || now - requestData.timestamp >= rateLimitWindow) {
    ipRequestCount.set(ip, { count: 1, timestamp: now });
    return NextResponse.next();
  }

  if (requestData.count >= rateLimit) {
    return new NextResponse("Too many requests", { status: 429 });
  }

  requestData.count++;
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
