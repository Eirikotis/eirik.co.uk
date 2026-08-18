import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminConversation } from "@/lib/db";
import { logServerError } from "@/lib/logger";
import { isUuid } from "@/lib/validation";

export const dynamic = "force-dynamic";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "medium", timeZone: "Europe/London" }).format(new Date(value));
}

export default async function ConversationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isUuid(id)) notFound();
  let conversation;
  try {
    conversation = await getAdminConversation(id);
  } catch (error) {
    logServerError("admin_conversation_load_failed", error, { conversationId: id });
    return <main className="admin-page"><Link className="admin-back" href="/admin/conversations">← Conversations</Link><p className="admin-empty">The conversation database is unavailable.</p></main>;
  }
  if (!conversation) notFound();

  return (
    <main className="admin-page">
      <Link className="admin-back" href="/admin/conversations">← Conversations</Link>
      <header className="admin-detail-header"><div><p>Started</p><h1>{formatDate(conversation.createdAt)}</h1></div><span>{conversation.messages.length} messages</span></header>
      <ol className="admin-transcript">
        {conversation.messages.map((message) => <li key={message.id} className={message.role}><div><strong>{message.role === "user" ? "Visitor" : "Assistant"}</strong><time>{formatDate(message.createdAt)}</time>{message.status === "error" && <span>Error</span>}</div><p>{message.content}</p></li>)}
      </ol>
    </main>
  );
}
