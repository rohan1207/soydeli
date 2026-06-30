import React, { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import { FiUsers, FiBox, FiDollarSign, FiClipboard } from "react-icons/fi";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await apiFetch("/api/admin/stats");
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (loading)
    return (
      <div className="text-sm text-gray-500 animate-pulse p-4">
        Loading dashboard...
      </div>
    );
  if (!stats) return null;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Sales"
          value={`₹${stats.sales.toFixed(2)}`}
          icon={<FiDollarSign />}
          accent="from-green-400 to-blue-500"
        />
        <StatCard
          label="Total Orders"
          value={stats.orders}
          icon={<FiClipboard />}
          accent="from-yellow-400 to-orange-500"
        />
        <StatCard
          label="Total Users"
          value={stats.users}
          icon={<FiUsers />}
          accent="from-purple-400 to-pink-500"
        />
        <StatCard
          label="Menu Items"
          value={stats.menuItems}
          icon={<FiBox />}
          accent="from-red-400 to-yellow-500"
        />
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, accent }) => (
  <div
    className={`relative overflow-hidden rounded-2xl p-6 text-white bg-gradient-to-br ${accent} shadow-lg`}
  >
    <div className="relative z-10">
      <div className="text-4xl mb-4">{icon}</div>
      <div className="text-3xl font-bold tracking-tight">{value}</div>
      <div className="mt-1 text-sm font-medium uppercase tracking-wider opacity-80">
        {label}
      </div>
    </div>
  </div>
);

export default Dashboard;
