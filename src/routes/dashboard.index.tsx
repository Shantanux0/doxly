import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Users, IndianRupee, Clock, CheckCircle2, ArrowUpRight,
  Check, SkipForward, RefreshCw, UserPlus, ChevronDown, ChevronUp, Plus,
} from "lucide-react";
import { CountUp } from "@/components/doxly/Reveal";
import { queuePatients, activityFeed, earningsChart } from "@/lib/api/dashboard-data";

export const Route = createFileRoute("/dashboard/")({
  component: OverviewPage,
});

const stats = [
  { label: "Patients Today", value: 24, suffix: "", icon: Users, delta: "+12%", color: "#52B788" },
  { label: "Earnings Today", value: 12400, prefix: "₹", icon: IndianRupee, delta: "+8%", color: "#52B788" },
  { label: "Avg. Wait", value: 14, suffix: " min", icon: Clock, delta: "-3 min", color: "#F59E0B" },
  { label: "Completed", value: 18, suffix: "", icon: CheckCircle2, delta: "75%", color: "#52B788" },
];

function OverviewPage() {
  const [showCompleted, setShowCompleted] = useState(false);
  const [earningInput, setEarningInput] = useState("");
  const [recent, setRecent] = useState<{ amt: number; t: string }[]>([
    { amt: 500, t: "Token #03" },
    { amt: 800, t: "Token #02" },
  ]);

  const current = queuePatients.find((p) => p.status === "current");
  const waiting = queuePatients.filter((p) => p.status === "waiting");
  const done = queuePatients.filter((p) => p.status === "done");
  const max = Math.max(...earningsChart.map((d) => d.value));

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="group rounded-2xl border border-[#222] bg-gradient-to-br from-[#141414] to-[#0F0F0F] p-6 transition-all hover:-translate-y-1 hover:border-emerald/40 hover:shadow-[0_20px_60px_-20px_rgba(82,183,136,0.25)]"
              style={{ animation: `fade-in 0.4s ease ${i * 0.06}s both` }}
            >
              <div className="flex items-center justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-[#222] bg-[#1A1A1A]">
                  <Icon className="h-4 w-4" style={{ color: s.color }} />
                </div>
                <span className="text-xs text-emerald">{s.delta}</span>
              </div>
              <div className="mt-6 font-mono-dm text-3xl text-white">
                {s.prefix}<CountUp to={s.value} />{s.suffix}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-text-secondary">
                {s.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Queue panel (2/3) */}
        <div className="xl:col-span-2 space-y-6">
          {/* Current token */}
          {current && (
            <div className="relative overflow-hidden rounded-2xl border border-emerald/30 bg-gradient-to-br from-emerald/10 via-[#111] to-[#0F0F0F] p-7">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald/15 blur-3xl" />
              <div className="relative flex flex-wrap items-center gap-8">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-emerald">Now serving</div>
                  <div className="font-display mt-2 text-7xl text-white">#{String(current.token).padStart(2, "0")}</div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-3xl text-white">{current.name}</div>
                  <div className="mt-1 text-sm text-text-secondary">
                    {current.age}y · {current.gender === "M" ? "Male" : "Female"} · {current.reason}
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#222] bg-[#0F0F0F] px-3 py-1 text-xs text-text-secondary">
                    <Clock className="h-3 w-3 text-emerald" /> In consultation · 06:42
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="inline-flex items-center gap-2 rounded-lg bg-emerald px-4 py-2.5 text-sm font-medium text-[#062014] transition hover:brightness-110">
                    <Check className="h-4 w-4" /> Mark Done
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-lg border border-[#F59E0B]/50 px-4 py-2.5 text-sm text-[#F59E0B] transition hover:bg-[#F59E0B]/10">
                    <SkipForward className="h-4 w-4" /> Skip
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-lg border border-[#3B82F6]/50 px-4 py-2.5 text-sm text-[#3B82F6] transition hover:bg-[#3B82F6]/10">
                    <RefreshCw className="h-4 w-4" /> Reschedule
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Waiting list */}
          <div className="rounded-2xl border border-[#222] bg-[#111]">
            <div className="flex items-center justify-between border-b border-[#1A1A1A] px-6 py-4">
              <div>
                <h3 className="font-display text-xl text-white">Waiting</h3>
                <p className="text-xs text-text-secondary">{waiting.length} patients in queue</p>
              </div>
              <Link
                to="/dashboard/queue"
                className="inline-flex items-center gap-1 text-xs text-emerald hover:underline"
              >
                Open full queue <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="divide-y divide-[#1A1A1A]">
              {waiting.map((p, i) => (
                <div
                  key={p.id}
                  className="grid grid-cols-[60px_1fr_auto_auto] items-center gap-4 px-6 py-3.5 transition hover:bg-[#161616]"
                  style={{ animation: `fade-in 0.35s ease ${i * 0.04}s both` }}
                >
                  <div className="font-mono-dm text-sm text-emerald">#{String(p.token).padStart(2, "0")}</div>
                  <div>
                    <div className="text-sm font-medium text-white">{p.name}</div>
                    <div className="text-xs text-text-secondary">{p.reason}</div>
                  </div>
                  <div
                    className="rounded-full px-2.5 py-1 text-[11px]"
                    style={{
                      backgroundColor: p.waitMins < 15 ? "rgba(76,175,80,0.12)" : p.waitMins < 30 ? "rgba(245,158,11,0.12)" : "rgba(239,68,68,0.12)",
                      color: p.waitMins < 15 ? "#4CAF50" : p.waitMins < 30 ? "#F59E0B" : "#EF4444",
                    }}
                  >
                    {p.waitMins} min wait
                  </div>
                  <button className="rounded-md border border-[#222] px-3 py-1.5 text-xs text-text-secondary transition hover:border-emerald hover:text-emerald">
                    Call next
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Earnings sparkline */}
          <div className="rounded-2xl border border-[#222] bg-[#111] p-6">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <h3 className="font-display text-xl text-white">This week</h3>
                <p className="text-xs text-text-secondary">Earnings trend</p>
              </div>
              <div className="font-mono-dm text-2xl text-white">₹<CountUp to={40900} /></div>
            </div>
            <div className="flex h-44 items-end gap-3">
              {earningsChart.map((d, i) => (
                <div key={d.day} className="group flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-emerald-dark to-emerald transition-all hover:opacity-90"
                    style={{
                      height: `${(d.value / max) * 100}%`,
                      animation: `fade-in 0.5s ease ${0.1 + i * 0.08}s both`,
                    }}
                  />
                  <div className="text-[11px] text-text-secondary">{d.day}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity feed */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#222] bg-[#111]">
            <div className="border-b border-[#1A1A1A] px-6 py-4">
              <h3 className="font-display text-xl text-white">Activity</h3>
              <p className="text-xs text-text-secondary">Live clinic feed</p>
            </div>
            <div className="max-h-[420px] divide-y divide-[#1A1A1A] overflow-y-auto">
              {activityFeed.map((a, i) => {
                const palette = {
                  done: { bg: "rgba(82,183,136,0.12)", color: "#52B788", Icon: Check },
                  added: { bg: "rgba(82,183,136,0.12)", color: "#52B788", Icon: UserPlus },
                  skipped: { bg: "rgba(245,158,11,0.12)", color: "#F59E0B", Icon: SkipForward },
                  rescheduled: { bg: "rgba(59,130,246,0.12)", color: "#3B82F6", Icon: RefreshCw },
                  payment: { bg: "rgba(82,183,136,0.12)", color: "#52B788", Icon: IndianRupee },
                }[a.type];
                const Ic = palette.Icon;
                return (
                  <div
                    key={a.id}
                    className="flex items-start gap-3 px-6 py-3.5"
                    style={{ animation: `fade-in 0.4s ease ${i * 0.05}s both` }}
                  >
                    <div
                      className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full"
                      style={{ backgroundColor: palette.bg }}
                    >
                      <Ic className="h-3.5 w-3.5" style={{ color: palette.color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-white">{a.text}</p>
                      <p className="mt-0.5 text-[11px] text-text-secondary">{a.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-[#222] bg-[#111] p-6">
            <h3 className="font-display text-xl text-white">Add earning</h3>
            <p className="text-xs text-text-secondary">For current patient · #{String(current?.token ?? 0).padStart(2, "0")}</p>
            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const v = Number(earningInput);
                if (!v) return;
                setRecent((r) => [{ amt: v, t: `Token #${String(current?.token ?? 0).padStart(2, "0")}` }, ...r].slice(0, 4));
                setEarningInput("");
              }}
            >
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">₹</span>
                <input
                  value={earningInput}
                  onChange={(e) => setEarningInput(e.target.value.replace(/\D/g, ""))}
                  placeholder="500"
                  className="h-11 w-full rounded-lg border border-[#222] bg-[#0F0F0F] pl-7 pr-3 text-white placeholder:text-text-muted outline-none focus:border-emerald font-mono-dm"
                />
              </div>
              <button className="inline-flex items-center gap-1.5 rounded-lg bg-emerald px-4 text-sm font-medium text-[#062014] transition hover:brightness-110">
                <Plus className="h-4 w-4" /> Add
              </button>
            </form>
            <div className="mt-4 space-y-1.5">
              {recent.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-md border border-[#1A1A1A] bg-[#0F0F0F] px-3 py-2 text-xs"
                  style={{ animation: `fade-in 0.3s ease both` }}
                >
                  <span className="text-text-secondary">{r.t}</span>
                  <span className="font-mono-dm text-emerald">+₹{r.amt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Completed today */}
      <div className="rounded-2xl border border-[#222] bg-[#111]">
        <button
          onClick={() => setShowCompleted((v) => !v)}
          className="flex w-full items-center justify-between px-6 py-4 text-left"
        >
          <div>
            <h3 className="font-display text-xl text-white">Completed today ({done.length})</h3>
            <p className="text-xs text-text-secondary">Click to {showCompleted ? "hide" : "view"}</p>
          </div>
          {showCompleted ? <ChevronUp className="h-4 w-4 text-text-secondary" /> : <ChevronDown className="h-4 w-4 text-text-secondary" />}
        </button>
        {showCompleted && (
          <div className="overflow-hidden border-t border-[#1A1A1A]" style={{ animation: "fade-in 0.3s ease" }}>
            <table className="w-full text-sm">
              <thead className="bg-[#0F0F0F] text-xs uppercase tracking-wider text-text-secondary">
                <tr>
                  <th className="px-6 py-3 text-left">Token</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Time</th>
                  <th className="px-6 py-3 text-right">Paid</th>
                </tr>
              </thead>
              <tbody>
                {done.map((p) => (
                  <tr key={p.id} className="border-t border-[#1A1A1A] hover:bg-[#161616]">
                    <td className="px-6 py-3 font-mono-dm text-emerald">#{String(p.token).padStart(2, "0")}</td>
                    <td className="px-6 py-3 text-white">{p.name}</td>
                    <td className="px-6 py-3 text-text-secondary">{p.arrivedAt}</td>
                    <td className="px-6 py-3 text-right font-mono-dm text-white">₹{p.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
