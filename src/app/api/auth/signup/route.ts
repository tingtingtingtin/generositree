import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/utils/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import type { SignupResponse, ErrorResponse } from "@/app/types";

export async function POST(request: Request): Promise<Response> {
  try {
    const { name, email, password } = await request.json();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    console.log("Created user:", userCredential.user.uid);
    await setDoc(doc(collection(db, "users"), user.uid), {
      name: name,
      email: email,
      treeIds: [],
    });
    console.log("User data saved to Firestore");

    // Return user info or token
    const response: SignupResponse = {
      message: "User created successfully",
      user: user,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (error: any) {
    const errorResponse: ErrorResponse = { error: error.message };
    return new Response(JSON.stringify(errorResponse), { status: 400 });
  }
}
