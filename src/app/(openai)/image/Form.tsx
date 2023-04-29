"use client";

import { type FC, useState } from "react";

import { Button } from "@/components/Button";
import styles from "./form.module.css";
import { Select } from "@/components/Select";
import type { ImageSize } from "@/types/openai";

type Option<T> = {
  value: T;
  text: string;
};

export const Form: FC = () => {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [size, setSize] = useState<ImageSize >("256x256");

  const imgSize = size.split("x").map((s) => parseInt(s, 10))[0];

  const sizeOptions: Option<ImageSize>[] = [
    { value: "256x256", text: "256 x 256" },
    { value: "512x512", text: "512 x 512" },
    { value: "1024x1024", text: "1024 x 1024" },
  ];

  const handleSubmit = async () => {
    const res = await fetch("/api/image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, size }),
    });

    const data: { images: string[] } = await res.json();
    setImages(data.images);
  };

  return (
    <section className={styles.section}>
      <form className={styles.form}>
        <textarea onChange={(e) => setPrompt(e.target.value)} value={prompt} rows={5} className={styles.textarea} />
        <div>
          <Select options={sizeOptions} onChange={(e) => setSize(e.target.value as ImageSize)} />
        </div>
        <div className={styles.buttonWrap}>
          <Button onClick={handleSubmit} disabled={prompt === ""}>
            送信
          </Button>
        </div>
      </form>
      <div className={styles.messages}>
        {images.map((image) => (
          <img src={image} width={imgSize} height={imgSize} alt={prompt} key={image} />
        ))}
      </div>
    </section>
  );
};
