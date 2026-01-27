// proxy.ts
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";
import { createMiddleware } from "@nosecone/next";

const nosecone = createMiddleware();

export async function proxy(request: NextRequest) {
  const noseconeResult = await nosecone();

  if (noseconeResult && noseconeResult instanceof Response) {
    return noseconeResult;
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
