# ToDoApp

This repository contains a two-part project for creating and managing personal tasks. It includes:

- **ToDoApp.Frontend** (Vite + React + Tailwind CSS)
- **ToDoApp.Backend** (ASP.NET Core 9 + EF Core + JWT Authentication)

## Features

1. **User Authentication**

   - Register and login flows
   - Password security with ASP.NET Identity

2. **Task Management**

   - Create, read, update, and delete tasks
   - Optional due date and priority settings

3. **Protected Routes**

   - Frontend uses React Router’s `<ProtectedRoute>` to safeguard pages
   - Backend enforces JWT-based authorization

4. **User Profile**
   - Allows updating username and other personal details

## Prerequisites

- Node.js 22 or later
- .NET 9 SDK or later
- NPM and .NET CLI

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/DanielvG-IT/ToDoApp.git
   cd ToDoApp
   ```
2. **Set up the Backend**
   - Navigate to the `ToDoApp.Backend` directory
   - Restore dependencies:
     ```bash
     dotnet restore
     ```
   - Update the connection string in `appsettings.json` to point to your database
   - Run migrations:
     ```bash
     dotnet ef database update
     ```
   - Start the backend server:
     ```bash
     dotnet run
     ```
3. **Set up the Frontend**
   - Navigate to the `ToDoApp.Frontend` directory
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend server:
     ```bash
     npm run dev
     ```
4. **Access the Application**
   - Open your browser and go to `http://localhost:3000` for the frontend
   - The backend API will be available at `http://localhost:5000`

## Contributing

We welcome contributions! To get started:

1. **Fork** this repository.
2. **Create** a new branch for your feature or bugfix.
3. **Commit** your changes with clear messages.
4. **Open a pull request** describing your changes and why they should be merged.

Feel free to discuss ideas or issues by opening an issue in the repository.

## License

This project is licensed under the [MIT License](LICENSE).  
 You are free to use, modify, and distribute this code, provided you include the original copyright.
