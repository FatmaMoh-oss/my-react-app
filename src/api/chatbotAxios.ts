import axios from "axios";
import { ChatbotRequest, ChatbotResponse } from "../types/chatbot";

export const sendChatbotQuery = async (
  query: string
): Promise<ChatbotResponse> => {
  const queryData: ChatbotRequest = { query };
  const response = await axios.post<ChatbotResponse>("/api/chatbot", queryData);
  return response.data;
};

export default sendChatbotQuery;
