import { useState, useEffect } from "react";
import { ChatInput } from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import { Chatbot } from "supersimpledev";
import "./App.css";

function App() {
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('chatMessages')) || []);
  const [isLoading, setSendingMessages] = useState(false);
  useEffect(() => {
    Chatbot.addResponses(
      {
        "Cat iq are tata ?": "300",
        "Кого я люблю ?" : "Ты любишь только твою единственную Яночку, она твоя любимая ❤"
      }
    );
  }, []);
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
  }, [chatMessages])
  return (
    <div className="app-container">
      {chatMessages.length === 0 && (
        <p className="welcome-text">
          Welcome to the chatbot project ! Send a message using the textbox
          below.
        </p>
      )}
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        isLoading={isLoading}
        setSendingMessages={setSendingMessages}
      />
    </div>
  );
}

export default App;
