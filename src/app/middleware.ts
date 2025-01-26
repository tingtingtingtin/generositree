import { NextRequest, NextResponse } from "next/server";
import { getAuth, DecodedIdToken } from "firebase-admin/auth";

interface CustomNextRequest extends NextRequest {
  user?: DecodedIdToken;
}

export async function middleware(
  req: CustomNextRequest
): Promise<NextResponse> {
  const token = req.cookies.get("token"); // Assuming you set the token in cookies

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const user = await getAuth().verifyIdToken(token?.value || "");
  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  try {
    // Attach user to request object if needed
    req.user = user;
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/profile"], // Set your protected routes here
};
