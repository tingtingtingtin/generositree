import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { treeCount, user } = await request.json();

  if (!treeCount || !user) {
    return NextResponse.json(
      { error: " Missing required fields: treeCount or user" },
      { status: 400 }
    );
  }

  const DIGITAL_HUMANI_API_URL = "https://api.sandbox.digitalhumani.com/tree";
  const ENTERPRISE_ID = process.env.NEXT_DIGITALHUMANI_ENTERPRISE_ID!;
  const PROJECT_ID = process.env.NEXT_DIGITALHUMANI_PROJECT_ID!;
  const API_KEY = process.env.NEXT_DIGITALHUMANI_API_KEY!;

  try {
    const response = await fetch(DIGITAL_HUMANI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": API_KEY,
      },
      body: JSON.stringify({
        treeCount: parseInt(treeCount, 10),
        enterpriseId: ENTERPRISE_ID,
        projectId: PROJECT_ID,
        user,
      }),
    });

    if (response.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Error planting tree:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
