# 🔍 Perplexity AI Clone

A full-stack AI-powered search and chat application built with the MERN stack, featuring real-time communication, internet search, and image analysis.

![Tech Stack](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![Tech Stack](https://img.shields.io/badge/Node.js-Express-68A063?style=flat&logo=node.js)
![Tech Stack](https://img.shields.io/badge/MongoDB-Mongoose-00ED64?style=flat&logo=mongodb)
![Tech Stack](https://img.shields.io/badge/Google-Gemini-4285F4?style=flat&logo=google)
![Tech Stack](https://img.shields.io/badge/Mistral-AI-FF7000?style=flat)

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login & register with HTTP-only cookies
- 💬 **Real-time Chat** — Socket.io powered live messaging
- 🌐 **Internet Search** — AI searches the web for up-to-date answers (Tavily)
- 🖼️ **Image Analysis** — Upload images and let Gemini Vision analyze them
- 📝 **Chat History** — All conversations saved and retrievable
- 🌙 **Dark UI** — Premium dark theme with Tailwind CSS
- 📱 **Responsive** — Works on mobile and desktop

---

## 🛠️ Tech Stack

### Frontend
| Tech | Usage |
|------|-------|
| React 19 | UI Framework |
| Redux Toolkit | State Management |
| Tailwind CSS | Styling |
| Socket.io Client | Real-time |
| React Router v7 | Routing |
| Lucide React | Icons |
| React Markdown | Markdown Rendering |

### Backend
| Tech | Usage |
|------|-------|
| Node.js + Express | Server |
| MongoDB + Mongoose | Database |
| Socket.io | Real-time |
| LangChain | AI Orchestration |
| Google Gemini | AI Model (Chat + Vision) |
| Mistral AI | AI Model (Search Agent) |
| Tavily | Internet Search |
| JWT + bcrypt | Authentication |
| Multer | Image Upload |
| Nodemailer | Email Service |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- Google Gemini API Key
- Mistral AI API Key
- Tavily API Key

### 1. Clone the repo
```bash
git clone https://github.com/devkotabipin42/perplexity-app.git
cd perplexity-app
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create `.env` file:
```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
MISTRAL_API_KEY=your_mistral_api_key
TAVILY_API_KEY=your_tavily_api_key
```

```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📁 Project Structure

```
perplexity-app/
├── Backend/
│   └── src/
│       ├── controller/     # Route handlers
│       ├── model/          # MongoDB schemas
│       ├── routes/         # API routes
│       ├── services/       # AI & email services
│       ├── middleware/     # Auth middleware
│       └── sockets/        # Socket.io handlers
│
└── frontend/
    └── src/
        ├── features/
        │   ├── auth/       # Login, Register, useAuth
        │   └── chat/       # Dashboard, useChat, Redux slice
        └── app/            # Store, Routes, App
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/get-me` | Get current user |
| POST | `/api/chat/message` | Send message (supports image) |
| GET | `/api/chat` | Get all chats |
| GET | `/api/chat/:chatId/messages` | Get chat messages |
| DELETE | `/api/chat/delete/:chatId` | Delete chat |

---

## 👨‍💻 Developer

**Bipin Devkota**
- 🎓 IT Engineering Student — Japan
- 💼 Aspiring Full Stack MERN Developer
- 🐙 GitHub: [@devkotabipin42](https://github.com/devkotabipin42)
- 💼 LinkedIn: [Bipin Devkota](https://linkedin.com/in/bipin-devkota-5632a7364)

---

## 📄 License

MIT License — feel free to use this project for learning purposes.
