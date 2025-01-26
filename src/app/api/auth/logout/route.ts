import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import type { ErrorResponse } from "@/app/types";

export async function POST() {
  try {
    await signOut(auth);
    return new Response(JSON.stringify({ message: "Logout successful" }), {
      status: 200,
    });
  } catch (error: any) {
    const errorResponse: ErrorResponse = { error: error.message };
    return new Response(JSON.stringify({ errorResponse }), { status: 400 });
  }
}
