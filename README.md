# VolunteerHub AI

A modern, full-stack NGO volunteer management platform built to streamline registration, program tracking, and volunteer engagement. Developed with a high-performance Next.js frontend and a robust PHP/MySQL backend.

## 🚀 Project Overview

VolunteerHub AI is designed specifically for NGOs (like NayePankh) to manage their volunteers effectively. It offers a beautiful, animated frontend for volunteers to register and explore programs, paired with a secure admin dashboard to track metrics and engagement. 

## ✨ Features

- **Modern & Responsive UI**: Built with Tailwind CSS and Framer Motion for smooth, premium animations.
- **Dynamic Program Showcases**: Engaging cards detailing various NGO initiatives (Education, Environment, Community Support).
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
- **Database**: Aiven MySQL

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

### 2. Database Setup (Aiven MySQL)
1. Create a MySQL service on [Aiven](https://aiven.io/).
2. Obtain your host, port, username, and password.
3. Import the database schema:
   ```bash
   mysql -h YOUR_HOST -P YOUR_PORT -u avnadmin -p < backend/schema.sql
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
3. Edit `.env` with your Aiven MySQL credentials.
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
5. Set your `NEXT_PUBLIC_ADMIN_PASSWORD` (default is `nayepankh2024`).
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

## 🌍 Deployment

For a production-ready setup, we recommend the following decoupled architecture:

- **Frontend**: Deploy on [Vercel](https://vercel.com/). Connect your GitHub repository, set the Framework Preset to Next.js, and ensure the Root Directory is set to `frontend`. Add your `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_ADMIN_PASSWORD` to Vercel's Environment Variables.
- **Backend**: Deploy on [Railway](https://railway.app/). Railway natively supports PHP projects. Connect the `backend` directory, and add your database credentials to Railway's Environment Variables.
- **Database**: Host securely on [Aiven MySQL](https://aiven.io/).

## 📸 Screenshots

*(Replace placeholder links with actual screenshots of your application)*

- [Home Page Overview](#)
- [Volunteer Registration Form](#)
- [Admin Dashboard Analytics](#)

## 🔮 Future Improvements

- **Authentication**: Migrate the client-side password gate to a robust JWT-based authentication system using NextAuth.js or PHP Sessions.
- **Admin Features**: Add CSV export functionality, volunteer approval workflows, and automated email responses.
- **Testing**: Implement unit testing (Jest/React Testing Library) and E2E testing (Cypress/Playwright).
