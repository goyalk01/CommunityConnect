# CommunityConnect

A modern, full-stack community engagement and volunteer management platform built to streamline onboarding, participation tracking, and community operations. Designed as a premium SaaS application with a high-performance Next.js frontend, a complete Light/Dark theme system, and a robust PHP/MySQL backend.

## 🚀 Overview

CommunityConnect is designed to help community initiatives and social organizations manage their volunteers effectively. It offers a beautifully animated, responsive frontend for volunteers to register and explore programs, paired with a secure admin dashboard powered by Recharts to track metrics, skills, and engagement in real-time.

This project serves as a showcase of full-stack development, demonstrating production-ready Next.js techniques, secure API integration, clean database architecture, and a highly polished user experience.

## ✨ Features

- **Premium SaaS UI**: Built with Tailwind CSS and Framer Motion for smooth animations, micro-interactions, and a professional aesthetic.
- **Complete Theme System**: Full Light/Dark mode support across all pages and components using `next-themes` and CSS variables.
- **Dynamic Program Showcases**: Engaging, animated cards detailing various community initiatives (e.g., Education, Environment, Community Support).
- **Comprehensive Registration & Contact**: Multi-step capable forms with skill tagging, availability toggles, success animations, and seamless API integration.
- **Advanced Admin Dashboard**: Password-protected portal displaying real-time KPIs, interactive charts (Recharts), and paginated data tables.

## 💻 Tech Stack

### Frontend
- **Framework**: Next.js 15/16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **Theming**: Next-themes

### Backend
- **Language**: PHP 8.3
- **Architecture**: REST API using PDO
- **Database**: MySQL

## 🏗 Architecture & Folder Structure

The repository is structured as a monorepo containing both the frontend application and the backend API service.

```text
CommunityConnect/
├── frontend/                # Next.js Application
│   ├── src/
│   │   ├── app/             # App Router pages (/, /programs, /register, /dashboard, etc.)
│   │   ├── components/      # Reusable UI components (Navbar, Footer, MobileMenu, ThemeToggle)
│   │   └── lib/             # Shared utilities and constants
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
│
├── backend/                 # PHP REST API
│   ├── api/                 # API endpoints (register.php, volunteers.php, contact.php, stats.php, dashboard-stats.php)
│   ├── config/              # Database configuration (db.php)
│   └── schema.sql           # Database schema initialization
│
├── .gitignore               # Global git ignore rules
└── README.md                # Project documentation
```

## 🛠 Installation & Local Development

### 1. Clone the repository
```bash
git clone https://github.com/your-username/communityconnect.git
cd communityconnect
```

### 2. Database Setup
1. Set up a local MySQL instance (e.g., via XAMPP, Docker, or standalone).
2. Create a database named `communityconnect`.
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
| `/api/contact.php` | `POST` | Submits a contact inquiry to the database. |
| `/api/volunteers.php` | `GET` | Retrieves list of volunteers. |
| `/api/stats.php` | `GET` | Retrieves high-level KPIs (total volunteers, active programs). |
| `/api/dashboard-stats.php` | `GET` | Retrieves complex data for Recharts (monthly growth, program distribution). |

## 🌍 Deployment Recommendations

For a production-ready setup, we recommend the following decoupled architecture:

- **Frontend**: Deploy on [Vercel](https://vercel.com/). Connect your GitHub repository, set the Framework Preset to Next.js, and ensure the Root Directory is set to `frontend`. Add your `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_ADMIN_PASSWORD` to Vercel's Environment Variables.
- **Backend & Database**: Deploy on [Railway](https://railway.app/). Railway natively supports PHP projects and offers integrated MySQL instances. Connect the `backend` directory, provision a MySQL service, and add the generated database credentials to your PHP app's Environment Variables.

## 🔮 Future Improvements

- **Authentication**: Migrate the client-side password gate to a robust JWT-based authentication system (e.g., NextAuth.js or PHP Sessions).
- **Admin Features**: Add CSV export functionality, volunteer approval workflows, and automated email responses.
- **Testing**: Implement unit testing (Jest/React Testing Library) and E2E testing (Cypress/Playwright).
