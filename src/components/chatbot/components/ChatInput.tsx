import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { isArabic } from "../utils/textDirection";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  placeholder: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  placeholder,
}) => {
  const [inputText, setInputText] = useState("");
  const [inputDir, setInputDir] = useState<"ltr" | "rtl">("ltr");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputText(value);

    if (value.length === 1) {
      setInputDir(isArabic(value) ? "rtl" : "ltr");
    } else if (value.length === 0) {
      setInputDir("ltr");
    }
  };

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputText.trim() && !isLoading) {
      handleSend();
    }
  };

  return (
    <div className="bg-gray-50 p-3 md:p-3 grid grid-cols-[1fr_auto] gap-2 items-center">
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        dir={inputDir}
        placeholder={placeholder}
        className="bg-gray-100 flex-1 border border-gray-300 rounded-sm py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#8B1C20]"
      />
      <button
        onClick={handleSend}
        disabled={isLoading || !inputText.trim()}
        className="cursor-pointer bg-[#E95A56] hover:bg-[#8B1C20] p-3 h-full rounded-sm transition duration-300 disabled:opacity-50"
      >
        <svg
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.2913 4.99957C15.2913 4.68827 15.1533 4.39947 15.0226 4.18261C14.8815 3.9486 14.6918 3.707 14.4837 3.47143C14.0662 2.99887 13.5215 2.49139 12.9928 2.03233C12.4611 1.57058 11.9312 1.1454 11.5353 0.836422C11.337 0.681674 11.1716 0.555478 11.0555 0.467718C10.9974 0.423827 10.9515 0.389517 10.92 0.366022L10.8837 0.339034L10.8741 0.331906L10.8707 0.32944C10.5928 0.124721 10.2012 0.183797 9.99649 0.461715C9.79178 0.739621 9.85111 1.13085 10.129 1.33558L10.1396 1.34342L10.173 1.36823C10.2025 1.39023 10.2462 1.42293 10.302 1.46511C10.4137 1.54949 10.5738 1.67165 10.7662 1.82179C11.1516 2.1226 11.6633 2.53335 12.1732 2.97614C12.6862 3.42163 13.1832 3.88732 13.5469 4.29905C13.5699 4.32509 13.5922 4.35068 13.6137 4.37581L1.33299 4.37582C0.987815 4.37582 0.707993 4.65564 0.707993 5.00082C0.707993 5.34599 0.987815 5.62582 1.33299 5.62582L13.6116 5.62581C13.5907 5.65015 13.5692 5.67492 13.5469 5.70011C13.1832 6.11184 12.6862 6.57753 12.1732 7.02302C11.6633 7.46582 11.1516 7.87656 10.7662 8.17737C10.5738 8.32751 10.4137 8.44968 10.302 8.53405C10.2462 8.57623 10.2025 8.60893 10.173 8.63093L10.1396 8.65574L10.129 8.66358C9.85111 8.86831 9.79178 9.25954 9.99649 9.53745C10.2012 9.81537 10.5928 9.87444 10.8707 9.66972L10.8741 9.66726L10.8837 9.66013L10.92 9.63314C10.9515 9.60965 10.9974 9.57534 11.0555 9.53144C11.1716 9.44368 11.337 9.31749 11.5353 9.16274C11.9312 8.85376 12.4611 8.42859 12.9928 7.96683C13.5215 7.50778 14.0662 7.00029 14.4837 6.52773C14.6918 6.29217 14.8815 6.05056 15.0226 5.81655C15.1525 5.60099 15.2897 5.31434 15.2913 5.00518"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};

export default ChatInput;
