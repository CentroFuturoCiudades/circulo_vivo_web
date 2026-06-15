import { ChatInterface } from "@/components/organisms/ChatInterface";

export default function ChatbotPage() {
  return (
    <main
      className="h-screen w-full overflow-hidden px-9"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.30), rgba(255,255,255,0.30)), url('/bg-images/chat-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ChatInterface />
    </main>
  );
}
