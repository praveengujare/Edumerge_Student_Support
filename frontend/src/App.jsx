import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import CreateTicket from "./pages/CreateTicket";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TicketDetails from "./pages/TicketDetails";

function Layout({ children }) {
  return (
    <>
      <Sidebar />

      <main className="lg:ml-64">
        {children}
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default page */}
        <Route path="/" element={<Navigate to="/register" replace />} />

        {/* Authentication */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Application */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/tickets"
          element={
            <Layout>
              <Tickets />
            </Layout>
          }
        />

        <Route
          path="/tickets/create"
          element={
            <Layout>
              <CreateTicket />
            </Layout>
          }
        />
       <Route
  path="/tickets/:id"
  element={
    <Layout>
      <TicketDetails />
    </Layout>
  }
/> 

      </Routes>
    </BrowserRouter>
  );
}

export default App;