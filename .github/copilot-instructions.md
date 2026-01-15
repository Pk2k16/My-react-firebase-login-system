# Copilot Instructions

## Project Overview
This is a React Firebase Login System built with Vite and TypeScript.

## Key Technologies
- React 18 with TypeScript
- Vite for fast development and building
- Firebase Authentication
- React Router for navigation
- Context API for state management

## Important Files
- `/src/config/firebase.ts` - Firebase configuration and initialization
- `/src/context/AuthContext.tsx` - Authentication context and hooks
- `/src/pages/` - Page components (SignUp, SignIn, Dashboard)
- `/src/App.tsx` - Main application component with routing

## Development Commands
- `npm install` - Install dependencies
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run linting

## Environment Setup
Before running the project, create a `.env.local` file with your Firebase credentials:
- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID
