import { knowledgeBase, type KnowledgeChunk } from "./profile";

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "can", "did", "do", "does", "for", "from", "has", "have",
  "he", "his", "him", "how", "i", "in", "is", "it", "malith", "me", "of", "on", "or", "tell", "that", "the",
  "this", "to", "was", "what", "when", "where", "which", "who", "with", "you", "your", "about", "any", "much",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9#+.\s-]/g, " ")
    .split(/\s+/)
    .map((t) => t.replace(/^[.-]+|[.-]+$/g, ""))
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

const indexed = knowledgeBase.map((chunk) => {
  const terms = tokenize(`${chunk.label} ${chunk.label} ${chunk.text}`);
  const tf = new Map<string, number>();
  for (const t of terms) tf.set(t, (tf.get(t) ?? 0) + 1);
  return { chunk, tf, length: terms.length };
});

const avgLength = indexed.reduce((s, d) => s + d.length, 0) / indexed.length;
const docFreq = new Map<string, number>();
for (const doc of indexed) for (const t of doc.tf.keys()) docFreq.set(t, (docFreq.get(t) ?? 0) + 1);

/** BM25 ranking over the profile knowledge base. Always includes the profile summary for grounding. */
export function retrieve(query: string, k = 4): KnowledgeChunk[] {
  const terms = [...new Set(tokenize(query))];
  const N = indexed.length;
  const scored = indexed.map((doc) => {
    let score = 0;
    for (const t of terms) {
      // allow simple prefix matches ("agents" -> "agent", "aws" -> "aws")
      let f = doc.tf.get(t) ?? 0;
      if (!f) for (const [term, c] of doc.tf) if (term.length > 3 && (term.startsWith(t) || t.startsWith(term))) f += c;
      if (!f) continue;
      const df = docFreq.get(t) ?? 1;
      const idf = Math.log(1 + (N - df + 0.5) / (df + 0.5));
      score += idf * ((f * 2.2) / (f + 1.2 * (0.25 + 0.75 * (doc.length / avgLength))));
    }
    return { chunk: doc.chunk, score };
  });

  const top = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score).slice(0, k).map((s) => s.chunk);
  const summary = knowledgeBase.find((c) => c.id === "summary")!;
  // Broad questions ("who is he?") match nothing specific: fall back to summary + current role + featured work.
  if (top.length === 0) return knowledgeBase.filter((c) => ["summary", "exp-0", "proj-0", "proj-1", "proj-2", "skills"].includes(c.id));
  return top.some((c) => c.id === "summary") ? top : [summary, ...top];
}
