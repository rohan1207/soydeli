import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Corrected admin imports (removed mistaken './admin/' prefix)
import Login from "./pages/Login";
import Layout from "./Layout";
import RequireAuth from "./RequireAuth";
import Dashboard from "./pages/Dashboard";

// Lazy loaded pages
const ManageMenu = React.lazy(() => import("./pages/ManageMenu"));
const Orders = React.lazy(() => import("./pages/Orders"));

const App = () => (
  <Router>
    <Suspense
      fallback={<div className="p-6 text-sm text-gray-500">Loading...</div>}
    >
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Protected */}
        <Route
          path="/*"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manage-menu" element={<ManageMenu />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </Suspense>
  </Router>
);

export default App;
