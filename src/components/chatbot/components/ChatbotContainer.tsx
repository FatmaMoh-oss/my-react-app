"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { sendChatbotQuery } from "../../../api/chatbotAxios";
import axios from "axios";

import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import LoadingIndicator from "./LoadingIndicator";

import { ChatMessage as ChatMessageType, ChatSender } from "../types";

interface ChatbotContainerProps {
  onClose: () => void;
}

export default function ChatbotContainer({ onClose }: ChatbotContainerProps) {
  const t = useTranslations();

  const now = new Date();
  const [isLoading, setIsLoading] = useState(false);
  // const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [chats, setChats] = useState<ChatMessageType[]>([
    {
      text: t("chatbot.welcomeMessage"),
      sender: ChatSender.BOT,
    },
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  // const initialWindowHeight = useRef(0);

  useEffect(() => {
    axios.get("/api/chatbot").catch((error) => {
      console.error("Error initializing chatbot session:", error);
    });

    // const isMobileDevice = window.innerWidth < 768;

    // if (isMobileDevice) {
    //   initialWindowHeight.current = window.innerHeight;

    //   const handleResize = () => {
    //     const heightRatio = window.innerHeight / initialWindowHeight.current;
    //     setIsKeyboardOpen(heightRatio < 0.75);
    //   };

    //   window.addEventListener("resize", handleResize);
    //   return () => window.removeEventListener("resize", handleResize);
    // }
  }, []);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  // useEffect(() => {
  //   if (isKeyboardOpen) {
  //     scrollToBottom();
  //   }
  // }, [isKeyboardOpen]);

  const formatDate = (date: Date): string => {
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const timeFormatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${dateFormatter.format(date)} - ${timeFormatter.format(date)}`;
  };

  const handleSendMessage = async (text: string) => {
    const newUserMessage = {
      text,
      sender: ChatSender.USER,
    };

    setChats((prevChats) => [...prevChats, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await sendChatbotQuery(text.trim());

      const botResponse = {
        text: response.answer,
        sender: ChatSender.BOT,
      };

      setChats((prevChats) => [...prevChats, botResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        text: t("chatbot.errorMessage"),
        sender: ChatSender.BOT,
      };

      setChats((prevChats) => [...prevChats, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`fixed top-0 bottom-0 left-0 right-0 md:bottom-5 md:right-5 md:left-auto md:top-auto md:w-90 md:h-130 w-full md:rounded-lg overflow-hidden shadow-lg grid grid-rows-[auto_1fr_auto] bg-white z-100`}
      dir="ltr"
    >
      <ChatHeader title={t("chatbot.title")} onClose={onClose} />

      <div
        className="w-full bg-white overflow-y-auto p-2 md:p-4"
        ref={chatContainerRef}
      >
        <p className="text-sm font-bold text-center text-gray-500 mb-2">
          {formatDate(now)}
        </p>

        {chats.map((chat, index) => (
          <ChatMessage key={index} message={chat} />
        ))}

        {isLoading && <LoadingIndicator />}
      </div>

      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        placeholder={t("chatbot.inputPlaceholder")}
      />
    </div>
  );
}
