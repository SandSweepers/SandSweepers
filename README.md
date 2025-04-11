# Sand Sweepers
"Welcome to Sand Sweepers, where we work together to clean beaches, protect the environment, and make a difference!"

Sand Sweepers is a web application designed to manage beach cleanup activities, track user scores, and promote environmental awareness.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributors](#contributors)
- [License](#license)

---

## Overview

Sand Sweepers is a collaborative platform where users can:
- Register and log in to access personalized features.
- Participate in beach cleanup activities.
- Track their scores and achievements.
- View leaderboards of top participants.

---

## Features

- **Secure Authentication**: Registration, login, and role management (user and admin).
- **User Management**: Create, update, delete, and promote users.
- **Leaderboards**: Display user scores and achievements.
- **WebSocket Integration**: Real-time notifications for activities.
- **Modern UI**: Smooth navigation with React and Vite.

---

## Technologies Used

### Frontend
- **React**: Framework for building the user interface.
- **Vite**: Fast build tool for React development.
- **SCSS**: CSS preprocessor for modular and maintainable styles.

### Backend
- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Framework for building REST APIs.
- **Sequelize**: ORM for interacting with the MySQL database.
- **JWT**: Token-based authentication.
- **WebSocket**: Real-time communication.

### Database
- **MySQL**: Relational database for storing users, activities, and achievements.

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MySQL
- npm or yarn

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/SandSweepers/Sand-Sweepers.git
   Install dependencies for both frontend and backend:

Install dependencies for both frontend and backend:

2.Install dependencies for both frontend and backend:
    cd SandSweepers
  npm install
  cd ../Sand-Sweepers-Backend
  npm install
3.Configure environment variables:

  Copy the .ENV.EXAMPLE file to .env in the Sand-Sweepers-Backend folder.
  Fill in the required values<vscode_annotation details='%5B%7B%22title%22%3A%22hardcoded-credentials%22%2C%22description%22%3A%22Embedding%20credentials%20in%20source%20code%20risks%20unauthorized%20access%22%7D%5D'> (</vscode_annotation>e.g., JWT_SECRET, DB_HOST, DB_USER, etc.).
4.Initialize the database:
  npm run db:reset
5.Start the backend server:
  cd ../SandSweepers
  npm run dev
6.Start the frontend development server:
  cd ../SandSweepers
  npm run dev

Usage
  1.Access the application via http://localhost:5173.
  2.Register or log in to access features.
  3.Explore beach cards, participate in activities, and track your scores.

Project Structure
  SandSweepers/
├── src/
│   ├── Components/
│   ├── PageComponents/
│   ├── utils/
│   ├── public/
│   └── styles/
├── vite.config.js

Sand-Sweepers-Backend/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── seeders/
├── [server.js](http://_vscodecontentref_/0)
└── package.json

Contributors
  Max Madeleine
  Madiou
  Alice
  Yamiley

License
This project is licensed under the ISC License. See the LICENSE file for details.
