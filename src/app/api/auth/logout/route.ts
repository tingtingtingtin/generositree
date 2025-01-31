import { serialize } from "cookie";
import { auth } from "@/utils/firebase";
import type { ErrorResponse } from "@/app/types";

export async function POST() {
  try {
    await auth.signOut();

    const cookie = serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: -1,
      path: "/",
    });

    return new Response(JSON.stringify({ message: "Logout successful" }), {
      status: 200,
      headers: { "Set-Cookie": cookie },
    });
  } catch (error: any) {
    const errorResponse: ErrorResponse = { error: error.message };
    return new Response(JSON.stringify({ errorResponse }), { status: 400 });
  }
}
