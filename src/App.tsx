import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setMessages((prev) => [...prev, input]);
    setInput("");
  };

  useEffect(() => {
    // Scroll al último mensaje
    if (sectionRef.current) {
      sectionRef.current.scrollTop = sectionRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Chat Application</h1>
        <p>Welcome to the chat application!</p>
      </header>
      <main className="chat-container">
        <section ref={sectionRef}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className="chat-message"
              style={{
                background: idx % 2 === 0 ? "#1e3c72" : "#2a5298",
                color: "aliceblue",
                padding: "10px",
                borderRadius: "6px",
                marginBottom: "8px",
                maxWidth: "90%",
                alignSelf: "flex-start",
              }}
            >
              {msg}
            </div>
          ))}
        </section>
        <footer>
          <form className="chat-form" onSubmit={handleSubmit} style={{ width: "100%" }}>
            <input
              type="text"
              placeholder="Type your message here..."
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ width: "80%" }}
            />
            <button type="submit" className="chat-submit" style={{ width: "20%" }}>
              Send
            </button>
          </form>
        </footer>
      </main>
      <footer className="app-footer">
        <p>2025 Aplicacion de Chat. Todos los derechos reservados.</p>
        <p>Desarrollado por <strong>Jemerson Rodriguez</strong></p>
        <p>
          Contact: <a href="mailto:">jemerson0095@gmail.com</a>
        </p>
      </footer>
    </div>
  );
}

export default App;