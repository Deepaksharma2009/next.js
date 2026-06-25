"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);

  const askQuestion = async () => {
    if (!question.trim()) return;

    const userMsg = {
      role: "user" as const,
      content: question,
    };

    setMessages((prev) => [...prev, userMsg]);

    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ question }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: data.answer,
      },
    ]);

    setQuestion("");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto p-6">

        <h1 className="text-4xl font-bold text-center mb-8">
          AI Interview Assistant
        </h1>

        <div className="flex gap-2 flex-wrap mb-5">
          <button
            onClick={() =>
              setQuestion("Explain React Hooks with examples")
            }
            className="bg-slate-800 px-4 py-2 rounded"
          >
            React Hooks
          </button>

          <button
            onClick={() =>
              setQuestion("Explain Next.js App Router")
            }
            className="bg-slate-800 px-4 py-2 rounded"
          >
            Next.js
          </button>

          <button
            onClick={() =>
              setQuestion("Top SQL interview questions")
            }
            className="bg-slate-800 px-4 py-2 rounded"
          >
            SQL
          </button>
        </div>

        <div className="h-[500px] overflow-y-auto border border-slate-800 rounded-lg p-4 mb-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-4 ${
                msg.role === "user"
                  ? "text-right"
                  : "text-left"
              }`}
            >
              <div
                className={`inline-block px-4 py-3 rounded-lg max-w-[80%]
                ${
                  msg.role === "user"
                    ? "bg-blue-600"
                    : "bg-slate-800"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="animate-pulse">
              AI is typing...
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask any interview question..."
            className="flex-1 p-3 rounded bg-slate-800 border border-slate-700"
          />

          <button
            onClick={askQuestion}
            className="bg-blue-600 px-5 rounded"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </main>
  );
}