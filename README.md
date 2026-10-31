# DMS AAROHI: NGO Website & Admin Portal

A full-stack website for **DMS AAROHI**, a registered non-profit society (12A & 80G certified) running community welfare programmes in Greater Noida. The public site presents the organisation's initiatives, events and team. A built-in admin panel lets non-technical staff update all of that content without touching code.

**Live:** [dms-homepage.vercel.app](https://dms-homepage.vercel.app/)

> Built during my MERN Stack internship at ConsultIT Technologies Pvt. Ltd. (June to August 2026).

## Features

### Public website
- Homepage with a hero carousel, about section, initiatives, upcoming events, team and location map
- Six initiative pages, each with its own hero slides, content and photo gallery:
  - Blood Donation & Healthcare
  - Child Education
  - Beti Bachao
  - Cloth Distribution
  - Senior Citizen Welfare
  - Environment Awareness
- **Volunteer registration** and **blood donor registration** forms saved to the database
- Responsive layout built with Tailwind CSS

### Admin panel (`/admin`)
- JWT-protected login
- Dashboard with live counts of team members, events, volunteers and blood donors
- Manage team members, events, hero slides, galleries and initiative page content
- Image uploads (Multer, served from `/uploads`)
- Review volunteer and donor registrations and update their status

## Tech stack

| Layer | Tools |
| --- | --- |
| Frontend | React 19, Vite, React Router 7, Tailwind CSS 3, Lucide / React Icons |
| Backend | Node.js, Express 4, Mongoose 8, JWT, bcryptjs, Multer |
| Database | MongoDB |
| Hosting | Vercel (client) |

## Project structure

```
client/                 React frontend
  src/components/
    Homepage.jsx
    AdminPanel.jsx
    initiatives/        six initiative pages + shared components
  src/hooks/useSiteData.js
  src/lib/api.js        API helper (token stored in localStorage)
server/                 Express API
  models/               Admin, Event, GalleryImage, HeroSlide, InitiativeContent,
                        TeamMember, VolunteerRegistration, BloodDonorRegistration
  routes/               auth, team, gallery, events, content, upload, stats,
                        hero, volunteers, blood-donors
  seed.js               creates the admin user and seeds default content
```

## API overview

All routes are prefixed with `/api`.

| Resource | Endpoints |
| --- | --- |
| Auth | `POST /auth/login`, `GET /auth/me` |
| Team | `GET/POST /team`, `PUT/DELETE /team/:id` |
| Events | `GET/POST /events`, `PUT/DELETE /events/:id` |
| Hero slides | `GET/POST /hero/:initiative`, `PUT/DELETE /hero/:initiative/:id` |
| Gallery | `GET/POST /gallery/:initiative`, `DELETE /gallery/:initiative/:id` |
| Page content | `GET/PUT /content/:slug` |
| Volunteers | `POST/GET /volunteers`, `PATCH /volunteers/:id/status`, `DELETE /volunteers/:id` |
| Blood donors | `POST/GET /blood-donors`, `PATCH /blood-donors/:id/status`, `DELETE /blood-donors/:id` |
| Uploads | `POST /upload` |
| Stats | `GET /stats` |

## Getting started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_ORIGIN=http://localhost:5173
ADMIN_USERNAME=admin
ADMIN_PASSWORD=choose_a_strong_password
```

Seed the admin account and default content, then start the API:

```bash
npm run seed
npm run dev        # http://localhost:5000
```

### 2. Frontend

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev        # http://localhost:5173
```

Sign in to the admin panel at http://localhost:5173/admin with the credentials from `server/.env`.

## Author

**Mayur Garg** · [GitHub](https://github.com/mayurgarg08) · [LinkedIn](https://www.linkedin.com/in/mayur-garg-428a291b4/)
