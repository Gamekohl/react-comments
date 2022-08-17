# Nested Comment System
A nested comment system inspired by [Reddit](https://reddit.com) and coded along with the video of [WebDevSimplified](https://github.com/WebDevSimplified) ([Repository](https://github.com/WebDevSimplified/nested-comments)).

## 🖥️ Client
---
The client was built using [React](https://github.com/facebook/react). Following additional packages were used:
- [Axios](https://github.com/axios/axios)
- [React Router Dom](https://github.com/remix-run/react-router)

### 📁 Folder structure
---
```
📦src
┣ 📂components -- App components, e.g. Comment, Post, etc.
┣ 📂contexts   -- Custom contexts, PostContext
┣ 📂hooks      -- Custom Hooks, useAsync, useUser
┣ 📂services   -- Services to communicate with the server
```

## 🔌 Server
---
The server was built using [fastify](https://github.com/fastify/fastify) as the framework. Additional fastify packages were used:
- [fastify-cookie](https://github.com/fastify/fastify-cookie) - Mock user authentication (Hard-coded user id is set in cookie)
- [fastify-cors](https://github.com/fastify/fastify-cors) - Set up cors
- [fastify-sensible](https://github.com/fastify/fastify-sensible) - Useful utilities

### 🛢️ Database
--- 
[PostgreSQL](https://www.postgresql.org/) was used as the database in this project along with [Prisma](https://github.com/prisma/prisma) as ORM.
The database was hosted locally. An additional package to Prisma was used in order to automatically create Prisma schemas and migrations:
- [@prisma/client](https://www.npmjs.com/package/@prisma/client)

## ✏️ Author
---
Original repository and idea: [WebDevSimplified](https://github.com/WebDevSimplified)\
This repository: [Gamekohl](https://github.com/Gamekohl)

## 🔑 License
---
This project is licensed under the MIT License - see the LICENSE file for details
