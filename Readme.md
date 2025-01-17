# Banking App Backend

This is a backend application for a banking system built with TypeScript, Express, and Prisma. It provides APIs for user authentication, account management, and transactions.

## Table of Contents

- [Banking App Backend](#banking-app-backend)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
  - [API Documentation](#api-documentation)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- User registration and login
- JWT-based authentication
- Account balance retrieval
- Transaction management
- Input validation and sanitization
- Error handling and logging
- Swagger API documentation

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (v14 or higher)
- npm (v6 or higher)
- MySQL database

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/banking-backend.git
    cd banking-backend
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

## Environment Variables

Create a `.env` file in the root directory and configure the following environment variables:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=banking_app
JWT_SECRET=your_secret_key
REDIS_URL=''
PORT=3000
DATABASE_URL="mysql://root:password@localhost:3306/banking_app?schema=public"
```

## Database Setup

1. Ensure your MySQL server is running.
2. Create a new database named `banking_app`.
3. Run the Prisma migrations to set up the database schema:

    ```sh
    npx prisma migrate dev
    ```

## Running the Application

1. Start the application:

    ```sh
    npm start
    ```

2. The server will start on the port specified in the `.env` file (default is 3000).
3. Access the API documentation: Open your browser and navigate to http://localhost:3000/api-docs to view the Swagger API documentation.

## API Documentation

The API documentation is available at `/api-docs` when the server is running. It is generated using Swagger.

## Project Structure

```plaintext
.
├── prisma
│   ├── migrations
│   │   ├── 20250115003912_createuserstable
│   │   │   └── migration.sql
│   │   ├── 20250117144001_create_transaction_table
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── src
│   ├── controllers
│   │   ├── account.ts
│   │   ├── auth.ts
│   │   └── items.ts
│   ├── exceptions
│   │   ├── bad_request.ts
│   │   └── root.ts
│   ├── middlewares
│   │   ├── errorHandler.ts
│   │   ├── logEvents.ts
│   │   ├── validation.ts
│   │   ├── validationSchema
│   │   │   ├── account.ts
│   │   │   └── auth.ts
│   │   ├── verifyJwt.ts
│   ├── routes
│   │   ├── account.ts
│   │   ├── auth.ts
│   │   ├── index.ts
│   │   └── items.ts
│   ├── services
│   │   ├── accountService.ts
│   │   ├── authService.ts
│   │   └── userService.ts
│   ├── logs
│   │   ├── errLog.txt
│   │   └── reqLog.txt
│   ├── redisClient.ts
│   ├── secrets.ts
│   ├── index.ts
│   └── types.d.ts
├── .env.example
├── .gitignore
├── nodemon.json
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.