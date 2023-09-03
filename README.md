# Task Management Application

![Screenshot_49](https://github.com/TusharTechs/Task-Management-App/assets/56952465/e1ffa455-d002-4872-a641-77808ff00cf1)

![Screenshot_50](https://github.com/TusharTechs/Task-Management-App/assets/56952465/741afb55-6d43-479a-a83a-17865813b0fb)

![Screenshot_51](https://github.com/TusharTechs/Task-Management-App/assets/56952465/503d553a-5b7c-4980-9b8e-69dab9e64d8b)

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for scheduling and managing tasks. This application allows users to sign up, log in, and create, edit, and delete tasks. It also provides features to mark tasks as "doing" and "done." Authentication is implemented using JSON Web Tokens (JWT) to ensure that users can only access their respective tasks.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and authentication using JWT
- Create, read, update, and delete tasks
- Mark tasks as "doing" and "done"
- User-specific task management
- Clean and intuitive user interface

## Demo

You can check out a live demo of the application [Task Management App](https://task-management-beta-livid.vercel.app/)
Access server at [Task Management Server](https://task-management-server-1jug.onrender.com/)

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:

  `git clone https://github.com/yourusername/your-task-app.git`

  `cd your-task-app`

2. Install server dependencies and start the server:

  `cd server`

  `npm install`

  `npm start`

3. Install client dependencies and start the client:

  `cd client`

  `npm install`

  `npm run dev`

4. Create a MongoDB database and configure the connection string in server/db/dbConnect.js.

5. Create a .env file in the server directory with your MongoDB Database URL as:

  `MONGO_URI = your_db_url`

  `PORT = your_port`

6. Your application should now be running. Access it at `http://localhost:5173`

### Usage

1. Register or log in to access the task management dashboard.

2. Create new tasks by providing a title and description.

3. Edit or delete tasks as needed.
  
4. Mark tasks as "doing" and "done" to track your progress.

### API Endpoints

Here are the main API endpoints used in the application:

  `POST /auth/signup:` Register a new user.

  `POST /auth/login:` Log in an existing user.

  `GET /todo/todos:` Get all todos for the authenticated user.

  `POST /todo/todos:` Create a new todo.

  `PATCH /todo/todos/:todoId:` Update a specific todo.

  `DELETE /todo/todos/:todoId:` Delete a specific todo.

### Authentication
Authentication in this application is handled using JSON Web Tokens (JWT). When a user registers or logs in, they receive a JWT token that is used to authenticate subsequent requests to protected routes.

## Contributing

Contributions to this project are welcomed and encouraged. If you encounter any bugs, have suggestions for improvements, or want to add new features, please submit issues or pull requests through GitHub.

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for choosing **Task Management App** for your task management needs. If you have any questions or need further assistance, please don't hesitate to contact us at tusharaggarwal274@gmail.com. We hope you find our application both helpful and user-friendly!
