# Doxly — Clinic Management Dashboard

Doxly is a clinic management dashboard built specifically for Indian doctors. It streamlines clinic operations, eliminates paper-based waiting room chaos, and improves the patient experience by integrating live queue tracking and automated messaging.

---

## 🚀 Key Features

* **💬 Auto-Booking via WhatsApp**: Patients can book appointments instantly by sending a WhatsApp message to the clinic's number without needing to download any app.
* **🎯 Live Token Tracking**: Patients receive an auto-updating link on WhatsApp showing their exact queue position and estimated wait time in real-time.
* **🔄 Smart Missed-Turn Rescheduling**: If a patient misses their turn, the system automatically reschedules them 5 slots ahead in the queue, keeping waiting fair and automated.
* **📈 Daily Earnings Tracker**: Real-time visual tracking (with charts) of daily, weekly, and monthly earnings in INR (₹).
* **📋 Live Queue Management**: A sleek control panel for the doctor/receptionist to mark patients as done, skip, reschedule, or add new walk-ins with a single click.
* **🗂️ Patient Records**: Complete histories of all patients searchable by name or phone number, with returning details auto-filled.

---

## 🛠️ Tech Stack

* **Framework**: [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (Full-stack React framework with SSR and React Router)
* **Frontend**: React 19, TypeScript
* **Styling**: Tailwind CSS, Lucide React (Icons), Framer Motion (Animations)
* **Build Tooling**: Vite v7
* **Package Manager**: npm

---

## 📁 Project Structure

```text
├── src/
│   ├── components/
│   │   ├── doxly/            # Core dashboard/landing components (Navbar, Sidebar, Reveal, etc.)
│   │   └── ui/               # Reusable Radix/Shadcn components (Dialogs, Tables, Buttons, etc.)
│   ├── hooks/                # Custom utility hooks (e.g., use-mobile)
│   ├── lib/
│   │   └── api/              # API helpers, error reporting, and mock dashboard-data
│   ├── routes/               # File-based routing (Landing page, Dashboard views, Login, etc.)
│   ├── server.ts             # SSR server entry point
│   ├── start.ts              # TanStack Start instance configuration
│   └── styles.css            # Global application styles
```

---

## 💻 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed.

### Installation

Clone the repository and install the dependencies. Due to package version overrides, use `--legacy-peer-deps`:

```bash
npm install --legacy-peer-deps
```

### Development Server

Start the local development server:

```bash
npm run dev
```

The app will be running at [http://localhost:8080](http://localhost:8080).

### Build for Production

Compile both the client and SSR environments for production:

```bash
npm run build
```

The build assets will be generated inside the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```
