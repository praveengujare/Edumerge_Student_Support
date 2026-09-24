import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateTicket() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "MEDIUM",
    studentId: "",
    assignedToId: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  const students = users.filter(
    (user) => user.role === "STUDENT"
  );

  const staff = users.filter(
    (user) =>
      user.role === "STAFF" ||
      user.role === "MANAGER"
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const ticket = {
        title: form.title,
        description: form.description,
        category: form.category,
        priority: form.priority,

        student: {
          id: Number(form.studentId)
        },

        assignedTo: form.assignedToId
          ? {
              id: Number(form.assignedToId)
            }
          : null
      };

      await api.post("/tickets", ticket);

      alert("Ticket created successfully!");

      navigate("/tickets");

    } catch (error) {
      console.error("Ticket creation failed:", error);

      alert(
        error.response?.data?.message ||
        "Failed to create ticket"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="border-b bg-white">
        <div className="px-8 py-5">

          <h1 className="text-2xl font-bold text-slate-900">
            Create Ticket
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create a new student support request
          </p>

        </div>
      </div>

      <main className="p-8">

        <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Title */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Ticket Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter ticket title"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
              />
            </div>


            {/* Description */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the student's issue..."
                rows="5"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
              />
            </div>


            {/* Category */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
              >

                <option value="">
                  Select category
                </option>

                <option value="Academic">
                  Academic
                </option>

                <option value="Fees">
                  Fees
                </option>

                <option value="Technical">
                  Technical
                </option>

                <option value="ID Card">
                  ID Card
                </option>

                <option value="Hostel">
                  Hostel
                </option>

                <option value="Transport">
                  Transport
                </option>

                <option value="Other">
                  Other
                </option>

              </select>
            </div>


            {/* Priority */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Priority
              </label>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
              >

                <option value="LOW">
                  Low
                </option>

                <option value="MEDIUM">
                  Medium
                </option>

                <option value="HIGH">
                  High
                </option>

                <option value="CRITICAL">
                  Critical
                </option>

              </select>
            </div>


            {/* Student Dropdown */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Student
              </label>

              <select
                name="studentId"
                value={form.studentId}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
              >

                <option value="">
                  Select student
                </option>

                {students.map((student) => (
                  <option
                    key={student.id}
                    value={student.id}
                  >
                    {student.name} — {student.email}
                  </option>
                ))}

              </select>
            </div>


            {/* Staff Dropdown */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Assign Staff
              </label>

              <select
                name="assignedToId"
                value={form.assignedToId}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
              >

                <option value="">
                  Unassigned
                </option>

                {staff.map((user) => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name} — {user.email}
                  </option>
                ))}

              </select>
            </div>


            {/* Buttons */}

            <div className="flex gap-3 pt-4">

              <button
                type="button"
                onClick={() => navigate("/tickets")}
                className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
              >
                {loading
                  ? "Creating..."
                  : "Create Ticket"}
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
}

export default CreateTicket;