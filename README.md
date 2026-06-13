# VolunteerHub AI

A modern, full-stack community management platform built to streamline onboarding, participation tracking, and volunteer engagement. Developed with a high-performance Next.js frontend and a robust PHP/MySQL backend.

## 🚀 Overview

VolunteerHub AI is designed to help community initiatives and social organizations manage their volunteers effectively. It offers a beautifully animated frontend for volunteers to register and explore programs, paired with a secure admin dashboard to track metrics, skills, and engagement.

This project serves as a showcase of full-stack development, demonstrating production-ready Next.js techniques, secure API integration, and clean database architecture.

## ✨ Features

- **Modern & Responsive UI**: Built with Tailwind CSS and Framer Motion for smooth, premium animations and micro-interactions.
- **Dynamic Program Showcases**: Engaging cards detailing various community initiatives (e.g., Education, Environment, Community Support).
- **Comprehensive Volunteer Registration**: Multi-step capable forms with skill tagging, availability toggles, and seamless API integration.
- **Secure Admin Dashboard**: Password-protected portal displaying real-time metrics, skill distributions, and recent registrations.
- **Contact & Inquiry System**: Dedicated contact forms linked to backend storage for easy communication management.

## 💻 Tech Stack

### Frontend
- **Framework**: Next.js 15/16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend
- **Language**: PHP 8.3
- **Architecture**: REST API using PDO
- **Database**: MySQL

## 🏗 Architecture & Folder Structure

The repository is structured as a monorepo containing both the frontend application and the backend API service.

```text
volunteerhub-ai/
├── frontend/                # Next.js Application
│   ├── src/
│   │   ├── app/             # App Router pages (/, /programs, /register, etc.)
│   │   ├── components/      # Reusable UI components (Navbar, Footer, MobileMenu)
│   │   └── lib/             # Shared utilities and constants
│   ├── public/              # Static assets (fonts, images, videos)
│   └── package.json         # Frontend dependencies
│
├── backend/                 # PHP REST API
│   ├── api/                 # API endpoints (register.php, volunteers.php, contact.php)
│   ├── config/              # Database configuration (db.php)
│   └── schema.sql           # Database schema initialization
│
├── .gitignore               # Global git ignore rules
└── README.md                # Project documentation
```

## 🛠 Installation & Local Development

### 1. Clone the repository
```bash
git clone https://github.com/your-username/volunteerhub-ai.git
cd volunteerhub-ai
```

### 2. Database Setup
1. Set up a local MySQL instance (e.g., via XAMPP, Docker, or standalone).
2. Create a database named `volunteerhub`.
3. Import the database schema:
   ```bash
   mysql -u root -p < backend/schema.sql
   ```

### 3. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create your environment file:
   ```bash
   cp .env.example .env
   ```
3. Edit `.env` with your local MySQL credentials.
4. Start the PHP development server:
   ```bash
   php -S localhost:8000
   ```

### 4. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your environment file:
   ```bash
   cp .env.example .env.local
   ```
4. Verify the `NEXT_PUBLIC_API_URL` points to your PHP server (default `http://localhost:8000`).
5. Set your `NEXT_PUBLIC_ADMIN_PASSWORD` (default is `admin2024`).
6. Start the Next.js development server:
   ```bash
   npm run dev
   ```
7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/register.php` | `POST` | Registers a new volunteer. Validates and deduplicates by email. |
| `/api/volunteers.php` | `GET` | Retrieves paginated list of volunteers. Supports `?skill=` and `?area=` filters. |
| `/api/contact.php` | `POST` | Submits a contact inquiry to the database. |

## 🌍 Deployment Recommendations

For a production-ready setup, we recommend the following decoupled architecture:

- **Frontend**: Deploy on [Vercel](https://vercel.com/). Connect your GitHub repository, set the Framework Preset to Next.js, and ensure the Root Directory is set to `frontend`. Add your `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_ADMIN_PASSWORD` to Vercel's Environment Variables.
- **Backend & Database**: Deploy on [Railway](https://railway.app/). Railway natively supports PHP projects and offers integrated MySQL instances. Connect the `backend` directory, provision a MySQL service, and add the generated database credentials to your PHP app's Environment Variables.

## 📸 Screenshots

*(Replace placeholder links with actual screenshots of your application)*

- [Home Page Overview](#)
- [Volunteer Registration Form](#)
- [Admin Dashboard Analytics](#)

## 🔮 Future Improvements

- **Authentication**: Migrate the client-side password gate to a robust JWT-based authentication system (e.g., NextAuth.js or PHP Sessions).
- **Admin Features**: Add CSV export functionality, volunteer approval workflows, and automated email responses.
- **Testing**: Implement unit testing (Jest/React Testing Library) and E2E testing (Cypress/Playwright).
