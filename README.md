# Todo App — Express & TypeScript

A full-stack Todo application built with **Express.js**, **TypeScript**, **MySQL** and **EJS** — featuring Auth0-based authentication, file uploads via Multer, and internationalisation (i18n).

## Features

- User authentication via **Auth0** (OAuth 2.0 / OpenID Connect)
- Create, read, update and delete tasks
- File attachments on tasks using **Multer**
- Server-side rendered views with **EJS** templates
- Multi-language support via **i18n**
- MySQL database integration with **mysql2**
- Fully typed with **TypeScript**

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js 5 |
| Language | TypeScript |
| Database | MySQL (mysql2) |
| Auth | Auth0 (express-openid-connect) |
| Templating | EJS |
| File Uploads | Multer |
| Dev Tools | ts-node, nodemon |

## Project Structure

```
todo-app-express-ts/
├── src/
│   ├── server.ts             # App entry point & Express setup
│   ├── controllers/
│   │   └── taskController.ts # CRUD handlers for tasks
│   ├── routes/
│   │   └── taskRoutes.ts     # Route definitions
│   ├── models/
│   │   └── db.ts             # MySQL connection pool
│   ├── middleware/           # Custom middleware
│   ├── i18n/                 # Translation files
│   └── views/
│       ├── index.ejs         # Home / login page
│       ├── tasks.ejs         # Task list view
│       ├── profile.ejs       # User profile
│       ├── 404.ejs           # Not found page
│       └── partials/         # Reusable EJS partials
├── public/                   # Static assets (CSS, JS, images)
├── .gitignore
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js ≥ 18
- MySQL database
- Auth0 account (free tier works)

### Installation

```bash
git clone https://github.com/Alpsahin60/todo-app-express-ts.git
cd todo-app-express-ts
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3003

# MySQL
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=todo_db

# Auth0
AUTH0_SECRET=your_long_random_secret
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
```

### Run in Development

```bash
npm run dev
```

Open [http://localhost:3003](http://localhost:3003)

### Database Setup

Create the tasks table in MySQL:

```sql
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  user_id VARCHAR(255),
  file_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Learning Outcomes

- Building RESTful APIs with Express and TypeScript
- Auth0 integration for secure user authentication
- Server-side rendering with EJS templates
- MySQL query handling via connection pools
- File upload handling with Multer
- Structuring a full-stack MVC application

## License

MIT
