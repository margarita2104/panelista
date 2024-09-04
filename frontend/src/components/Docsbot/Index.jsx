import React, { useState } from "react";
import useDocsBot from "../../hook/UseDocsBot.jsx";
import Header from "../Shared/Header.jsx";
import Hero from "../Shared/Hero.jsx";
import "../../App.css";
import ChatbotImg from "../../assets/chatbot-decor.png";

const DocsBotComponent = () => {
  const [question, setQuestion] = useState("");
  const { messages, error, loading, askQuestion } = useDocsBot();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      askQuestion(question);
      setQuestion("");
    }
  };

  const renderMessage = (message) => {
    // Remove the "Sources" section and anything after it
    const trimmedMessage = message.split("Sources")[0].trim();
    // Regular expression to find URLs in the message text
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = trimmedMessage.split(urlRegex);

    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <>
      <Header />
      <Hero />
      <div className="min-h-screen flex flex-col items-center p-6">
        <div className="relative z-10 bg-opacity-90 rounded-3xl shadow-lg p-8 max-w-4xl w-full text-center bg-lighter">
          <h1 className="text-2xl font-bold mb-6">
            Find a speaker or panelist for your event where you want diversity
            on stage.
          </h1>
          <h2 className="text-xl mb-6">
            Tell us what kind of speaker you are looking for.
          </h2>
          <form onSubmit={handleSubmit} className="mb-8">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question..."
              className="w-full p-3 rounded-3xl mb-6 text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
            />
            <button type="submit" className="btn-dark-sm">
              Ask
            </button>
          </form>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="text-left">
            {messages
              .slice()
              .reverse()
              .map((msg, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 bg-white rounded-lg shadow"
                >
                  <p>{renderMessage(msg.message)}</p>
                </div>
              ))}
          </div>
        </div>
        <div>
          <img className="max-w-4xl -mt-48" src={ChatbotImg} alt="Chatbot" />
        </div>
      </div>
    </>
  );
};

export default DocsBotComponent;
