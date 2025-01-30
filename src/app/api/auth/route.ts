import admin from "firebase-admin";

if (admin.apps.length === 0) {
  const serviceAccount = JSON.parse(
    process.env.NEXT_FIREBASE_SERVICE_ACCOUNT_JSON || "{}"
  );
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(request: Request): Promise<Response> {
  try {
    const { token } = await request.json();
    const user = await admin.auth().verifyIdToken(token.value);

    const response = {
      message: "User verified",
      user: user,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Error: ", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
