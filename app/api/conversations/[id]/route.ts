import { NextRequest } from "next/server";
import { getConversation } from "@/lib/db";
import { logServerError } from "@/lib/logger";
import { isUuid } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sessionId = request.nextUrl.searchParams.get("session");
  if (!isUuid(id) || !isUuid(sessionId)) return Response.json({ error: "Invalid conversation." }, { status: 400 });

  try {
    const messages = await getConversation(sessionId, id);
    if (!messages.length) return Response.json({ error: "Conversation not found." }, { status: 404 });
    return Response.json({ id, messages }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    logServerError("conversation_load_failed", error, { conversationId: id });
    return Response.json({ error: "The conversation could not be loaded." }, { status: 503 });
  }
}
