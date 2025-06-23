# CRM Platform

A full-stack Customer Relationship Management (CRM) platform with a Node.js/Express backend, a React/Tailwind frontend, and integrated AI features.

## Features

- Customer management
- Campaign management
- Communication logs
- Authentication (private routes)
- OpenAI integration (for advanced features)
- **AI-powered insights and automation**

## Project Structure

```
backend/
  models/           # Mongoose models (Customer, Campaign, CommunicationLog)
  routes/           # Express route handlers
  server.js         # Main Express server
  package.json      # Backend dependencies

frontend/
  src/
    api/            # API calls
    components/     # React components
    context/        # React context (Auth)
    pages/          # Main pages (Dashboard, Login, etc.)
    styles.css      # Custom styles
    tailwind.css    # Tailwind base
  public/           # Static assets
  package.json      # Frontend dependencies
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm start
   ```

The frontend will typically run on [http://localhost:3000](http://localhost:3000) and the backend on [http://localhost:5000](http://localhost:5000).

## Environment Variables

- Backend: Create a `.env` file in the `backend/` directory for MongoDB URI, OpenAI API key, etc.
- Frontend: Configure API endpoints if needed in `src/api/api.js`.

## Technologies Used

- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** React, Tailwind CSS
- **AI:** OpenAI API
- **Other:** Custom automation and analytics

## License

MIT
