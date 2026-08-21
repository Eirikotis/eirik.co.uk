"use client";

import { FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { MAX_INPUT_LENGTH } from "@/lib/chat-limits";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  status?: "streaming" | "complete" | "error";
};

type StreamEvent =
  | { type: "conversation"; conversationId: string }
  | { type: "delta"; delta: string }
  | { type: "done" }
  | { type: "error"; message: string };

const SESSION_KEY = "eirik-ai-session";
const CONVERSATION_KEY = "eirik-ai-conversation";
const starters = ["What has he worked on?", "What has he built?"];
const askPrompts: Record<string, string> = {
  bittensor: "Tell me about Eirik's Bittensor work.",
  void: "What was VOID and what did Eirik do?",
  autoresearch: "Tell me about Eirik's Bittensor AutoResearch work.",
  kpmg: "What did Eirik do at KPMG?",
  dusd: "What is dusd.fun and what did Eirik build?",
  "one-click-labs": "What did Eirik do at One Click Labs?",
  experience: "Give me a concise overview of Eirik's professional experience.",
  about: "What is Eirik's professional background?",
};

function createId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

function parseEvents(buffer: string) {
  const blocks = buffer.split("\n\n");
  const remainder = blocks.pop() || "";
  const events = blocks.flatMap((block) => {
    const line = block.split("\n").find((item) => item.startsWith("data: "));
    if (!line) return [];
    try { return [JSON.parse(line.slice(6)) as StreamEvent]; } catch { return []; }
  });
  return { events, remainder };
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^)]+\))/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    if (link) return <a key={index} href={link[2]} target="_blank" rel="noreferrer">{link[1]}</a>;
    return part;
  });
}

function MessageMarkdown({ children }: { children: string }) {
  const blocks: ReactNode[] = [];
  const lines = children.split("\n");
  let index = 0;
  while (index < lines.length) {
    const line = lines[index].trimEnd();
    if (!line.trim()) { index += 1; continue; }
    if (line.startsWith("```")) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) { code.push(lines[index]); index += 1; }
      blocks.push(<pre key={blocks.length}><code>{code.join("\n")}</code></pre>);
      index += 1;
      continue;
    }
    if (/^[-*] /.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*] /.test(lines[index])) { items.push(lines[index].replace(/^[-*] /, "")); index += 1; }
      blocks.push(<ul key={blocks.length}>{items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}</ul>);
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\. /.test(lines[index])) { items.push(lines[index].replace(/^\d+\. /, "")); index += 1; }
      blocks.push(<ol key={blocks.length}>{items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}</ol>);
      continue;
    }
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) { blocks.push(<h3 key={blocks.length}>{renderInline(heading[2])}</h3>); index += 1; continue; }
    const paragraph = [line];
    index += 1;
    while (index < lines.length && lines[index].trim() && !/^(?:[-*] |\d+\. |#{1,3}\s|```)/.test(lines[index])) { paragraph.push(lines[index]); index += 1; }
    blocks.push(<p key={blocks.length}>{renderInline(paragraph.join(" "))}</p>);
  }
  return <>{blocks}</>;
}

