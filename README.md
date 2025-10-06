# Secure User Authentication API 🛡️

## Overview
A robust and secure user authentication service built with Node.js, Express, and Mongoose. This API provides essential functionalities for user registration, login, and profile management, ensuring data integrity and secure access through JWT-based authentication.

## Features
-   **Node.js**: Asynchronous event-driven JavaScript runtime for scalable network applications.
-   **Express.js**: Fast, unopinionated, minimalist web framework for building RESTful APIs.
-   **Mongoose**: MongoDB object data modeling (ODM) for Node.js, providing a straightforward, schema-based solution for application data.
-   **JWT (JSON Web Tokens)**: Secure and stateless authentication mechanism for API protection.
-   **Bcrypt**: Hashing library for securely storing user passwords.
-   **Express-Validator**: Middleware for request data validation, enhancing API robustness.

## Getting Started
A step-by-step guide to get the Secure User Authentication API up and running on your local machine.

### Installation
Follow these steps to set up the project locally:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/GAGGAH1/Auth-Project.git
    cd Auth-Project
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```

### Environment Variables
Create a `.env` file in the root directory of the project and add the following required environment variables:

-   `PORT`: The port on which the server will run. (e.g., `3000`)
-   `MONGODB_URI`: The connection string for your MongoDB database. (e.g., `mongodb://localhost:27017/authdb` or a MongoDB Atlas URI)
-   `JWT_SECRET`: A secret key used for signing and verifying JWTs. Generate a strong, random string for production. (e.g., `your_super_secret_jwt_key_here_please_make_it_long_and_random`)

Example `.env` file:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/authdb
JWT_SECRET=thisisasecretkeyforjwtgenerationandverification
```

### Running the Application
Once installed and configured, you can start the development server:
```bash
npm run dev
```
The API will be available at `http://localhost:<PORT>`.

## API Documentation

### Base URL
`http://localhost:<PORT>/api/user` (replace `<PORT>` with your configured port)

### Endpoints

#### `POST /api/user/register`
Registers a new user account with a name, email, and password.

**Request**:
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```
**Required Fields**: `name`, `email`, `password`

**Response**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "60c72b2f9b1e8e001c8e0e0e",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": 0,
    "createdAt": "2023-10-27T10:00:00.000Z",
    "updatedAt": "2023-10-27T10:00:00.000Z",
    "__v": 0
  }
}
```
**Errors**:
-   `400 Bad Request`: Validation errors for input fields.
    ```json
    {
      "success": false,
      "message": "Validation errors",
      "errors": [
        {
          "type": "field",
          "value": "",
          "msg": "Name is required",
          "path": "name",
          "location": "body"
        }
      ]
    }
    ```
-   `409 Conflict`: User with the provided email already exists.
    ```json
    {
      "success": false,
      "message": "User already exists"
    }
    ```
-   `500 Internal Server Error`: Generic server error during registration.

#### `POST /api/user/login`
Authenticates an existing user and returns an access token upon successful login.

**Request**:
```json
{
  "email": "string",
  "password": "string"
}
```
**Required Fields**: `email`, `password`

**Response**:
```json
{
  "success": true,
  "message": "Login successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "data": {
    "_id": "60c72b2f9b1e8e001c8e0e0e",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": 0,
    "createdAt": "2023-10-27T10:00:00.000Z",
    "updatedAt": "2023-10-27T10:00:00.000Z",
    "__v": 0
  }
}
```
**Errors**:
-   `400 Bad Request`: Validation errors for input fields.
-   `404 Not Found`: Invalid credentials, typically when a user with the provided email is not found.
    ```json
    {
      "success": false,
      "message": "Invalid Credentials( User not Found)"
    }
    ```
-   `401 Unauthorized`: Password not matching the stored password for the given user.
    ```json
    {
      "success": false,
      "message": "Password not Matching"
    }
    ```
-   `500 Internal Server Error`: Generic server error during login.

#### `GET /api/user/profile`
Retrieves the profile information of the authenticated user. This endpoint requires a valid JWT in the `Authorization` header.

**Request**:
Requires `Authorization: Bearer <token>` header.

