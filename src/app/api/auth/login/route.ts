import { serialize } from "cookie";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import type { LoginResponse, ErrorResponse } from "@/app/types";

export async function POST(request: Request): Promise<Response> {
  try {
    const { email, password } = await request.json();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    const token = await user.getIdToken();

    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    const response: LoginResponse = {
      message: "Login successful",
      token,
      user: {
        uid: user.uid,
        email: user.email,
      },
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Set-Cookie": cookie },
    });
  } catch (error: any) {
    const errorResponse: ErrorResponse = { error: error.message };
    return new Response(JSON.stringify(errorResponse), { status: 400 });
  }
}
