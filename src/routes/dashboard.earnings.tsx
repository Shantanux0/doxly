import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { IndianRupee, TrendingUp, Users, CreditCard, Download } from "lucide-react";
import { CountUp } from "@/components/doxly/Reveal";
import { earningsChart, earningsBreakdown, queuePatients } from "@/lib/api/dashboard-data";

export const Route = createFileRoute("/dashboard/earnings")({
  component: EarningsPage,
});

const ranges = ["Today", "This week", "This month", "This year"] as const;

function EarningsPage() {
  const [range, setRange] = useState<(typeof ranges)[number]>("This week");
  const total = earningsBreakdown.reduce((a, b) => a + b.value, 0);
  const max = Math.max(...earningsChart.map((d) => d.value));
  const transactions = queuePatients.filter((p) => p.amount);

  return (
    <div className="space-y-6">
      {/* Range toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-full border border-[#222] bg-[#111] p-1">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className="rounded-full px-4 py-1.5 text-xs transition"
              style={{
                backgroundColor: range === r ? "#52B788" : "transparent",
                color: range === r ? "#062014" : "#888",
              }}
            >
              {r}
            </button>
          ))}
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-[#222] bg-[#111] px-4 py-2 text-sm text-text-secondary transition hover:text-white">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        {[
          { k: "Total earnings", v: total, prefix: "₹", icon: IndianRupee, delta: "+18%" },
          { k: "Avg per patient", v: 580, prefix: "₹", icon: TrendingUp, delta: "+4%" },
          { k: "Patients seen", v: 82, icon: Users, delta: "+12" },
          { k: "Pending dues", v: 2400, prefix: "₹", icon: CreditCard, delta: "3 invoices" },
        ].map((s) => {
          const Ic = s.icon;
          return (
            <div key={s.k} className="rounded-2xl border border-[#222] bg-gradient-to-br from-[#141414] to-[#0F0F0F] p-6">
              <div className="flex items-center justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-[#222] bg-[#1A1A1A]">
                  <Ic className="h-4 w-4 text-emerald" />
                </div>
                <span className="text-xs text-emerald">{s.delta}</span>
              </div>
              <div className="mt-6 font-mono-dm text-3xl text-white">
                {s.prefix}<CountUp to={s.v} />
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-text-secondary">{s.k}</div>
            </div>
          );
        })}
      </div>

      {/* Chart + Breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-[#222] bg-[#111] p-6">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h3 className="font-display text-xl text-white">Earnings · {range}</h3>
              <p className="text-xs text-text-secondary">Daily breakdown in INR</p>
            </div>
          </div>
          <div className="flex h-64 items-end gap-4">
            {earningsChart.map((d, i) => (
              <div key={d.day} className="group flex flex-1 flex-col items-center gap-2">
                <div className="relative w-full">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-emerald-dark to-emerald transition-all"
                    style={{
                      height: `${(d.value / max) * 220}px`,
                      animation: `fade-in 0.5s ease ${0.1 + i * 0.06}s both`,
                    }}
                  />
                  <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-[#1A1A1A] px-2 py-0.5 text-[10px] font-mono-dm text-emerald opacity-0 transition group-hover:opacity-100">
                    ₹{d.value.toLocaleString("en-IN")}
                  </div>
                </div>
                <div className="text-[11px] text-text-secondary">{d.day}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#222] bg-[#111] p-6">
          <h3 className="font-display text-xl text-white">Breakdown</h3>
          <p className="mb-6 text-xs text-text-secondary">Where the money came from</p>
          <div className="space-y-4">
            {earningsBreakdown.map((b) => {
              const pct = Math.round((b.value / total) * 100);
              return (
                <div key={b.label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-white">{b.label}</span>
                    <span className="font-mono-dm text-text-secondary">₹{b.value.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#0F0F0F]">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${b.color}, ${b.color}cc)`,
                        animation: "fade-in 0.6s ease",
                      }}
                    />
                  </div>
                  <div className="mt-1 text-right text-[11px] text-text-secondary">{pct}%</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="rounded-2xl border border-[#222] bg-[#111]">
        <div className="border-b border-[#1A1A1A] px-6 py-4">
          <h3 className="font-display text-xl text-white">Recent transactions</h3>
          <p className="text-xs text-text-secondary">Today's collected payments</p>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-[#0F0F0F] text-xs uppercase tracking-wider text-text-secondary">
            <tr>
              <th className="px-6 py-3 text-left">Token</th>
              <th className="px-6 py-3 text-left">Patient</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">Time</th>
              <th className="px-6 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-t border-[#1A1A1A] hover:bg-[#161616]">
                <td className="px-6 py-3 font-mono-dm text-emerald">#{String(t.token).padStart(2, "0")}</td>
                <td className="px-6 py-3 text-white">{t.name}</td>
                <td className="px-6 py-3 text-text-secondary">Consultation</td>
                <td className="px-6 py-3 text-text-secondary">{t.arrivedAt}</td>
                <td className="px-6 py-3 text-right font-mono-dm text-white">₹{t.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