**Response**:
```json
{
  "success": true,
  "message": "User profile fetched successfully",
  "data": {
    "_id": "60c72b2f9b1e8e001c8e0e0e",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": 0,
    "createdAt": "2023-10-27T10:00:00.000Z",
    "updatedAt": "2023-10-27T10:00:00.000Z",
    "__v": 0
  }
}
```
**Errors**:
-   `401 Unauthorized`:
    -   `Authorization token required`: No token provided.
    -   `Invalid token format`: Token not in `Bearer <token>` format.
    -   `Invalid or expired token`: JWT is invalid or has expired.
    ```json
    {
      "success": false,
      "message": "Authorization token required"
    }
    ```
-   `404 Not Found`: User not found in the database, even with a valid token.
    ```json
    {
      "success": false,
      "message": "User not found"
    }
    ```
-   `500 Internal Server Error`: Generic server error during profile retrieval.

## Usage
After successfully setting up and running the application, you can interact with the API using tools like Postman, Insomnia, or `curl`.

**Example Flow:**

1.  **Register a new user:**
    Send a `POST` request to `/api/user/register` with your user details.
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{
      "name": "Test User",
      "email": "test@example.com",
      "password": "password123"
    }' http://localhost:3000/api/user/register
    ```

2.  **Log in the user:**
    Send a `POST` request to `/api/user/login` with the registered email and password to receive an authentication token.
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{
      "email": "test@example.com",
      "password": "password123"
    }' http://localhost:3000/api/user/login
    ```
    *   **Response will include a `token`:** Copy this token for subsequent authenticated requests.

3.  **Access the user profile:**
    Send a `GET` request to `/api/user/profile`, including the `Authorization` header with the `Bearer` token obtained from login.
    ```bash
    curl -X GET -H "Authorization: Bearer <YOUR_JWT_TOKEN>" http://localhost:3000/api/user/profile
    ```
    Replace `<YOUR_JWT_TOKEN>` with the actual token you received from the login endpoint.

## Technologies Used
| Technology          | Description                                                                 | Link                                                                               |
| :------------------ | :-------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| **Node.js**         | JavaScript runtime environment                                              | [Official Website](https://nodejs.org/en)                                          |
| **Express.js**      | Minimalist web application framework for Node.js                            | [Official Website](https://expressjs.com/)                                         |
| **MongoDB**         | Cross-platform, document-oriented database program                          | [Official Website](https://www.mongodb.com/)                                       |
| **Mongoose**        | Object Data Modeling (ODM) library for MongoDB and Node.js                  | [Official Website](https://mongoosejs.com/)                                        |
| **JWT**             | JSON Web Tokens for compact, URL-safe means of representing claims          | [jwt.io](https://jwt.io/)                                                          |
| **Bcrypt**          | Library to help hash passwords                                              | [npmjs.com/package/bcrypt](https://www.npmjs.com/package/bcrypt)                   |
| **Express-Validator** | Middleware for server-side data validation                                  | [npmjs.com/package/express-validator](https://www.npmjs.com/package/express-validator) |
| **Dotenv**          | Loads environment variables from a `.env` file                              | [npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)                   |
| **Nodemon**         | Utility that monitors for changes in your source and automatically restarts your server | [npmjs.com/package/nodemon](https://www.npmjs.com/package/nodemon)                 |

## Contributing 🤝
We welcome contributions to enhance this project! If you'd like to contribute, please follow these guidelines:

1.  **Fork the repository**.
2.  **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name`.
3.  **Make your changes** and ensure they adhere to the project's coding standards.
4.  **Write clear, concise commit messages**.
5.  **Push your branch** to your forked repository.
6.  **Open a Pull Request** to the `main` branch of this repository, describing your changes.

## License 📄
This project is licensed under the ISC License. For more details, refer to the [ISC License](https://opensource.org/licenses/ISC).

## Author ✨
**[Your Name]**

-   **LinkedIn**: [Your LinkedIn Profile](https://www.linkedin.com/in/yourusername)
-   **Twitter**: [Your Twitter Profile](https://twitter.com/yourusername)
-   **Portfolio**: [Your Portfolio Website](https://yourwebsite.com)

## Badges
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-800000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Project Status: Active](https://img.shields.io/badge/Status-Active-brightgreen.svg)](https://github.com/GAGGAH1/Auth-Project)

---

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)