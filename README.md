# React Firebase Login System

A modern authentication system built with React, TypeScript, Vite, and Firebase.

## Features

- User registration (sign up)
- User login (sign in)
- Protected routes
- Firebase authentication
- Real-time user state management
- Clean and responsive UI

## Prerequisites

- Node.js 16+
- npm or yarn
- Firebase account

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory with your Firebase config:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── config/           # Firebase configuration
├── context/          # React context for authentication
├── pages/            # Page components
├── styles/           # CSS styles
├── App.tsx           # Main app component
└── main.tsx          # Entry point
```

## Usage

- Navigate to `/signup` to create a new account
- Navigate to `/signin` to log in
- After authentication, access `/dashboard`

## Technologies

- React 18
- TypeScript
- Vite
- Firebase
- React Router
