# Portfolio Backend API

This is a backend API built with Node.js, Express, and MongoDB that provides user authentication,
sessions, update and delete users. It supports:

MongoDB Atlas.
In-Memory MongoDB (for easy local testing, no database setup needed).

## Prerequisites

- Node.js installed on your machine.

## Running the API

### Option 1: Run with In-Memory MongoDB

1. Install dependencies:
   npm install
2. Seed the database:
   npm run seed
3. Start the server:
   npm run start:memory

## Example Login

POST /login
Content-Type: application/json
{
"email": "john@example.com",
"password": "123"
}

## Example Register

POST /auth/register
{
"username": "Alice",
"email": "alice@example.com",
"password": "password123"
}

## Example Update User

PATCH /users/:id

{
"Authorization": "Bearer <session_token>"
}

{
"username": "Updated John"
}
