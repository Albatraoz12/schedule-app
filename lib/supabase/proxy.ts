import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );

          response = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  const role = user?.user_role as string | undefined;

  const pathname = request.nextUrl.pathname;
  const isDashboard = pathname.startsWith("/dashboard");

  // Om inloggad -> signin
  if (user && !isDashboard) {
    const allowed = `/dashboard/${role}`;
    if (!pathname.startsWith(allowed)) {
      return NextResponse.redirect(new URL(allowed, request.url));
    }
  }

  if (!user && isDashboard) {
    // Ej inloggad → dashboard
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Inloggad men saknar roll
  if (user && !role && isDashboard) {
    return NextResponse.redirect(new URL("/error", request.url));
  }

  // Fel dashboard
  if (user && role && isDashboard) {
    const allowed = `/dashboard/${role}`;
    if (!pathname.startsWith(allowed)) {
      return NextResponse.redirect(new URL(allowed, request.url));
    }
  }

  return response;
}
