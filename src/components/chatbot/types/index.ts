export enum ChatSender {
  USER,
  BOT,
}

export interface ChatMessage {
  text: string;
  sender: ChatSender;
}
