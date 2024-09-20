import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import getAdmin from "@/libs/supabase/getAdmin";

export async function middleware(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(session)

  if (!session) {
    return NextResponse.redirect(`${requestUrl.origin}/login`);
  }

  const userId = session.user.id;
  const adminSignedIn = getAdmin(userId);

  if (session && !adminSignedIn) {
    return NextResponse.redirect(`${requestUrl.origin}`);
  }

  return res;
}

// Private routes
export const config = {
  matcher: ["/dashboard/:path*"],
  // matcher: ["/*"],
};
