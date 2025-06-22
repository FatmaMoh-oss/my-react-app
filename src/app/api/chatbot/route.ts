import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { ChatbotRequest, ChatbotResponse } from "@/types/chatbot";

export async function GET(): Promise<NextResponse> {
  const response = NextResponse.json(null, { status: 200 });

  response.cookies.set({
    name: "CHATBOT_TOKEN",
    value: process.env.CHATBOT_TOKEN || "",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return response;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ChatbotResponse> | Response> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("CHATBOT_TOKEN");

    if (!token || !token.value) {
      console.error("Missing CHATBOT_TOKEN cookie");
      return new Response(null, { status: 401 });
    }

    const body: ChatbotRequest = await request.json();

    const containerUrl =
      process.env.CHATBOT_API || "http://chatbot:8000/ai/api/chat";

    const response = await axios.post(containerUrl, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "chatbot container error:",
        error.response?.status,
        error.response?.data
      );
      return new Response(null, { status: 500 });
    }

    console.error("Error communicating with chatbot container:", error);
    return new Response(null, { status: 500 });
  }
}
