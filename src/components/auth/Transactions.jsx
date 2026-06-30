import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { API_BASE_URL } from "../../config.js";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, token } = useContext(AuthContext);
  const API_URL = `${API_BASE_URL}/api`;

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      if (!user || !token) return;
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(`${API_URL}/orders/myorders`, config);
        const formattedTransactions = data.map((order) => ({
          id: order._id,
          date: new Date(order.createdAt).toLocaleDateString(),
          description: `Order #${order._id.substring(0, 7)}...`,
          amount: -order.totalPrice,
          status: order.isPaid ? "Completed" : "Pending",
        }));
        setTransactions(formattedTransactions);
      } catch (err) {
        setError("Failed to fetch transactions. Please try again later.");
        console.error("Failed to fetch transactions", err);
      }
      setLoading(false);
    };

    fetchTransactions();
  }, [user, token]);

  const getStatusChipClass = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Transaction History
      </h2>
      {loading && <p>Loading transactions...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
        <div
          className="overflow-x-auto scrollbar-thin scrollbar-thumb-soydeli-lime scrollbar-track-transparent md:overflow-visible"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <table className="min-w-[680px] md:min-w-full leading-normal">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="px-5 py-3">Transaction ID</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Description</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-5 py-5 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap font-semibold">
                      {transaction.id}
                    </p>
                  </td>
                  <td className="px-5 py-5 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {transaction.date}
                    </p>
                  </td>
                  <td className="px-5 py-5 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {transaction.description}
                    </p>
                  </td>
                  <td className="px-5 py-5 text-sm">
                    <p
                      className={`whitespace-no-wrap ${
                        transaction.amount < 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {transaction.amount < 0 ? "-" : "+"}₹
                      {Math.abs(transaction.amount).toFixed(2)}
                    </p>
                  </td>
                  <td className="px-5 py-5 text-sm">
                    <span
                      className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full ${getStatusChipClass(
                        transaction.status
                      )}`}
                    >
                      <span
                        aria-hidden
                        className="absolute inset-0 opacity-50 rounded-full"
                      ></span>
                      <span className="relative">{transaction.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white to-transparent md:hidden" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white to-transparent md:hidden" />
      </div>
    </div>
  );
};

export default Transactions;
