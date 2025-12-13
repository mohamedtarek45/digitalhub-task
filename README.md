📊 DigitalHub Project Dashboard

A modern Project Dashboard Web App built with Next.js 16, featuring real-time updates, role-based access, and a responsive UI for managing projects and tasks efficiently.

🚀 Live Demo

Frontend (Vercel)
https://digitalhub-task.vercel.app/


🧠 Overview

DigitalHub allows teams to manage projects and tasks with instant synchronization across users.
Projects and tasks are stored in Firebase Firestore, while Socket.IO handles real-time updates.

🔐 Authentication & Roles

JWT-based authentication

Roles:

Admin

Project Manager

Developer

Demo Accounts
admin@test.com | test1234
pm@test.com    | test1234
dev@test.com   | test1234

✨ Features

Project dashboard with:

Pagination & sorting

Inline editing

Project details & task management

Real-time updates using WebSockets

Optimistic UI updates

Responsive & accessible UI

Charts for project progress

PWA support (offline caching)

⚠️ Important Note (WebSocket)

The WebSocket server is hosted on a free hosting plan, which may go idle after approximately one hour of inactivity.

Additionally, the WebSocket server URL may change periodically due to the limitations of the free hosting environment.

📹 A recorded demo video showcasing the real-time functionality while the server is active is attached in the assessment email.

🛠 Tech Stack

Frontend

Next.js 16.0.8

TypeScript

Tailwind CSS

Redux Toolkit

React Query

Yup

Chart.js

Socket.IO Client

Backend

Node.js

Express

Socket.IO

Database

Firebase Firestore

⚙️ Environment Variables
NEXT_PUBLIC_SOCKET_URL=
JWT_SECRET=

▶️ Run Locally
npm install
npm run dev

👨‍💻 Author

Mohamed Tarek

GitHub: https://github.com/mohamedtarek45

Portfolio: https://portfolio2-tau-ruby.vercel.app