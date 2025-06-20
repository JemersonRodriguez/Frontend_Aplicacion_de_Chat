import React, { useState, useRef, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import "./App.css";

const socket: Socket = io("http://localhost:3000"); // Cambia si tu backend está en otro host/puerto

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado al servidor con ID:", socket.id);
    });

    socket.on("chat_message", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("error_message", (msg: string) => {
      console.error("Error recibido:", msg);
    });

    return () => {
      socket.off("connect");
      socket.off("chat_message");
      socket.off("error_message");
    };
  }, []);

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollTop = sectionRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    socket.emit("chat_message", input);
    setInput("");
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Chat Application</h1>
        <p>Welcome to the chat application!</p>
      </header>

      <main className="chat-container">
        <section ref={sectionRef}>
          {messages.map((msg, idx) => (
            <div key={idx} className="chat-message">
              {msg}
            </div>
          ))}
        </section>

        <footer>
          <form className="chat-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type your message here..."
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="chat-submit">
              Send
            </button>
          </form>
        </footer>
      </main>

      <footer className="app-footer">
        <p>2025 Aplicación de Chat. Todos los derechos reservados.</p>
        <p>Desarrollado por <strong>Jemerson Rodriguez</strong></p>
        <p>
          Contacto: <a href="mailto:jemerson0095@gmail.com">jemerson0095@gmail.com</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
