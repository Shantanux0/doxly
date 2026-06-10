export type PatientStatus = "waiting" | "current" | "done" | "skipped" | "rescheduled";

export type QueuePatient = {
  id: string;
  token: number;
  name: string;
  phone: string;
  age: number;
  gender: "M" | "F";
  reason: string;
  arrivedAt: string; // "10:24 AM"
  waitMins: number;
  status: PatientStatus;
  amount?: number;
};

export const queuePatients: QueuePatient[] = [
  { id: "p1", token: 4, name: "Aarav Sharma", phone: "+91 98201 22341", age: 34, gender: "M", reason: "Fever & headache", arrivedAt: "10:24 AM", waitMins: 12, status: "current" },
  { id: "p2", token: 5, name: "Diya Mehta", phone: "+91 99876 50001", age: 27, gender: "F", reason: "Follow-up: thyroid", arrivedAt: "10:31 AM", waitMins: 18, status: "waiting" },
  { id: "p3", token: 6, name: "Rohan Kapoor", phone: "+91 90043 71122", age: 41, gender: "M", reason: "Back pain", arrivedAt: "10:38 AM", waitMins: 22, status: "waiting" },
  { id: "p4", token: 7, name: "Ishaan Verma", phone: "+91 98989 11223", age: 9, gender: "M", reason: "Vaccination", arrivedAt: "10:46 AM", waitMins: 28, status: "waiting" },
  { id: "p5", token: 8, name: "Sara Khan", phone: "+91 97455 88991", age: 52, gender: "F", reason: "BP check", arrivedAt: "10:54 AM", waitMins: 33, status: "waiting" },
  { id: "p6", token: 9, name: "Nikhil Joshi", phone: "+91 91234 00091", age: 30, gender: "M", reason: "Cold & cough", arrivedAt: "11:02 AM", waitMins: 9, status: "waiting" },
  { id: "p7", token: 3, name: "Riya Nair", phone: "+91 90021 73310", age: 38, gender: "F", reason: "Allergy", arrivedAt: "10:09 AM", waitMins: 0, status: "done", amount: 600 },
  { id: "p8", token: 2, name: "Aditya Singh", phone: "+91 98123 44556", age: 45, gender: "M", reason: "Diabetes review", arrivedAt: "09:57 AM", waitMins: 0, status: "done", amount: 800 },
  { id: "p9", token: 1, name: "Meera Iyer", phone: "+91 99888 12121", age: 60, gender: "F", reason: "Knee pain", arrivedAt: "09:42 AM", waitMins: 0, status: "done", amount: 700 },
];

export type ActivityItem = {
  id: string;
  type: "done" | "added" | "skipped" | "rescheduled" | "payment";
  text: string;
  time: string;
};

export const activityFeed: ActivityItem[] = [
  { id: "a1", type: "payment", text: "₹500 added for consultation (Token #03)", time: "1m ago" },
  { id: "a2", type: "done", text: "Patient Riya Nair marked done", time: "4m ago" },
  { id: "a3", type: "rescheduled", text: "Patient #07 rescheduled to #12", time: "9m ago" },
  { id: "a4", type: "skipped", text: "Patient #09 skipped", time: "14m ago" },
  { id: "a5", type: "added", text: "New patient added: Nikhil Joshi (#09)", time: "18m ago" },
  { id: "a6", type: "done", text: "Patient Aditya Singh marked done", time: "26m ago" },
  { id: "a7", type: "payment", text: "₹800 added for consultation (Token #02)", time: "27m ago" },
];

export type PatientRecord = {
  id: string;
  name: string;
  phone: string;
  age: number;
  gender: "M" | "F";
  lastVisit: string;
  totalVisits: number;
  totalPaid: number;
  tags: string[];
};

export const allPatients: PatientRecord[] = [
  { id: "r1", name: "Aarav Sharma", phone: "+91 98201 22341", age: 34, gender: "M", lastVisit: "Today", totalVisits: 4, totalPaid: 2400, tags: ["Regular"] },
  { id: "r2", name: "Diya Mehta", phone: "+91 99876 50001", age: 27, gender: "F", lastVisit: "Today", totalVisits: 7, totalPaid: 4900, tags: ["Thyroid"] },
  { id: "r3", name: "Meera Iyer", phone: "+91 99888 12121", age: 60, gender: "F", lastVisit: "Today", totalVisits: 12, totalPaid: 8400, tags: ["Senior"] },
  { id: "r4", name: "Aditya Singh", phone: "+91 98123 44556", age: 45, gender: "M", lastVisit: "Today", totalVisits: 9, totalPaid: 7200, tags: ["Diabetes"] },
  { id: "r5", name: "Rohan Kapoor", phone: "+91 90043 71122", age: 41, gender: "M", lastVisit: "Today", totalVisits: 2, totalPaid: 1200, tags: ["New"] },
  { id: "r6", name: "Sara Khan", phone: "+91 97455 88991", age: 52, gender: "F", lastVisit: "Today", totalVisits: 5, totalPaid: 3500, tags: ["BP"] },
  { id: "r7", name: "Nikhil Joshi", phone: "+91 91234 00091", age: 30, gender: "M", lastVisit: "Today", totalVisits: 1, totalPaid: 500, tags: ["New"] },
  { id: "r8", name: "Ishaan Verma", phone: "+91 98989 11223", age: 9, gender: "M", lastVisit: "Today", totalVisits: 3, totalPaid: 900, tags: ["Pediatric"] },
  { id: "r9", name: "Riya Nair", phone: "+91 90021 73310", age: 38, gender: "F", lastVisit: "Today", totalVisits: 6, totalPaid: 3800, tags: ["Allergy"] },
  { id: "r10", name: "Karan Bhatia", phone: "+91 98700 41122", age: 29, gender: "M", lastVisit: "Yesterday", totalVisits: 2, totalPaid: 1100, tags: [] },
  { id: "r11", name: "Anaya Reddy", phone: "+91 99109 22231", age: 35, gender: "F", lastVisit: "2 days ago", totalVisits: 8, totalPaid: 5600, tags: ["Regular"] },
  { id: "r12", name: "Vikram Pillai", phone: "+91 98430 88776", age: 50, gender: "M", lastVisit: "3 days ago", totalVisits: 14, totalPaid: 9800, tags: ["Cardiac"] },
];

export const earningsChart = [
  { day: "Mon", value: 4200 },
  { day: "Tue", value: 5100 },
  { day: "Wed", value: 3800 },
  { day: "Thu", value: 6200 },
  { day: "Fri", value: 7400 },
  { day: "Sat", value: 8800 },
  { day: "Sun", value: 5400 },
];

export const earningsBreakdown = [
  { label: "Consultation", value: 28400, color: "#52B788" },
  { label: "Procedures", value: 12800, color: "#2D6A4F" },
  { label: "Follow-ups", value: 6200, color: "#74C69D" },
];
