# Minimalist Todo App Next.js

<!-- ![Minimalist Todo App Next.js Banner](https://example.com/path/to/banner-image.png) -->

## Overview

Minimalist Todo App is a sleek and user-friendly task management application developed using Next.js 13.4. This project serves as the frontend for managing tasks and seamlessly integrates with the Todo-Rest-API backend, which is developed using Python, Django REST Framework, and MySQL. The application utilizes NextAuth to provide social authentication via Google and implements server-side rendering for enhanced performance. The ultimate goal of this project is to imitate the functionality of "https://www.getminimalist.com/" while providing seamless integration with the backend application developed in Django.

<!-- ![Application Demo](https://example.com/path/to/demo-gif.gif) -->

## Key Features

- **Server-Side Rendering**: Implements server-side rendering (SSR) to optimize performance and enhance user experience.
- **Social Authentication**: Utilizes NextAuth to enable users to authenticate via their Google accounts.
- **Task Management**: Connects to the Todo-Rest-API backend to manage tasks seamlessly.
- **Responsive Design**: Provides a responsive and intuitive user interface for various devices.

## Backend Repository

The backend REST API, Todo-Rest-API, is developed using Python and Django REST Framework and can be found in the following repository: [Todo-Rest-API](https://github.com/matiasvallejosdev/todo-rest-api-django).

## Installation

To run the Minimalist Todo App Next.js locally or in your own server, follow these steps:

1. Clone this repository: `git clone https://github.com/matiasvallejosdev/minimalist-todo-app-nextjs.git`
2. Install the required dependencies: `npm install`
3. Configure the backend API endpoint in `.env.local`:
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
4. Start the development server: `npm run dev`

## Deploying the Application

To deploy the Minimalist Todo App Next.js to a production environment, follow the deployment documentation for Next.js applications. Ensure that you also deploy the Todo-Rest-API backend separately following its deployment guide.

## Usage

1. Access the deployed Minimalist Todo App Next.js in your web browser.
2. Authenticate using your Google account through NextAuth.
3. Start managing your tasks seamlessly using the user-friendly interface.

## Contributing

Contributions to the Minimalist Todo App Next.js are welcome! If you find any bugs or have suggestions for new features, please feel free to open an issue or submit a pull request. For major changes, please open an issue first to discuss the proposed changes.


## Contact

If you have any questions or need further assistance, you can contact the project maintainer:

- Name: Matias Vallejos
- GitHub: [@matiavallejosdev](https://github.com/matiavallejosdev)
- Email: matiasvallejosdev@outlook.com

Feel free to reach out if you have any inquiries or need any additional information about the project.

---

Thank you for using the Minimalist Todo App Next.js to manage your tasks. We hope this application provides a minimalist and efficient solution for your task management needs. Your feedback and contributions are highly appreciated, and we look forward to making this app even better with your support!

