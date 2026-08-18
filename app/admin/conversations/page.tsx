import Link from "next/link";
import { listConversations, type ConversationSummary } from "@/lib/db";
import { logServerError } from "@/lib/logger";

export const dynamic = "force-dynamic";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/London" }).format(new Date(value));
}

export default async function ConversationsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  let conversations: ConversationSummary[] = [];
  let unavailable = false;
  try {
    conversations = await listConversations(q);
  } catch (error) {
    unavailable = true;
    logServerError("admin_conversation_list_failed", error);
  }

  return (
    <main className="admin-page">
      <header className="admin-header"><div><p>Private</p><h1>Conversations</h1></div><Link href="/">View site</Link></header>
      <form className="admin-search"><label htmlFor="q">Search transcripts</label><div><input id="q" name="q" defaultValue={q} placeholder="Search questions and answers" /><button type="submit">Search</button></div></form>
      {unavailable ? <p className="admin-empty">The conversation database is unavailable.</p> : conversations.length ? (
        <ol className="conversation-list">
          {conversations.map((conversation) => <li key={conversation.id}><Link href={`/admin/conversations/${conversation.id}`}><div><strong>{conversation.preview || "Empty conversation"}</strong><span>{formatDate(conversation.updatedAt)}</span></div><span>{conversation.messageCount} messages</span></Link></li>)}
        </ol>
      ) : <p className="admin-empty">No conversations found.</p>}
    </main>
  );
}
