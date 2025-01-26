// app/api/auth/signup/route.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import type { SignupResponse, ErrorResponse } from "@/app/types";

export async function POST(request: Request): Promise<Response> {
  try {
    const { email, password } = await request.json();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Return user info or token
    const response: SignupResponse = {
      message: "User created successfully",
      user: userCredential.user,
    };
    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (error: any) {
    const errorResponse: ErrorResponse = { error: error.message };
    return new Response(JSON.stringify(errorResponse), { status: 400 });
  }
}