export function ChatShell() {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [notice, setNotice] = useState("");
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const stayPinnedRef = useRef(true);

  /* eslint-disable react-hooks/set-state-in-effect -- Browser-only session and history hydration intentionally occurs after mount. */
  useEffect(() => {
    const storedSession = localStorage.getItem(SESSION_KEY) || createId();
    localStorage.setItem(SESSION_KEY, storedSession);
    setSessionId(storedSession);

    const params = new URLSearchParams(window.location.search);
    const ask = params.get("ask");
    if (ask) setDraft(askPrompts[ask] || ask);

    const storedConversation = localStorage.getItem(CONVERSATION_KEY);
    if (!storedConversation) return;
    setConversationId(storedConversation);
    fetch(`/api/conversations/${storedConversation}?session=${encodeURIComponent(storedSession)}`, { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Conversation could not be restored");
        return response.json();
      })
      .then((data: { messages: Array<{ id: string; role: "user" | "assistant"; content: string; status: "complete" | "error" }> }) => {
        setMessages(data.messages.map((message) => ({ ...message })));
      })
      .catch(() => {
        localStorage.removeItem(CONVERSATION_KEY);
        setConversationId(null);
      });
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    const textarea = composerRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 154)}px`;
  }, [draft]);

  useEffect(() => {
    if (stayPinnedRef.current) bottomRef.current?.scrollIntoView({ behavior: isSending ? "smooth" : "auto", block: "end" });
  }, [messages, isSending]);

  const onThreadScroll = useCallback(() => {
    const thread = threadRef.current;
    if (!thread) return;
    stayPinnedRef.current = thread.scrollHeight - thread.scrollTop - thread.clientHeight < 140;
  }, []);

  function handleStreamEvent(item: StreamEvent, assistantId: string) {
    if (item.type === "conversation") {
      setConversationId(item.conversationId);
      localStorage.setItem(CONVERSATION_KEY, item.conversationId);
    } else if (item.type === "delta") {
      setMessages((current) => current.map((message) => message.id === assistantId ? { ...message, content: message.content + item.delta } : message));
    } else if (item.type === "done") {
      setMessages((current) => current.map((message) => message.id === assistantId ? { ...message, status: "complete" } : message));
    } else if (item.type === "error") {
      setNotice(item.message);
      setMessages((current) => current.map((message) => message.id === assistantId ? { ...message, status: "error" } : message));
    }
  }

  const askQuestion = useCallback(async (question: string) => {
    const content = question.trim();
    if (!content || isSending || !sessionId) return;

    const userMessage: ChatMessage = { id: createId(), role: "user", content, status: "complete" };
    const assistantId = createId();
    const assistantMessage: ChatMessage = { id: assistantId, role: "assistant", content: "", status: "streaming" };
    setMessages((current) => [...current, userMessage, assistantMessage]);
    setDraft("");
    setNotice("");
    setIsSending(true);
    stayPinnedRef.current = true;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, sessionId, conversationId }),
      });
      if (!response.ok || !response.body) {
        const error = await response.json().catch(() => ({ error: "The assistant is unavailable." }));
        throw new Error(error.error || "The assistant is unavailable.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
        const parsed = parseEvents(buffer);
        buffer = parsed.remainder;
        parsed.events.forEach((item) => handleStreamEvent(item, assistantId));
        if (done) break;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "The assistant is unavailable.";
      setNotice(message);
      setMessages((current) => current.map((item) => item.id === assistantId ? { ...item, content: item.content || message, status: "error" } : item));
    } finally {
      setIsSending(false);
    }
  }, [conversationId, isSending, sessionId]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void askQuestion(draft);
  }

  function onComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void askQuestion(draft);
    }
  }

  function startNewConversation() {
    localStorage.removeItem(CONVERSATION_KEY);
    setConversationId(null);
    setMessages([]);
    setDraft("");
    setNotice("");
    window.history.replaceState({}, "", "/");
    requestAnimationFrame(() => composerRef.current?.focus());
  }

  const hasConversation = messages.length > 0;

  return (
    <div className={`chat-site${hasConversation ? " has-conversation" : ""}`}>
      <a className="skip-link" href={hasConversation ? "#conversation" : "#question"}>Skip to {hasConversation ? "conversation" : "question"}</a>
      <header className="chat-header">
        <Link className="chat-identity" href="/" aria-label="Eirik Otis, home"><span>EO</span><strong>Eirik Otis</strong></Link>
        {hasConversation && <button className="new-conversation" type="button" onClick={startNewConversation}>New conversation <span aria-hidden="true">＋</span></button>}
      </header>

      {!hasConversation ? (
        <main className="chat-landing">
          <section className="chat-intro" aria-labelledby="chat-title">
            <p className="chat-kicker">Ask about Eirik&apos;s professional background</p>
            <h1 id="chat-title">Hey — what would you like to know about Eirik?</h1>
            <Composer draft={draft} setDraft={setDraft} submit={submit} onKeyDown={onComposerKeyDown} textareaRef={composerRef} disabled={isSending || !sessionId} />
            <div className="chat-starters" aria-label="Example questions">{starters.map((starter) => <button key={starter} type="button" onClick={() => void askQuestion(starter)}>{starter}</button>)}</div>
            <p className="chat-disclosure">AI assistant based on professional background material supplied by Eirik. Conversations may be stored to improve this site.</p>
          </section>
        </main>
      ) : (
        <main id="conversation" className="conversation" ref={threadRef} onScroll={onThreadScroll}>
          <div className="conversation-inner">
            <ol className="message-list">
              {messages.map((message) => (
                <li className={`message ${message.role} ${message.status || ""}`} key={message.id}>
                  <span className="message-role">{message.role === "user" ? "You" : "EO"}</span>
                  <div className="message-body" aria-live={message.status === "streaming" ? "polite" : undefined}>
                    {message.role === "assistant" ? <MessageMarkdown>{message.content}</MessageMarkdown> : <p>{message.content}</p>}
                    {message.status === "streaming" && !message.content && <span className="thinking"><i /><i /><i /><span className="sr-only">Thinking</span></span>}
                    {message.role === "assistant" && message.content && message.status !== "streaming" && <button className="copy-response" type="button" onClick={() => void navigator.clipboard.writeText(message.content)}>Copy</button>}
                  </div>
                </li>
              ))}
            </ol>
            <div ref={bottomRef} />
          </div>
        </main>
      )}

      {hasConversation && (
        <div className="conversation-composer-wrap">
          {notice && <p className="chat-notice" role="status">{notice}</p>}
          <Composer draft={draft} setDraft={setDraft} submit={submit} onKeyDown={onComposerKeyDown} textareaRef={composerRef} disabled={isSending || !sessionId} />
          <p className="chat-disclosure">AI assistant based on Eirik&apos;s professional background. Conversations may be stored to improve this site.</p>
        </div>
      )}

      {!hasConversation && <ContactFooter />}
    </div>
  );
}

function Composer({ draft, setDraft, submit, onKeyDown, textareaRef, disabled }: {
  draft: string;
  setDraft: (value: string) => void;
  submit: (event: FormEvent<HTMLFormElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  disabled: boolean;
}) {
  return (
    <form className="chat-composer" onSubmit={submit}>
      <label className="sr-only" htmlFor="question">Ask something about Eirik</label>
      <textarea id="question" ref={textareaRef} name="question" rows={1} maxLength={MAX_INPUT_LENGTH} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={onKeyDown} placeholder="Ask something…" disabled={disabled} />
      <button type="submit" aria-label="Send question" disabled={disabled || !draft.trim()}><span aria-hidden="true">↑</span></button>
    </form>
  );
}

function ContactFooter() {
  return (
    <footer className="chat-footer"><span>Eirik Otis</span><a href="mailto:eirik.otis@outlook.com">Email</a><a href="https://www.linkedin.com/in/eirik-otis" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/Eirikotis" target="_blank" rel="noreferrer">GitHub</a></footer>
  );
}
