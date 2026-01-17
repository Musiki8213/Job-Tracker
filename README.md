# Job Tracker Web Application

A modern React + TypeScript web application for tracking job applications. Manage your job search process with an intuitive interface, user authentication, and persistent data storage.

## Overview

This application helps job seekers organize and track their applications. Users can register, log in, and maintain their own private list of job applications with features like search, filtering, sorting, and detailed job views.

## Features

### User Authentication
- User registration with validation
- Secure login system
- Persistent session management
- Logout functionality

### Job Management
- Add new job applications with company, role, status, and date
- Edit existing job entries
- Delete jobs with confirmation
- View detailed job information

### Search & Filter
- Real-time search by company name or job role
- Filter by application status (Applied, Interviewed, Rejected)
- Sort by date applied (oldest/newest first)

### User Experience
- Toast notifications for all user actions
- Visual loading indicators
- Responsive design for all screen sizes
- Modern UI with clear visual hierarchy
- Status badges with color coding
- Empty state messages
- Smooth animations and transitions

### Data Persistence
- Per-user data storage using LocalStorage
- Jobs persist across sessions
- Secure user-specific data isolation

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **React Router** - Navigation and routing
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features
- **LocalStorage** - Client-side data persistence

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Job-Tracker
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Job-Tracker/
├── public/                 # Static assets
├── src/
│   ├── Components/        # Reusable components
│   │   ├── Loader.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── Toast.tsx
│   ├── Context/           # React context providers
│   │   ├── AuthContext.tsx
│   │   └── ToastContext.tsx
│   ├── pages/             # Page components
│   │   ├── Homepage/
│   │   ├── Jobpage/
│   │   ├── Landingpage/
│   │   ├── Loginpage/
│   │   ├── Registerpage/
│   │   └── Notfoundpage/
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── package.json
└── README.md
```

## Usage

1. **Landing Page**: Start by visiting the landing page to learn about the app
2. **Register**: Create a new account with a username and password
3. **Login**: Sign in with your credentials
4. **Add Jobs**: Fill in the form with company name, role, date applied, and status
5. **Manage Jobs**: Edit or delete jobs as needed
6. **Search & Filter**: Use the search bar and filters to find specific applications
7. **View Details**: Click on any job to see detailed information

## Features in Detail

### Toast Notifications
- Success notifications for successful actions
- Error notifications for validation errors
- Info notifications for informational messages
- Auto-dismiss after 3 seconds

### Job Status
- **Applied**: Initial application submitted
- **Interviewed**: Interview stage reached
- **Rejected**: Application rejected

### Responsive Design
- Mobile-friendly layout
- Tablet optimization
- Desktop experience

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Notes

- All data is stored locally in the browser's LocalStorage
- Each user's data is isolated and secure
- No backend server required
- Works offline after initial load
