import { NavLink } from "react-router-dom";

function Sidebar() {

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-slate-900 text-white"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-slate-200 bg-white lg:block">

      <div className="flex h-full flex-col">

        {/* Logo */}

        <div className="border-b border-slate-200 px-6 py-5">

          <h1 className="text-xl font-bold text-slate-900">
            EduSupport
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            Student Support System
          </p>

        </div>


        {/* Navigation */}

        <nav className="flex-1 space-y-2 p-4">

          <NavLink
            to="/dashboard"
            className={linkStyle}
          >
            <span>📊</span>
            Dashboard
          </NavLink>

          <NavLink
            to="/tickets"
            className={linkStyle}
          >
            <span>🎫</span>
            Tickets
          </NavLink>

          <NavLink
            to="/tickets/create"
            className={linkStyle}
          >
            <span>➕</span>
            Create Ticket
          </NavLink>

        </nav>


        {/* User */}

        <div className="border-t border-slate-200 p-4">

          <div className="rounded-lg bg-slate-50 p-3">

            <p className="text-sm font-semibold text-slate-900">
              Priya Staff
            </p>

            <p className="text-xs text-slate-500">
              Support Staff
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;