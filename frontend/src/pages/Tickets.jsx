import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const response = await api.get("/tickets");
      setTickets(response.data);
    } catch (error) {
      console.error("Failed to load tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (ticketId, status) => {
    try {
      setUpdatingId(ticketId);

      await api.put(
        `/tickets/${ticketId}/status?status=${status}`
      );

      await loadTickets();

    } catch (error) {
      console.error("Status update failed:", error);

      alert(
        error.response?.data?.message ||
        "Failed to update status"
      );

    } finally {
      setUpdatingId(null);
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "CRITICAL":
        return "bg-red-50 text-red-700";

      case "HIGH":
        return "bg-orange-50 text-orange-700";

      case "MEDIUM":
        return "bg-yellow-50 text-yellow-700";

      case "LOW":
        return "bg-green-50 text-green-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-blue-50 text-blue-700";

      case "IN_PROGRESS":
        return "bg-purple-50 text-purple-700";

      case "PENDING":
        return "bg-yellow-50 text-yellow-700";

      case "RESOLVED":
        return "bg-green-50 text-green-700";

      case "CLOSED":
        return "bg-slate-100 text-slate-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <p className="text-slate-500">
          Loading tickets...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}

      <div className="border-b bg-white">

        <div className="flex items-center justify-between px-8 py-5">

          <div>

            <h1 className="text-2xl font-bold text-slate-900">
              Tickets
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage student support requests
            </p>

          </div>

          <button
            onClick={() => navigate("/tickets/create")}
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            + Create Ticket
          </button>

        </div>

      </div>


      {/* Tickets Table */}

      <main className="p-8">

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              {/* Table Header */}

              <thead className="border-b bg-slate-50">

                <tr>

                  <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                    ID
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                    Ticket
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                    Category
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                    Priority
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                    Assigned To
                  </th>

                </tr>

              </thead>


              {/* Table Body */}

              <tbody className="divide-y divide-slate-100">

                {tickets.length === 0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="px-6 py-10 text-center text-sm text-slate-500"
                    >
                      No tickets found.
                    </td>

                  </tr>

                ) : (

                  tickets.map((ticket) => (

                    <tr
                      key={ticket.id}
                      className="hover:bg-slate-50"
                    >

                      {/* ID */}

                      <td className="px-6 py-4 text-sm font-medium text-slate-700">

                        #{ticket.id}

                      </td>


                      {/* Ticket */}

                      <td className="px-6 py-4">

                        <p
                          onClick={() =>
                            navigate(`/tickets/${ticket.id}`)
                          }
                          className="cursor-pointer font-semibold text-slate-900 hover:text-blue-600 hover:underline"
                        >
                          {ticket.title}
                        </p>

                        <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
                          {ticket.description}
                        </p>

                      </td>


                      {/* Category */}

                      <td className="px-6 py-4 text-sm text-slate-600">

                        {ticket.category}

                      </td>


                      {/* Priority */}

                      <td className="px-6 py-4">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityStyle(
                            ticket.priority
                          )}`}
                        >
                          {ticket.priority}
                        </span>

                      </td>


                      {/* Status */}

                      <td className="px-6 py-4">

                        <select
                          value={ticket.status}
                          disabled={
                            updatingId === ticket.id
                          }
                          onChange={(e) =>
                            updateStatus(
                              ticket.id,
                              e.target.value
                            )
                          }
                          className={`rounded-full border-0 px-3 py-2 text-xs font-semibold outline-none ${getStatusStyle(
                            ticket.status
                          )}`}
                        >

                          <option value="OPEN">
                            OPEN
                          </option>

                          <option value="IN_PROGRESS">
                            IN PROGRESS
                          </option>

                          <option value="PENDING">
                            PENDING
                          </option>

                          <option value="RESOLVED">
                            RESOLVED
                          </option>

                          <option value="CLOSED">
                            CLOSED
                          </option>

                        </select>

                      </td>


                      {/* Assigned Staff */}

                      <td className="px-6 py-4">

                        <p className="text-sm font-medium text-slate-700">

                          {ticket.assignedTo?.name ||
                            "Unassigned"}

                        </p>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Tickets;