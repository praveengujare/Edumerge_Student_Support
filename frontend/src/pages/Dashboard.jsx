import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

  const [summary, setSummary] = useState({
    totalTickets: 0,
    openTickets: 0,
    inProgressTickets: 0,
    pendingTickets: 0,
    resolvedTickets: 0,
    closedTickets: 0,
    overdueTickets: 0
  });

  const [priority, setPriority] = useState({
    LOW: 0,
    MEDIUM: 0,
    HIGH: 0,
    CRITICAL: 0
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const summaryResponse =
        await api.get("/dashboard/summary");

      const priorityResponse =
        await api.get("/dashboard/priority");

      setSummary(summaryResponse.data);
      setPriority(priorityResponse.data);

    } catch (error) {
      console.error("Dashboard loading failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}

      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">

          <h1 className="text-2xl font-bold text-slate-900">
            Support Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Student Support & Ticket Management
          </p>

        </div>
      </header>


      {/* Main */}

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* Statistics */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Total Tickets"
            value={summary.totalTickets}
          />

          <StatCard
            title="Open"
            value={summary.openTickets}
          />

          <StatCard
            title="In Progress"
            value={summary.inProgressTickets}
          />

          <StatCard
            title="Pending"
            value={summary.pendingTickets}
          />

          <StatCard
            title="Resolved"
            value={summary.resolvedTickets}
          />

          <StatCard
            title="Closed"
            value={summary.closedTickets}
          />

          <StatCard
            title="Overdue"
            value={summary.overdueTickets}
            danger
          />

        </div>


        {/* Priority */}

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6">

            <h2 className="text-lg font-semibold text-slate-900">
              Priority Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Tickets grouped by priority
            </p>

          </div>


          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <PriorityCard
              title="Critical"
              value={priority.CRITICAL}
              badge="CRITICAL"
            />

            <PriorityCard
              title="High"
              value={priority.HIGH}
              badge="HIGH"
            />

            <PriorityCard
              title="Medium"
              value={priority.MEDIUM}
              badge="MEDIUM"
            />

            <PriorityCard
              title="Low"
              value={priority.LOW}
              badge="LOW"
            />

          </div>

        </section>

      </main>

    </div>
  );
}


/* Statistic Card */

function StatCard({ title, value, danger = false }) {

  return (
    <div
      className={`rounded-2xl border bg-white p-5 shadow-sm ${
        danger
          ? "border-red-200"
          : "border-slate-200"
      }`}
    >

      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <p
        className={`mt-3 text-3xl font-bold ${
          danger
            ? "text-red-600"
            : "text-slate-900"
        }`}
      >
        {value}
      </p>

    </div>
  );
}


/* Priority Card */

function PriorityCard({ title, value, badge }) {

  const badgeStyles = {

    CRITICAL:
      "bg-red-50 text-red-700 ring-red-600/20",

    HIGH:
      "bg-orange-50 text-orange-700 ring-orange-600/20",

    MEDIUM:
      "bg-yellow-50 text-yellow-700 ring-yellow-600/20",

    LOW:
      "bg-green-50 text-green-700 ring-green-600/20",

  };

  return (
    <div className="rounded-xl border border-slate-200 p-5">

      <div className="flex items-center justify-between">

        <span className="text-sm font-medium text-slate-600">
          {title}
        </span>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${badgeStyles[badge]}`}
        >
          {badge}
        </span>

      </div>

      <p className="mt-4 text-3xl font-bold text-slate-900">
        {value}
      </p>

    </div>
  );
}

export default Dashboard;