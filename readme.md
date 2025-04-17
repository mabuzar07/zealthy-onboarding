# Zealthy Onboarding Application

Test Task with MERN Stack

## Features

- **Multi-step Onboarding Process**: A 3-step user registration flow
- **Dynamic Component Configuration**: Admin panel to rearrange components across pages
- **Component Library**: Includes About Me, Address Form, and Birthdate components
- **Data Visualization**: Display all user data in a sortable table
- **Session Persistence**: Remembers user progress during onboarding

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router Dom 7
- TailwindCSS

### Backend

- Node.js with Express
- TypeScript
- PostgreSQL
- Sequelize ORM
- Bcrypt for password hashing
- CORS support

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database

### Backend Setup

# Navigate to backend directory

cd zealthy-onboarding/backend

# Install dependencies

yarn install

# Create .env file with the following variables

# See .env.example for required variables

# Run development server

yarn start

# Navigate to frontend directory

cd zealthy-onboarding/frontend

# Install dependencies

yarn install

# Create .env file with the following variables

VITE_API_URL=  # For local development

# Run development server

yarn dev
