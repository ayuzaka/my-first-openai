"use client";

import { type FC, useState } from "react";
import { Button } from "@/components/Button";
import styles from "./form.module.css";
import type { ChatMessage } from "@/types/openai";

export const Form: FC = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const updateMessages = (role: ChatMessage['role'], message: string) => {
    setMessages((current) => [...current, { role, content: message }]);
  };

  const handleSubmit = async () => {
    const submitMessage: ChatMessage [] = [...messages, { role: "user", content: currentMessage }];
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitMessage),
    });

    const data: { message: string } = await res.json();
    updateMessages("user", currentMessage);
    updateMessages("assistant", data.message);

    setCurrentMessage("");
  };

  return (
    <section className={styles.section}>
      <form className={styles.form}>
        <textarea
          onChange={(e) => setCurrentMessage(e.target.value)}
          value={currentMessage}
          rows={5}
          className={styles.textarea}
        />
        <div className={styles.buttonWrap}>
          <Button onClick={handleSubmit} disabled={currentMessage === ""}>
            送信
          </Button>
        </div>
      </form>
      <div className={styles.messages}>
        {messages.map((message) => (
          <div key={message.content} className={styles.message}>
            <div className={styles.role}>{message.role === "assistant" ? "GPT" : "You"}</div>
            <div>{message.content}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
