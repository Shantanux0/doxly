import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment, useState } from "react";
import {
  Check, SkipForward, RefreshCw, Trash2, ChevronRight, Pause, Play,
  RotateCcw, UserPlus, Search, Clock,
} from "lucide-react";
import { queuePatients } from "@/lib/api/dashboard-data";

export const Route = createFileRoute("/dashboard/queue")({
  component: QueuePage,
});

function QueuePage() {
  const [paused, setPaused] = useState(false);
  const [q, setQ] = useState("");
  const current = queuePatients.find((p) => p.status === "current")!;
  const waiting = queuePatients.filter((p) => p.status === "waiting");
  const next3 = waiting.slice(0, 3);
  const filtered = waiting.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setPaused((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition"
          style={{
            borderColor: paused ? "#EF4444" : "#52B788",
            color: paused ? "#EF4444" : "#52B788",
            backgroundColor: paused ? "rgba(239,68,68,0.08)" : "rgba(82,183,136,0.08)",
          }}
        >
          {paused ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          Queue {paused ? "Paused" : "Active"}
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg border border-[#222] bg-[#111] px-4 py-2.5 text-sm text-text-secondary transition hover:text-white">
          <RotateCcw className="h-4 w-4" /> Reset Queue
        </button>
        <Link
          to="/dashboard/add-patient"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald px-4 py-2.5 text-sm font-medium text-[#062014] transition hover:brightness-110"
        >
          <UserPlus className="h-4 w-4" /> Add Patient
        </Link>
        <div className="relative ml-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Find in queue…"
            className="h-10 w-72 rounded-lg border border-[#222] bg-[#111] pl-9 pr-3 text-sm text-white placeholder:text-text-muted outline-none focus:border-emerald"
          />
        </div>
      </div>

      {/* Hero current */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald/30 bg-gradient-to-br from-emerald/15 via-[#111] to-[#0F0F0F] p-8">
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald/15 blur-3xl" />
        <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[auto_1fr_auto]">
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-emerald">Now serving</div>
            <div className="font-display mt-2 text-8xl text-white">#{String(current.token).padStart(2, "0")}</div>
          </div>
          <div>
            <div className="font-display text-4xl text-white">{current.name}</div>
            <div className="mt-2 text-sm text-text-secondary">
              {current.phone} · {current.age}y · {current.gender === "M" ? "Male" : "Female"}
            </div>
            <div className="mt-1 text-sm text-text-secondary">Reason: {current.reason}</div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#222] bg-[#0F0F0F] px-3 py-1 text-xs text-text-secondary">
              <Clock className="h-3 w-3 text-emerald" /> Consultation timer · 06:42
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald px-5 py-3 text-sm font-medium text-[#062014] transition hover:brightness-110">
              <Check className="h-4 w-4" /> Mark Done
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#F59E0B]/50 px-5 py-3 text-sm text-[#F59E0B] transition hover:bg-[#F59E0B]/10">
              <SkipForward className="h-4 w-4" /> Skip
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#3B82F6]/50 px-5 py-3 text-sm text-[#3B82F6] transition hover:bg-[#3B82F6]/10">
              <RefreshCw className="h-4 w-4" /> Reschedule
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#EF4444]/50 px-5 py-3 text-sm text-[#EF4444] transition hover:bg-[#EF4444]/10">
              <Trash2 className="h-4 w-4" /> Remove
            </button>
          </div>
        </div>
      </div>

      {/* Next up */}
      <div>
        <div className="mb-3 text-xs uppercase tracking-wider text-text-secondary">Next up</div>
        <div className="flex items-stretch gap-3">
          {next3.map((p, i) => (
            <Fragment key={p.id}>
              <div className="flex-1 rounded-xl border border-[#222] bg-[#111] p-4 transition hover:-translate-y-1 hover:border-emerald/40">
                <div className="font-mono-dm text-lg text-emerald">#{String(p.token).padStart(2, "0")}</div>
                <div className="mt-1 text-sm font-medium text-white">{p.name}</div>
                <div className="text-xs text-text-secondary">{p.waitMins} min wait</div>
              </div>
              {i < next3.length - 1 && (
                <div className="grid place-items-center text-text-muted">
                  <ChevronRight className="h-4 w-4" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      {/* Full queue table */}
      <div className="rounded-2xl border border-[#222] bg-[#111]">
        <div className="flex items-center justify-between border-b border-[#1A1A1A] px-6 py-4">
          <h3 className="font-display text-xl text-white">Full queue</h3>
          <span className="text-xs text-text-secondary">{filtered.length} patients</span>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-[#0F0F0F] text-xs uppercase tracking-wider text-text-secondary">
            <tr>
              <th className="px-6 py-3 text-left">Token</th>
              <th className="px-6 py-3 text-left">Patient</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Arrived</th>
              <th className="px-6 py-3 text-left">Wait</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const color = p.waitMins < 15 ? "#4CAF50" : p.waitMins < 30 ? "#F59E0B" : "#EF4444";
              return (
                <tr key={p.id} className="border-t border-[#1A1A1A] transition hover:bg-[#161616]">
                  <td className="px-6 py-3 font-mono-dm text-emerald">#{String(p.token).padStart(2, "0")}</td>
                  <td className="px-6 py-3">
                    <div className="text-white">{p.name}</div>
                    <div className="text-xs text-text-secondary">{p.reason}</div>
                  </td>
                  <td className="px-6 py-3 text-text-secondary">{p.phone}</td>
                  <td className="px-6 py-3 text-text-secondary">{p.arrivedAt}</td>
                  <td className="px-6 py-3">
                    <span className="rounded-full px-2.5 py-1 text-[11px]" style={{ backgroundColor: color + "22", color }}>
                      {p.waitMins} min
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex justify-end gap-1">
                      <button title="Done" className="grid h-8 w-8 place-items-center rounded-md border border-[#222] text-emerald transition hover:bg-emerald/10">
                        <Check className="h-3.5 w-3.5" />
                      </button>
                      <button title="Skip" className="grid h-8 w-8 place-items-center rounded-md border border-[#222] text-[#F59E0B] transition hover:bg-[#F59E0B]/10">
                        <SkipForward className="h-3.5 w-3.5" />
                      </button>
                      <button title="Reschedule" className="grid h-8 w-8 place-items-center rounded-md border border-[#222] text-[#3B82F6] transition hover:bg-[#3B82F6]/10">
                        <RefreshCw className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
