import { useState} from 'react';
import {Chatbot} from 'supersimpledev';
import './ChatInput.css'
import LoadingSpinner from '../assets/loading-spinner.gif'
import dayjs from 'dayjs'
export function ChatInput({
        chatMessages,
        setChatMessages,
        isLoading,
        setSendingMessages,
      }) {
        const [inputText, setInputText] = useState("");

        function saveInputText(event) {
          setInputText(event.target.value);
        }

        async function sendMessage() {
          const time = dayjs().valueOf();
          if (!isLoading && inputText !== "") {
            const newChatMessages = [
              ...chatMessages,
              {
                message: inputText,
                sender: "user",
                id: crypto.randomUUID(),
                time : time
              },
            ];
            setChatMessages(newChatMessages);
            setChatMessages([
              ...newChatMessages,
              {
                message: (
                  <img
                    className="loading-image"
                    src={LoadingSpinner}
                    alt=""
                  />
                ),
                sender: "robot",
                id: crypto.randomUUID(),
              },
            ]);
            setSendingMessages(true);
            setInputText("");
            const response = await Chatbot.getResponseAsync(inputText);
            setChatMessages([
              ...newChatMessages,
              {
                message: response,
                sender: "robot",
                id: crypto.randomUUID(),
                time : time
              },
            ]);
            setSendingMessages(false);
          }
        }

        async function sendMessageKeyboard(event) {
          const time = dayjs().valueOf();
          if (!isLoading && inputText !== "") {
            if (event.key === "Enter") {
              const newChatMessages = [
                ...chatMessages,
                {
                  message: inputText,
                  sender: "user",
                  id: crypto.randomUUID(),
                  time : time
                },
              ];

              setChatMessages(newChatMessages);
              setChatMessages([
                ...newChatMessages,
                {
                  message: (
                    <img
                      className="loading-image"
                      src={LoadingSpinner}
                      alt=""
                    />
                  ),
                  sender: "robot",
                  id: crypto.randomUUID(),
                },
              ]);
              setSendingMessages(true);
              setInputText("");
              const response = await Chatbot.getResponseAsync(inputText);
              setChatMessages([
                ...newChatMessages,
                {
                  message: response,
                  sender: "robot",
                  id: crypto.randomUUID(),
                  time : time
                },
              ]);
              setSendingMessages(false);
            }
          }
          if (event.key === "Escape") setInputText("");
        }

        function resetMessages() {
          setChatMessages([]);
        }
        return (
          <div className="chat-input-container">
            <input
              className="chat-input"
              placeholder="Send a message to Chatbot"
              size="30"
              onChange={saveInputText}
              value={inputText}
              onKeyDown={sendMessageKeyboard}
            />

            <button className="send-button" onClick={sendMessage}>
              Send
            </button>

            <button onClick={resetMessages} className='clear-button'>Clear</button>
          </div>
        );
      }