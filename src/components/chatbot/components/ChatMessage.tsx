import React from "react";
import { ChatMessage as ChatMessageType, ChatSender } from "../types";
import { getTextDirection } from "../utils/textDirection";
import Markdown from "react-markdown";

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const textDir = getTextDirection(message.text);

  return (
    <div
      className={`w-full p-1 flex ${
        message.sender === ChatSender.USER ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`rounded-lg p-2 max-w-[85%] md:max-w-[70%] ${
          message.sender === ChatSender.USER
            ? "rounded-br-none bg-gradient-to-r from-[#3C0404] to-[#8B1C20] text-white"
            : "rounded-bl-none bg-[#F0F0F0] text-black"
        }`}
        dir={textDir}
      >
        <Markdown>{message.text}</Markdown>
      </div>
    </div>
  );
};

export default ChatMessage;
