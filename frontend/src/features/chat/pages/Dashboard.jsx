import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector, useDispatch } from "react-redux";
import { useChat } from "../hooks/useChat";
import remarkGfm from "remark-gfm";
import {
  Send,
  Plus,
  MessageSquare,
  Sparkles,
  Image as ImageIcon,
  LogOut
} from "lucide-react";
import { setCurrentChatId } from "../chat.slice";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hook/useAuth";
const Dashboard = () => {
const user = useSelector((state) => state.auth.user)
  const chat = useChat();
  const dispatch = useDispatch();
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const bottomRef = useRef(null);

  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const displayMessages = chats[currentChatId]?.messages ?? [];

  useEffect(() => {
    chat.initializeSocketConnection();
    chat.handleGetChats();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayMessages, isTyping]);

  const handleSubmitMessage = async (event) => {
    event.preventDefault();
    const trimmedMessage = chatInput.trim();
    if (!trimmedMessage && !selectedImage) return;
    setChatInput("");
    setSelectedImage(null);
    setImagePreview(null);
    setIsTyping(true);
    await chat.handleSendMessage({
      message: trimmedMessage,
      chatId: currentChatId,
      image: selectedImage,
    });
    setIsTyping(false);
  };

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats);
  };

  const handleNewChat = () => {
    dispatch(setCurrentChatId(null));
  };

  const { handleLogout } = useAuth()
  const navigate = useNavigate()
  const onLogout = async () => {
    await handleLogout()
    navigate('/login')
}

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "#060608", color: "#e8e8f0" }}
    >
      <aside
        className="hidden md:flex flex-col flex-shrink-0"
        style={{
          width: 260,
          background: "#09090e",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="flex items-center gap-3 px-5 py-5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="flex items-center justify-center flex-shrink-0 rounded-xl"
            style={{
              width: 34,
              height: 34,
              background: "linear-gradient(135deg,#7c6af7,#38bdf8)",
              boxShadow: "0 0 22px rgba(124,106,247,0.5)",
            }}
          >
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-base font-semibold tracking-tight">
            Perplexity
          </span>
        </div>

        <div className="px-3 pt-3 pb-2">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{
              background: "rgba(124,106,247,0.1)",
              border: "1px solid rgba(124,106,247,0.22)",
              color: "#c4baff",
            }}
          >
            <Plus size={14} /> New Thread
          </button>
        </div>

        <div
          className="flex-1 overflow-y-auto px-3 py-1 space-y-0.5"
          style={{ scrollbarWidth: "none" }}
        >
          {Object.values(chats).length === 0 && (
            <p
              className="text-center text-xs py-6"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              No chats yet
            </p>
          )}
          {Object.values(chats).map((c, i) => (
            <button
              key={c.id ?? i}
              onClick={() => openChat(c.id)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-left transition-all"
              style={{
                background:
                  currentChatId === c.id
                    ? "rgba(124,106,247,0.12)"
                    : "transparent",
                border:
                  currentChatId === c.id
                    ? "1px solid rgba(124,106,247,0.22)"
                    : "1px solid transparent",
                color:
                  currentChatId === c.id ? "#c4baff" : "rgba(255,255,255,0.35)",
              }}
            >
              <MessageSquare
                size={13}
                style={{ opacity: 0.5, flexShrink: 0 }}
              />
              <span className="truncate">{c.title || "New Chat"}</span>
            </button>
          ))}
        </div>

        <div
          className="px-4 py-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl">
            <div
              className="flex items-center justify-center flex-shrink-0 rounded-full text-xs font-bold text-white"
              style={{
                width: 32,
                height: 32,
                background: "linear-gradient(135deg,#7c6af7,#f472b6)",
                boxShadow: "0 0 14px rgba(124,106,247,0.3)",
              }}
            >
              {user?.username?.slice(0, 2).toUpperCase() || 'BD'}
            </div>
            <div>
              <p
                className="text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {user?.username || 'User'}
              </p>
              <p
                className="text-[10px] flex items-center gap-1"
                style={{ color: "#7c6af7" }}
              >
                <span
                  className="animate-pulse inline-block rounded-full"
                  style={{ width: 5, height: 5, background: "#34d399" }}
                />
                Pro Plan
              </p>
            </div>
            <button onClick={onLogout}
            className="flex items-center justify-center rounded-lg transition-all hover:scale-105"
            style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <LogOut size={13} style={{ color: 'rgba(255,255,255,0.4)' }} />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div
          className="flex items-center px-5 gap-3 flex-shrink-0"
          style={{
            height: 54,
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(6,6,8,0.92)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex items-center gap-2.5 md:hidden">
            <div
              className="flex items-center justify-center rounded-xl"
              style={{
                width: 28,
                height: 28,
                background: "linear-gradient(135deg,#7c6af7,#38bdf8)",
              }}
            >
              <Sparkles size={13} className="text-white" />
            </div>
            <span className="text-sm font-semibold">Perplexity</span>
          </div>
          <div className="flex-1" />
          <button
            onClick={handleNewChat}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium"
            style={{
              background: "rgba(124,106,247,0.1)",
              border: "1px solid rgba(124,106,247,0.22)",
              color: "#c4baff",
            }}
          >
            <Plus size={12} /> New
          </button>
        </div>

        <div
          className="flex-1 overflow-y-auto"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.08) transparent",
          }}
        >
          {displayMessages.length === 0 && !isTyping ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div
                className="flex items-center justify-center rounded-2xl mb-5"
                style={{
                  width: 56,
                  height: 56,
                  background: "linear-gradient(135deg,#7c6af7,#38bdf8)",
                  boxShadow: "0 0 32px rgba(124,106,247,0.4)",
                }}
              >
                <Sparkles size={24} className="text-white" />
              </div>
              <h1
                className="text-3xl font-semibold mb-3 leading-tight tracking-tight"
                style={{
                  background:
                    "linear-gradient(135deg,#ffffff 0%,#a594ff 50%,#38bdf8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                What do you want
                <br />
                to know?
              </h1>
              <p
                className="text-sm"
                style={{ color: "rgba(255,255,255,0.22)" }}
              >
                Ask anything — search the web, analyze code, explore ideas
              </p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto w-full px-5 py-6 space-y-5">
              {displayMessages.map((message, i) => (
                <div
                  key={message._id ?? i}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role !== "user" && (
                    <div
                      className="flex items-center justify-center rounded-lg mr-3 flex-shrink-0 self-start mt-1"
                      style={{
                        width: 28,
                        height: 28,
                        background: "linear-gradient(135deg,#7c6af7,#38bdf8)",
                        boxShadow: "0 0 14px rgba(124,106,247,0.35)",
                      }}
                    >
                      <Sparkles size={13} className="text-white" />
                    </div>
                  )}
                  <div
                    className="max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
                    style={
                      message.role === "user"
                        ? {
                            background: "rgba(124,106,247,0.15)",
                            border: "1px solid rgba(124,106,247,0.25)",
                            borderBottomRightRadius: 4,
                            color: "rgba(255,255,255,0.92)",
                            boxShadow: "0 4px 20px rgba(124,106,247,0.1)",
                          }
                        : {
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            borderBottomLeftRadius: 4,
                            color: "rgba(255,255,255,0.72)",
                          }
                    }>
                    {message.image && (
                      <img
                        src={message.image}
                        className="rounded-xl mb-2 max-w-full"
                        style={{ maxHeight: 200, objectFit: "cover" }}
                      />
                    )}
                    {message.role === "user" ? (
                      <p>{message.content}</p>
                    ) : (
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="mb-2 list-disc pl-5">{children}</ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="mb-2 list-decimal pl-5">
                              {children}
                            </ol>
                          ),
                          code: ({ children }) => (
                            <code
                              className="rounded px-1 py-0.5 text-violet-300"
                              style={{
                                background: "rgba(124,106,247,0.15)",
                                fontSize: 12,
                              }}
                            >
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre
                              className="mb-2 overflow-x-auto rounded-xl p-3 text-xs"
                              style={{ background: "rgba(0,0,0,0.4)" }}
                            >
                              {children}
                            </pre>
                          ),
                        }}
                        remarkPlugins={[remarkGfm]}
                      >
                        {message.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div
                    className="flex items-center justify-center rounded-lg mr-3 flex-shrink-0 self-start mt-1"
                    style={{
                      width: 28,
                      height: 28,
                      background: "linear-gradient(135deg,#7c6af7,#38bdf8)",
                      boxShadow: "0 0 14px rgba(124,106,247,0.35)",
                    }}
                  >
                    <Sparkles size={13} className="text-white" />
                  </div>
                  <div
                    className="flex items-center gap-1.5 px-4 py-3 rounded-2xl"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderBottomLeftRadius: 4,
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.18}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        <div className="px-5 pb-5 pt-3 flex-shrink-0">
          <form onSubmit={handleSubmitMessage}>
            {/* Image preview */}
            {imagePreview && (
              <div className="max-w-3xl mx-auto mb-2 flex items-center gap-2">
                <div className="relative">
                  <img
                    src={imagePreview}
                    className="h-16 w-16 rounded-xl object-cover"
                    style={{ border: "1px solid rgba(124,106,247,0.4)" }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                    style={{ background: "#7c6af7", color: "white" }}
                  >
                    ✕
                  </button>
                </div>
                <span
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Image ready to send
                </span>
              </div>
            )}

            <div
              className="max-w-3xl mx-auto rounded-2xl overflow-hidden transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="flex items-center gap-2 px-4 py-3.5">
                {/* Image upload button */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center flex-shrink-0 rounded-xl transition-all hover:scale-105"
                  style={{
                    width: 32,
                    height: 32,
                    background: "rgba(124,106,247,0.1)",
                    border: "1px solid rgba(124,106,247,0.22)",
                  }}
                >
                  <ImageIcon size={14} style={{ color: "#a594ff" }} />
                </button>

                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask anything or upload an image..."
                  className="flex-1 bg-transparent border-none outline-none text-sm"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                />

                <button
                  type="submit"
                  disabled={(!chatInput.trim() && !selectedImage) || isTyping}
                  className="flex items-center justify-center flex-shrink-0 rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    width: 36,
                    height: 36,
                    background: "linear-gradient(135deg,#7c6af7,#5e4ee0)",
                    border: "none",
                    boxShadow: "0 4px 18px rgba(124,106,247,0.35)",
                  }}
                >
                  <Send size={15} className="text-white" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
