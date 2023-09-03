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
cd server
npm install
npm start

3. Install client dependencies and start the client:

cd client
npm install
npm start

4. Create a MongoDB database and configure the connection string in server/db/dbConnect.js.

5. Create a .env file in the server directory with your JWT secret:

6. Your application should now be running. Access it at http://localhost:3000.

Usage
Register or log in to access the task management dashboard.
Create new tasks by providing a title and description.
Edit or delete tasks as needed.
Mark tasks as "doing" and "done" to track your progress.
API Endpoints
Here are the main API endpoints used in the application:

POST /api/auth/register: Register a new user.
POST /api/auth/login: Log in an existing user.
GET /api/tasks: Get all tasks for the authenticated user.
POST /api/tasks: Create a new task.
GET /api/tasks/:id: Get details of a specific task.
PUT /api/tasks/:id: Update a specific task.
DELETE /api/tasks/:id: Delete a specific task.
For detailed documentation, refer to the API documentation.

Authentication
Authentication in this application is handled using JSON Web Tokens (JWT). When a user registers or logs in, they receive a JWT token that is used to authenticate subsequent requests to protected routes. 

Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

Fork the repository.
Create a new branch for your feature: git checkout -b feature-name.
Commit your changes: git commit -m 'Add feature-name'.
Push to your branch: git push origin feature-name.
Submit a pull request with a description of your changes.
