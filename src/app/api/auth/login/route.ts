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

    // Optionally, send a token
    const user = userCredential.user;
    const token = await user.getIdToken();

    const response: LoginResponse = {
      message: "Login successful",
      token,
      user: {
        uid: user.uid,
        email: user.email,
      },
    };

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error: any) {
    const errorResponse: ErrorResponse = { error: error.message };
    return new Response(JSON.stringify(errorResponse), { status: 400 });
  }
}
