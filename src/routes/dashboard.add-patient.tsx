import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, User, FileText, Check, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/add-patient")({
  component: AddPatientPage,
});

function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 10);
  if (d.length <= 5) return d;
  return `${d.slice(0, 5)} ${d.slice(5)}`;
}

function AddPatientPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"M" | "F">("M");
  const [reason, setReason] = useState("");
  const [checking, setChecking] = useState(false);
  const [returning, setReturning] = useState<null | boolean>(null);

  const phoneValid = phone.replace(/\D/g, "").length === 10;

  const checkPhone = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      const isReturning = Math.random() > 0.5;
      setReturning(isReturning);
      if (isReturning) {
        setName("Aarav Sharma");
        setAge("34");
        setGender("M");
      }
      setStep(2);
    }, 700);
  };

  const submit = () => {
    setStep(3);
    toast.success(`Added to queue · Token #10`);
    setTimeout(() => navigate({ to: "/dashboard/queue" }), 1400);
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Stepper */}
      <div className="mb-8 flex items-center justify-center gap-3">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-center gap-3">
            <div
              className="grid h-8 w-8 place-items-center rounded-full text-xs font-medium transition-all"
              style={{
                backgroundColor: step >= n ? "#52B788" : "#161616",
                color: step >= n ? "#062014" : "#888",
                border: step >= n ? "none" : "1px solid #222",
              }}
            >
              {step > n ? <Check className="h-4 w-4" /> : n}
            </div>
            {n < 3 && <div className="h-px w-16 bg-[#222]" />}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-[#222] bg-[#111] p-8">
        {step === 1 && (
          <div className="space-y-6" style={{ animation: "fade-in 0.35s ease" }}>
            <div>
              <h2 className="font-display text-3xl text-white">Patient phone number</h2>
              <p className="mt-1 text-sm text-text-secondary">We'll check if they've visited before.</p>
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-text-secondary">Phone</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono-dm text-text-secondary">+91</span>
                <input
                  autoFocus
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  placeholder="98765 43210"
                  className="h-14 w-full rounded-xl border border-[#222] bg-[#0F0F0F] pl-14 pr-12 text-lg text-white placeholder:text-text-muted outline-none focus:border-emerald font-mono-dm"
                />
                {checking && <Loader2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-emerald" />}
                {phoneValid && !checking && <Check className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald" />}
              </div>
            </div>
            <button
              disabled={!phoneValid || checking}
              onClick={checkPhone}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald px-6 py-3.5 text-sm font-medium text-[#062014] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5" style={{ animation: "fade-in 0.35s ease" }}>
            {returning && (
              <div className="rounded-lg border border-emerald/30 bg-emerald/10 px-4 py-3 text-sm text-emerald">
                Returning patient detected — details auto-filled.
              </div>
            )}
            <div>
              <h2 className="font-display text-3xl text-white">{returning ? "Confirm details" : "New patient details"}</h2>
              <p className="mt-1 text-sm text-text-secondary">+91 {phone}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider text-text-secondary">Full name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Patient name"
                    className="h-12 w-full rounded-lg border border-[#222] bg-[#0F0F0F] pl-9 pr-3 text-white placeholder:text-text-muted outline-none focus:border-emerald"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider text-text-secondary">Age</label>
                <input
                  value={age}
                  onChange={(e) => setAge(e.target.value.replace(/\D/g, ""))}
                  placeholder="32"
                  className="h-12 w-full rounded-lg border border-[#222] bg-[#0F0F0F] px-3 text-white placeholder:text-text-muted outline-none focus:border-emerald font-mono-dm"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-xs uppercase tracking-wider text-text-secondary">Gender</label>
                <div className="flex gap-2">
                  {(["M", "F"] as const).map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className="flex-1 rounded-lg border px-4 py-3 text-sm transition"
                      style={{
                        borderColor: gender === g ? "#52B788" : "#222",
                        backgroundColor: gender === g ? "rgba(82,183,136,0.1)" : "#0F0F0F",
                        color: gender === g ? "#52B788" : "#888",
                      }}
                    >
                      {g === "M" ? "Male" : "Female"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-xs uppercase tracking-wider text-text-secondary">Visit reason</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3.5 h-4 w-4 text-text-muted" />
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                    placeholder="e.g. Fever and body ache for 2 days"
                    className="w-full resize-none rounded-lg border border-[#222] bg-[#0F0F0F] py-3 pl-9 pr-3 text-white placeholder:text-text-muted outline-none focus:border-emerald"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep(1)}
                className="rounded-xl border border-[#222] px-5 py-3 text-sm text-text-secondary transition hover:text-white"
              >
                Back
              </button>
              <button
                onClick={submit}
                disabled={!name || !age || !reason}
                className="flex-1 rounded-xl bg-emerald px-5 py-3 text-sm font-medium text-[#062014] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Add to queue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5 py-8 text-center" style={{ animation: "fade-in 0.4s ease" }}>
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald/15">
              <Check className="h-8 w-8 text-emerald" />
            </div>
            <div>
              <h2 className="font-display text-3xl text-white">{name} added</h2>
              <p className="mt-1 text-sm text-text-secondary">Token <span className="font-mono-dm text-emerald">#10</span> · redirecting to queue…</p>
            </div>
          </div>
        )}
      </div>

      {step === 1 && (
        <div className="mt-8 grid grid-cols-3 gap-3 text-center">
          {[{ k: "Avg add time", v: "< 8s" }, { k: "Returning patients", v: "42%" }, { k: "SMS sent today", v: "24" }].map((s) => (
            <div key={s.k} className="rounded-xl border border-[#222] bg-[#111] p-4">
              <div className="font-mono-dm text-lg text-white">{s.v}</div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-text-secondary">{s.k}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
