/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [image, setImage] = React.useState<string>();
  const [text, setText] = React.useState<string>("");

  async function generateImage(prompt: string) {
    setImage(undefined);
    setIsLoading(true);
    try {
      const response = await fetch("/api/stable-diffusion", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const result = await response.json();
      setIsLoading(false);
      setImage(result.data);
    } catch (error) {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    generateImage(text);
  }

  return (
    <main>
      <section>
        <div className="image">
          {image ? (
            <img src={image} alt={text} />
          ) : isLoading ? (
            <p>Generating...</p>
          ) : (
            <h1>Stable Diffusion 🤯</h1>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            value={text}
            name="prompt"
            rows={5}
            style={{ minWidth: 240 }}
            placeholder="Enter a prompt to generate an image"
          />
          <div>
            <button type="submit">Generate</button>
          </div>
        </form>
      </section>
    </main>
  );
}
