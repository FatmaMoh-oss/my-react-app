"use client";

import { useState } from "react";
import ChatToggleButton from "./components/ChatToggleButton";
import ChatbotContainer from "./components/ChatbotContainer";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleChatbot = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen ? (
        <ChatbotContainer onClose={handleClose} />
      ) : (
        <ChatToggleButton onClick={handleToggleChatbot} />
      )}
    </>
  );
}
