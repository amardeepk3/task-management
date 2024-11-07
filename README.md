# Task Management App

This is a task manangement application for demo purpose, using Node.js, Angular.js that allows the user to register, login and manage and create various tasks. The project includes user registration, login functionality, and a task manager.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Code Explanation](#code-explanation)


## Features

- User Registeration with fields: username, email, and password..
- Seamless login page experience.
- Use JWT for user authentication. Generate a token on successful login.
- Protect all task-related routes so that only authenticated users can access them.
- Manage and create User Based Tasks
    ▪ Create: Add a new task. 
    ▪ Read: Retrieve all tasks associated with the logged-in user. 
    ▪ Update: Modify a task’s title, description, or status. 
    ▪ Delete: Remove a task.
- Responsive design for seamless user experience.


## Flow Instruction
### User Registration:
Access the registration page and provide valid registration details. Ensure that the submit button is disabled until all fields are correctly filled. Verify that the system prevents duplicate usernames and requires a password of at least 8 characters.

### User Login:
Access the login page and enter valid login credentials. Verify successful login and redirection to the dashboard.

### TODO List:
On the dashboard home page, add, update, delete and filter by status of tasks.

## Installation

### Prerequisites

    Nodejs: v20.16.0
    AngularJS: 18.2.6
    React: 18.3.1
    MongoDB: 8.5.2
    cors: 2.8.5

### Backend Setup

   ```bash
    mkdir -p backend
    cd backend
    npm init -y
    ```

### Frontend Setup

    ```bash
    ng new frontend
    cd frontend
    ng serve
    ```



### USAGE

Visit http://localhost:4200/login to login into the application.
Visit http://localhost:4200/register to register into the application.
Visit http://localhost:4200/tasks to access the task dashboard and create user tasks.

## Code Explanation

### Backend
    Backend: The directory which contains the neccessary API implementation
    Fronend: Frontent directory which will use to display pages as a frontend.
    JWT: for user authentication


### To run locally

    Make sure node & npm or yarn is installed on your system
    > git clone https://github.com/amardeepk3/task-management.git
    > cd task-management
    > yarn install || npm install
    > yarn run || npm run