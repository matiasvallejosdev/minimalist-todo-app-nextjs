# 📝 Minimalist Todo App

[![GitHub top language](https://img.shields.io/github/languages/top/matiasvallejosdev/minimalist-todo-app-nextjs?color=1081c2)](https://github.com/matiasvallejosdev/minimalist-todo-app-nextjs/search?l=c%23)
![License](https://img.shields.io/github/license/matiasvallejosdev/minimalist-todo-app-nextjs?label=license&logo=github&color=f80&logoColor=fff)
![Forks](https://img.shields.io/github/forks/matiasvallejosdev/minimalist-todo-app-nextjs.svg)
![Stars](https://img.shields.io/github/stars/matiasvallejosdev/minimalist-todo-app-nextjs.svg)
![Watchers](https://img.shields.io/github/watchers/matiasvallejosdev/minimalist-todo-app-nextjs.svg)

Experience Minimalist in action: [View Production](https://minimalist-tasks.vercel.app/)

## 📘 Introduction

Minimalist is a task management app that combines the power of Next.js and a Django-powered backend for a seamless, high-performance experience. With features like social login and server-side rendering, it's designed for efficiency and ease of use.

## ✨ Key Features

- **Server-Side Rendering**: Enhances performance and user experience.
- **Social Authentication**: Easy login with Google via NextAuth.
- **Task Management**: Efficient task handling with Todo-Rest-API.
- **Responsive Design**: A clean and intuitive interface for all devices.

## 🛠 Installation

1. Clone the repository:
   `git clone https://github.com/matiasvallejosdev/minimalist-todo-app-nextjs.git`
2. Install dependencies:
   `npm install`
3. Set up environment variables in `.env.local`:
```
BASE_URL=http://127.0.0.1:8000/api
NEXTAUTH_SECRET=<YOUR SECRET KEY>
NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=<YOUR GOOGLE CLIENT_ID FOR OAUTH2>
GOOGLE_CLIENT_SECRET=<YOUR GOOGLE CLIENT_SECRET FOR OAUTH2>

SESSION_SECRET=<YOUR SECRET KEY>
JWT_SECRET=<YOUR JWT SECRET KEY>
JWT_NAME=session
```
4. Start the server:
`npm run dev`

## 🌐 Deploying

For production deployment, follow Next.js guidelines and ensure the Todo-Rest-API backend is also deployed properly.

## 🔗 Backend Repository

Explore the backend API [Todo-Rest-API](https://github.com/matiasvallejosdev/todo-rest-api-django) developed with Django REST Framework.

## 💡 Usage

1. Visit the deployed app in your browser.
2. Log in with Google via NextAuth.
3. Manage your tasks efficiently.

## 🤝 Contributing

The Minimalist Todo App Next.js is an open-source project, and contributions are welcome. Feel free to fork the repository, make your changes, and submit a pull request.

## 📞 Contact

If you have any questions or need further assistance, you can contact the project maintainer:

- Name: Matias Vallejos
- 🌐 [matiasvallejos.com](https://matiasvallejos.com/)

Feel free to reach out if you have any inquiries or need any additional information about the project.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
