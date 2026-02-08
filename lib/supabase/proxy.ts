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

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const role = user?.app_metadata?.user_role;

  const pathname = request.nextUrl.pathname;
  const isDashboard = pathname.startsWith("/dashboard");

  if (!user && isDashboard) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (user && !isDashboard) {
    return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
  }

  if (user && role && isDashboard) {
    const allowed = `/dashboard/${role}`;
    if (!pathname.startsWith(allowed)) {
      return NextResponse.redirect(new URL(allowed, request.url));
    }
  }

  return response;
}
