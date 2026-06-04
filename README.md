# RigBuilder

RigBuilder is a full-stack web application where users can build their own custom PC by choosing different computer components. Users can browse products by category, select parts for their build, manage a cart, place an order, register, log in, and save favorite products.

---

## Tech Stack

### Frontend

- React
- React Router
- React Context for global state (Build, Auth & Favorites)
- CSS (Custom responsive design)

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt

---

## Project Structure

```text
RIGBUILDER/
├── public/              # Public frontend files
├── src/                 # React application
│   ├── assets/          # Images and icons
│   ├── components/      # Reusable components
│   ├── context/         # Global state
│   ├── data/            # Component category data
│   └── pages/           # Application pages
├── server/              # Express API
│   ├── config/          # Database connection
│   ├── controllers/     # API logic
│   ├── middleware/      # Error handling and JWT validation
│   ├── models/          # Mongoose models
│   └── routers/         # API routes
└── package.json         # Frontend scripts
```

---

## Getting Started

## Prerequisites

- Node.js
- npm
- A MongoDB Atlas account and cluster

## Clone the repo

```bash
git clone https://github.com/IsaacArcen/rigbuilder.git
cd rigbuilder
```

## Environment Variables

Create a `.env` file in the `server/` folder:

```env
PORT=5000
CONNECTION_STRING=mongodb+srv://admin:<db_password>@rigbuildercluster.f60bl9v.mongodb.net/?appName=RigBuilderCluster
ACCESS_TOKEN_SECRET=your_secret_key
```

Replace `<db_password>` with the MongoDB database password provided separately.

The backend uses `CONNECTION_STRING` to connect to MongoDB.

## Install Dependencies

```bash
# Frontend
npm install

# Backend
cd server
npm install
```

## Login

You can register a new account in the application.

A default test account can also be created automatically when logging in:

```text
Username: user
Password: password
```

## Run the App

Start the backend first:

```bash
cd server
npm run dev
```

Open a new terminal and start the frontend from the root folder:

```bash
npm start
```

The application will run on:

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## Main Features

- Browse PC components by category
- Search and filter products
- Select components for a custom PC build
- View selected components in the cart
- Change quantity or remove selected components
- Complete checkout and create an order
- Register and log in
- Save favorite products when logged in

---

## API Routes

### Products

```text
GET /api/products
GET /api/products?category=gpu
```

### Users

```text
POST /api/users/register
POST /api/users/login
GET /api/users/current
```

### Favorites

```text
GET /api/users/favorites
POST /api/users/favorites
DELETE /api/users/favorites/:productId
```

### Orders

```text
POST /api/orders
```

---

---

## Figma Design

[View Figma Design - PCForge](https://www.figma.com/design/sAqnpMKiraGXgJLqqGbfwv/PCForge?node-id=2-69&p=f&t=PeSvP3qC87BGM1Ws-0)

## Notes

The project requires both frontend and backend to be running at the same time.

The `.env` file is not included in the repository. Add the MongoDB connection string and JWT secret manually before starting the backend.

Do not upload `node_modules`, `.env` or `build` to GitHub.