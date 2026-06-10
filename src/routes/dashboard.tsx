import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { Bell, Search } from "lucide-react";
import { DashSidebar } from "@/components/doxly/DashSidebar";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Doxly" },
      { name: "description", content: "Doxly clinic dashboard for doctors." },
    ],
  }),
  component: DashboardLayout,
});

const titles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Good morning, Dr. Mehra", subtitle: "Here's what's happening at your clinic today." },
  "/dashboard/queue": { title: "Queue", subtitle: "Manage who's next and keep things moving." },
  "/dashboard/add-patient": { title: "Add Patient", subtitle: "Register a walk-in or returning patient." },
  "/dashboard/patients": { title: "Patients", subtitle: "Your complete patient directory." },
  "/dashboard/earnings": { title: "Earnings", subtitle: "Track consultations, payments and growth." },
  "/dashboard/settings": { title: "Settings", subtitle: "Clinic preferences and your profile." },
};

function DashboardLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const meta = titles[pathname] ?? titles["/dashboard"];

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <DashSidebar />

      <div className="transition-[padding] duration-300" style={{ paddingLeft: 260 }}>
        <header className="sticky top-0 z-30 flex h-20 items-center gap-6 border-b border-[#1A1A1A] bg-[#080808]/85 px-8 backdrop-blur-xl">
          <div className="min-w-0">
            <h1 className="font-display truncate text-2xl text-white">{meta.title}</h1>
            <p className="truncate text-xs text-text-secondary">{meta.subtitle}</p>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <input
                placeholder="Search patients, tokens…"
                className="h-10 w-72 rounded-lg border border-[#222] bg-[#111] pl-9 pr-3 text-sm text-white placeholder:text-text-muted outline-none focus:border-emerald"
              />
            </div>
            <button className="relative grid h-10 w-10 place-items-center rounded-lg border border-[#222] bg-[#111] text-text-secondary transition hover:text-white">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-emerald" />
            </button>
            <div className="flex items-center gap-3 rounded-lg border border-[#222] bg-[#111] px-3 py-1.5">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-emerald/20 text-xs font-medium text-emerald">
                DM
              </div>
              <div className="hidden text-left md:block">
                <div className="text-xs font-medium text-white">Dr. Mehra</div>
                <div className="text-[10px] text-text-secondary">General Physician</div>
              </div>
            </div>
          </div>
        </header>

        <main className="px-8 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
