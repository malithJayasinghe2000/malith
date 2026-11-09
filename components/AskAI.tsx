"use client";

import React, { useEffect, useRef, useState } from "react";

type Source = { label: string; link?: string };
type Message = { role: "user" | "assistant"; content: string; sources?: Source[]; error?: boolean; retry?: string };

const SUGGESTIONS = [
  "What has he built with AI agents?",
  "What does he do at One Billion Tech?",
  "Which cloud and backend tools does he use?",
  "Tell me about TheLawyr",
  "Tell me about JobCeylon"
];

const STEPS = ["Understanding the question", "Searching Malith's profile", "Writing the answer"];

export const OPEN_ASK_AI_EVENT = "open-ask-ai";

function SparkIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z" />
    </svg>
  );
}

function Steps({ active }: { active: number }) {
  return (
    <ol className="space-y-2 py-1" aria-live="polite">
      {STEPS.map((step, i) => {
        const done = i < active;
        const current = i === active;
        return (
          <li key={step} className={`flex items-center gap-2.5 text-xs transition-opacity duration-300 ${i > active ? "opacity-30" : "opacity-100"}`}>
            <span className="flex h-4 w-4 items-center justify-center">
              {done ? (
                <svg className="h-3.5 w-3.5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : current ? (
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-accent/30 border-t-accent motion-reduce:animate-none"></span>
              ) : (
                <span className="h-1.5 w-1.5 bg-subtle"></span>
              )}
            </span>
            <span className={current ? "text-fg" : "text-muted"}>{step}{current && "…"}</span>
          </li>
        );
      })}
    </ol>
  );
}

function AnswerText({ text }: { text: string }) {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const blocks: React.ReactNode[] = [];
  let bullets: string[] = [];
  const flush = () => {
    if (bullets.length) {
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="ml-4 list-disc space-y-1 marker:text-accent">
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>,
      );
      bullets = [];
    }
  };
  for (const line of lines) {
    const m = line.match(/^[-*•]\s+(.*)$/);
    if (m) bullets.push(m[1].replace(/\*\*/g, ""));
    else { flush(); blocks.push(<p key={`p-${blocks.length}`}>{line.replace(/\*\*/g, "")}</p>); }
  }
  flush();
  return <div className="space-y-2">{blocks}</div>;
}

export default function AskAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener(OPEN_ASK_AI_EVENT, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_ASK_AI_EVENT, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, step]);

  // Advance the visible pipeline while the request is in flight; the last step waits for the real response.
  useEffect(() => {
    if (!loading) return;
    setStep(0);
    const t1 = setTimeout(() => setStep(1), 600);
    const t2 = setTimeout(() => setStep(2), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [loading]);

  async function ask(question: string, isRetry = false) {
    const q = question.trim().slice(0, 500);
    if (!q || loading) return;
    // On retry, drop the failed exchange (question + error) so it isn't duplicated.
    const base = isRetry ? messages.slice(0, -2) : messages;
    const history = [...base.filter((m) => !m.error), { role: "user" as const, content: q }];
    setMessages([...base, { role: "user", content: q }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.answer) throw new Error(data.error || "The assistant couldn't answer right now.");
      setMessages((m) => [...m, { role: "assistant", content: data.answer, sources: data.sources }]);
    } catch (err) {
      setMessages((m) => [...m, { role: "assistant", content: (err as Error).message, error: true, retry: q }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="ask-ai-panel"
        className={`cursor-pointer fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-semibold text-ink shadow-lg shadow-accent/20 transition hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${open ? "max-sm:hidden" : ""}`}
      >
        {open ? (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true" cursor="pointer"><path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /></svg>
        ) : <SparkIcon />}
        {open ? "Close" : "Ask my AI"}
      </button>

      {/* Panel */}
      <div
        id="ask-ai-panel"
        role="dialog"
        aria-label="Ask Malith's AI assistant"
        className={`fixed z-50 flex flex-col overflow-hidden border border-line bg-ink shadow-2xl shadow-black/60 transition-all duration-200
          inset-x-0 bottom-0 h-[85dvh] rounded-t-lg
          sm:inset-x-auto sm:bottom-20 sm:right-5 sm:h-[560px] sm:max-h-[calc(100dvh-7rem)] sm:w-[400px] sm:rounded-lg
          ${open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      >
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-fg">
              <span className="relative flex h-2 w-2">
                <span className="status-blink relative inline-flex h-2 w-2 bg-accent"></span>
              </span>
              Malith&apos;s AI assistant
            </p>
            <p className="mt-0.5 text-xs text-subtle">RAG over his CV and projects · Gemini</p>
          </div>
          <button type="button" onClick={() => setOpen(false)} className="rounded p-1 text-subtle hover:text-fg" aria-label="Close assistant">
            <svg className="cursor-pointer h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </header>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5 text-sm leading-relaxed">
          {messages.length === 0 && (
            <div>
              <p className="text-fg">Hi! Ask me anything about Malith&apos;s experience, projects or skills.</p>
              <p className="mt-1 text-muted">Answers come only from his CV and project data.</p>
              <div className="mt-5 flex flex-col items-start gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => ask(s)}
                    className="rounded-md border border-line px-3 py-1.5 text-left text-xs text-muted transition hover:border-accent/50 hover:text-fg"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            m.role === "user" ? (
              <div key={i} className="flex justify-end">
                <p className="max-w-[85%] rounded-md bg-surface px-4 py-2.5 text-fg">{m.content}</p>
              </div>
            ) : (
              <div key={i} className={`max-w-[95%] ${m.error ? "text-muted" : "text-fg/90"}`}>
                {m.error ? (
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <p>⚠ {m.content}</p>
                    {m.retry && i === messages.length - 1 && !loading && (
                      <button type="button" onClick={() => ask(m.retry!, true)} className="rounded-md border border-accent/40 px-3 py-1 font-medium text-accent hover:bg-accent/10">
                        Try again
                      </button>
                    )}
                  </div>
                ) : <AnswerText text={m.content} />}
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] uppercase tracking-wide text-subtle">Sources</span>
                    {m.sources.map((s) => s.link ? (
                      <a key={s.label} href={s.link} target="_blank" rel="noopener noreferrer" className="rounded bg-accent/10 px-2 py-0.5 text-[11px] text-accent hover:bg-accent/20">{s.label} ↗</a>
                    ) : (
                      <span key={s.label} className="rounded bg-surface px-2 py-0.5 text-[11px] text-muted">{s.label}</span>
                    ))}
                  </div>
                )}
              </div>
            )
          ))}

          {loading && <Steps active={step} />}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); ask(input); }}
          className="border-t border-line p-3"
        >
          <div className="flex items-end gap-2 rounded-md border border-line bg-surface px-3 py-2 focus-within:border-accent/60">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(input); } }}
              rows={1}
              maxLength={500}
              placeholder="Ask about his work…"
              aria-label="Your question"
              className="max-h-28 flex-1 resize-none bg-transparent py-1 text-sm text-fg placeholder:text-subtle focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-lg bg-accent p-2 text-ink transition hover:bg-accent/90 disabled:opacity-30"
              aria-label="Send"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </div>
          <p className="mt-2 text-center text-[11px] text-subtle">AI can make mistakes. For anything important, email Malith.</p>
        </form>
      </div>
    </>
  );
}
