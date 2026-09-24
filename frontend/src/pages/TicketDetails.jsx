import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTicket();
    loadHistory();
  }, [id]);

  const loadTicket = async () => {
    try {
      const response = await api.get(`/tickets/${id}`);
      setTicket(response.data);
    } catch (error) {
      console.error("Failed to load ticket:", error);
    }
  };

  const loadHistory = async () => {
    try {
      const response = await api.get(`/tickets/${id}/history`);
      setHistory(response.data);
    } catch (error) {
      console.error("Failed to load history:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-slate-500">Loading ticket...</p>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="p-8">
        <p className="text-red-600">Ticket not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="border-b bg-white">
        <div className="px-8 py-5">

          <button
            onClick={() => navigate("/tickets")}
            className="mb-4 text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            ← Back to Tickets
          </button>

          <h1 className="text-2xl font-bold text-slate-900">
            Ticket #{ticket.id}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Ticket details and activity history
          </p>

        </div>
      </div>

      <main className="grid gap-6 p-8 lg:grid-cols-3">

        {/* Ticket Details */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

          <h2 className="text-xl font-bold text-slate-900">
            {ticket.title}
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            {ticket.description}
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">

            <Info
              label="Category"
              value={ticket.category}
            />

            <Info
              label="Priority"
              value={ticket.priority}
            />

            <Info
              label="Status"
              value={ticket.status}
            />

            <Info
              label="Student"
              value={ticket.student?.name || "Unknown"}
            />

            <Info
              label="Assigned To"
              value={
                ticket.assignedTo?.name || "Unassigned"
              }
            />

            <Info
              label="Created At"
              value={
                ticket.createdAt
                  ? new Date(ticket.createdAt).toLocaleString()
                  : "-"
              }
            />

            <Info
              label="Due At"
              value={
                ticket.dueAt
                  ? new Date(ticket.dueAt).toLocaleString()
                  : "-"
              }
            />

          </div>

        </section>


        {/* History */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold text-slate-900">
            Activity History
          </h2>

          <div className="mt-6 space-y-5">

            {history.length === 0 ? (
              <p className="text-sm text-slate-500">
                No history available.
              </p>
            ) : (
              history.map((item) => (

                <div
                  key={item.id}
                  className="border-l-2 border-slate-200 pl-4"
                >

                  <p className="text-sm font-semibold text-slate-900">
                    {item.action}
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    {item.description}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    {new Date(
                      item.createdAt
                    ).toLocaleString()}
                  </p>

                </div>

              ))
            )}

          </div>

        </section>

      </main>

    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-800">
        {value}
      </p>
    </div>
  );
}

export default TicketDetails;