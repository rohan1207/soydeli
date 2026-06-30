import React, { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import { FiUserPlus } from "react-icons/fi";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [assigningOrder, setAssigningOrder] = useState(null); // order object
  const [viewingOrder, setViewingOrder] = useState(null); // for details popup
  const [deliveryData, setDeliveryData] = useState({ all: [], free: [] });
  const [deliveryLoading, setDeliveryLoading] = useState(false);
  const [assignSubmitting, setAssignSubmitting] = useState(false);
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await apiFetch("/api/admin/orders");
        setOrders(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updated = await apiFetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        body: JSON.stringify({ orderStatus: newStatus }),
      });
      setOrders(orders.map((o) => (o._id === orderId ? updated : o)));
    } catch (err) {
      setError(err.message);
    }
  };

  const openAssignModal = async (order) => {
    setAssigningOrder(order);
    setSelectedDeliveryBoy(order.deliveryBoy?._id || "");
    setDeliveryLoading(true);
    try {
      const data = await apiFetch("/api/admin/delivery-boys/available");
      setDeliveryData(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setDeliveryLoading(false);
    }
  };

  const submitAssign = async (e) => {
    e.preventDefault();
    if (!assigningOrder) return;
    setAssignSubmitting(true);
    try {
      const body = selectedDeliveryBoy
        ? { deliveryBoyId: selectedDeliveryBoy }
        : {};
      const updated = await apiFetch(
        `/api/admin/orders/${assigningOrder._id}/assign`,
        {
          method: "POST",
          body: JSON.stringify(body),
        }
      );
      setOrders(orders.map((o) => (o._id === updated._id ? updated : o)));
      setAssigningOrder(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setAssignSubmitting(false);
    }
  };

  const closeModal = () => {
    setAssigningOrder(null);
    setSelectedDeliveryBoy("");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
      {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}
      {loading ? (
        <div className="text-sm text-gray-500 animate-pulse">
          Loading orders...
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-gray-500">
                      ...{order._id.slice(-6)}
                      <button
                        onClick={() => setViewingOrder(order)}
                        className="ml-2 inline-flex items-center text-[10px] font-semibold text-brand-600 hover:text-brand-500 underline decoration-dotted"
                        type="button"
                        title="View full order details"
                      >
                        View
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {order.user.name}
                      </div>
                      <div className="text-gray-500">{order.user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {order.shippingAddress ? (
                        <>
                          <div>{order.shippingAddress.street}</div>
                          <div>
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.state}{" "}
                            {order.shippingAddress.postalCode}
                          </div>
                          <div>{order.shippingAddress.phone}</div>
                        </>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">
                      ₹{order.totalPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={order.orderStatus} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-y-2">
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="p-2 border rounded-md bg-gray-100 dark:bg-gray-700 w-full"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      {!(
                        order.orderStatus === "Delivered" ||
                        order.orderStatus === "Cancelled"
                      ) && (
                        <>
                          <button
                            onClick={() => openAssignModal(order)}
                            className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-brand-600 text-white hover:bg-brand-500 w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                            type="button"
                            title="Assign delivery boy"
                          >
                            <FiUserPlus />
                            {order.deliveryBoy ? "Reassign" : "Assign"}
                          </button>
                          {order.deliveryBoy && (
                            <div className="text-[10px] text-gray-500 dark:text-gray-400 text-center">
                              {order.deliveryBoy.name}
                            </div>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {assigningOrder && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
              <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold">Assign Delivery Boy</h2>
                  <button
                    onClick={closeModal}
                    className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>
                <div className="max-h-[75vh] overflow-y-auto px-6 py-6 space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700 dark:text-gray-200 text-sm uppercase tracking-wide">
                      Order Details
                    </h3>
                    <InvoiceView order={assigningOrder} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-700 dark:text-gray-200 text-sm uppercase tracking-wide">
                      Select Delivery Boy
                    </h3>
                    {deliveryLoading ? (
                      <div className="text-xs text-gray-500">
                        Loading delivery boys...
                      </div>
                    ) : (
                      <form onSubmit={submitAssign} className="space-y-4">
                        <select
                          className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700"
                          value={selectedDeliveryBoy}
                          onChange={(e) =>
                            setSelectedDeliveryBoy(e.target.value)
                          }
                        >
                          <option value="">Auto Select (Balance)</option>
                          {deliveryData.all.map((db) => (
                            <option key={db._id} value={db._id}>
                              {db.name} — Active: {db.activeOrders}
                            </option>
                          ))}
                        </select>
                        <div className="flex items-center gap-3">
                          <button
                            disabled={assignSubmitting}
                            type="submit"
                            className="px-4 py-2 rounded-md bg-brand-600 hover:bg-brand-500 text-white text-sm disabled:opacity-60"
                          >
                            {assignSubmitting ? "Assigning..." : "Assign"}
                          </button>
                          <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 rounded-md border text-sm bg-gray-50 dark:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {viewingOrder && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
              <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    Order Details
                    <span className="font-mono text-xs text-gray-400">
                      {viewingOrder._id}
                    </span>
                  </h2>
                  <button
                    onClick={() => setViewingOrder(null)}
                    className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>
                <div className="max-h-[80vh] overflow-y-auto p-6 space-y-8 text-sm">
                  <DetailedOrderView order={viewingOrder} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const baseClasses =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  const statusClasses = {
    Pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300",
    Processing:
      "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300",
    Shipped:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-300",
    Delivered:
      "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300",
    Cancelled: "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300",
  };
  return (
    <span className={`${baseClasses} ${statusClasses[status] || ""}`}>
      {status}
    </span>
  );
};

export default Orders;

// ---------- Extra Components ----------
const InvoiceView = ({ order }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-xs space-y-3 bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-wrap gap-4 justify-between">
        <div>
          <div className="font-semibold text-gray-700 dark:text-gray-200">
            Order ID
          </div>
          <div className="font-mono text-[11px]">{order._id}</div>
        </div>
        <div>
          <div className="font-semibold text-gray-700 dark:text-gray-200">
            Date
          </div>
          <div>{new Date(order.createdAt).toLocaleString()}</div>
        </div>
        <div>
          <div className="font-semibold text-gray-700 dark:text-gray-200">
            Status
          </div>
          <StatusBadge status={order.orderStatus} />
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <div className="font-semibold text-gray-700 dark:text-gray-200">
            Customer
          </div>
          <div>{order.user?.name}</div>
          <div className="text-gray-500">{order.user?.email}</div>
        </div>
        <div className="space-y-1">
          <div className="font-semibold text-gray-700 dark:text-gray-200">
            Shipping
          </div>
          {order.shippingAddress && (
            <div className="text-gray-600 dark:text-gray-400 space-y-0.5">
              <div>{order.shippingAddress.street}</div>
              <div>
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.postalCode}
              </div>
              <div>{order.shippingAddress.phone}</div>
            </div>
          )}
        </div>
        <div className="space-y-1">
          <div className="font-semibold text-gray-700 dark:text-gray-200">
            Totals
          </div>
          <div>Total: ₹{order.totalPrice?.toFixed(2)}</div>
        </div>
      </div>
      <div>
        <div className="font-semibold text-gray-700 dark:text-gray-200 mb-1">
          Items
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded-md divide-y divide-gray-200 dark:divide-gray-700 overflow-hidden">
          {order.orderItems?.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between px-3 py-2 bg-white dark:bg-gray-800"
            >
              <div className="flex-1">
                <div className="font-medium text-gray-700 dark:text-gray-200 text-xs">
                  {item.name}
                </div>
                <div className="text-[10px] text-gray-500">
                  Qty: {item.quantity}
                </div>
              </div>
              <div className="text-xs font-semibold">
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
      {order.deliveryBoy && (
        <div className="pt-2 text-[11px] text-gray-500">
          Currently assigned to: {order.deliveryBoy.name}
        </div>
      )}
    </div>
  );
};

// More exhaustive view for the dedicated details popup
const DetailedOrderView = ({ order }) => {
  const shipping = order.shippingAddress || {};
  const items = order.orderItems || [];
  const subtotal = items.reduce(
    (sum, i) => sum + (i.price || 0) * (i.quantity || 0),
    0
  );
  // Additional fields if they exist (gracefully fallback)
  const extraFields = [
    { label: "Payment Method", value: order.paymentMethod },
    { label: "Payment Status", value: order.isPaid ? "Paid" : undefined },
    {
      label: "Paid At",
      value: order.paidAt && new Date(order.paidAt).toLocaleString(),
    },
    {
      label: "Delivered At",
      value: order.deliveredAt && new Date(order.deliveredAt).toLocaleString(),
    },
    { label: "Coupon", value: order.appliedCoupon?.code },
  ].filter((f) => f.value);

  return (
    <div className="space-y-8">
      <section className="grid md:grid-cols-3 gap-6 text-xs">
        <div className="space-y-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h4 className="uppercase tracking-wide font-semibold text-gray-700 dark:text-gray-200 text-[11px]">
            Meta
          </h4>
          <div className="space-y-1 font-mono break-all">
            <div>Order ID: {order._id}</div>
            <div>Date: {new Date(order.createdAt).toLocaleString()}</div>
            <div>
              Status:{" "}
              <span className="font-semibold">
                <StatusBadge status={order.orderStatus} />
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h4 className="uppercase tracking-wide font-semibold text-gray-700 dark:text-gray-200 text-[11px]">
            Customer
          </h4>
          <div className="space-y-1">
            <div className="font-medium">{order.user?.name}</div>
            <div className="text-gray-600 dark:text-gray-400 text-[11px]">
              {order.user?.email}
            </div>
            {shipping.phone && (
              <div className="text-gray-600 dark:text-gray-400 text-[11px]">
                {shipping.phone}
              </div>
            )}
          </div>
        </div>
        <div className="space-y-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h4 className="uppercase tracking-wide font-semibold text-gray-700 dark:text-gray-200 text-[11px]">
            Shipping Address
          </h4>
          {shipping ? (
            <div className="space-y-1 text-[11px] text-gray-700 dark:text-gray-300">
              {shipping.street && <div>{shipping.street}</div>}
              <div>
                {[shipping.city, shipping.state, shipping.postalCode]
                  .filter(Boolean)
                  .join(", ")}
              </div>
              {shipping.landmark && <div>Landmark: {shipping.landmark}</div>}
            </div>
          ) : (
            <div className="text-[11px] text-gray-500">N/A</div>
          )}
        </div>
      </section>

      {extraFields.length > 0 && (
        <section className="grid md:grid-cols-3 gap-4 text-[11px]">
          {extraFields.map((f) => (
            <div
              key={f.label}
              className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
            >
              <div className="font-semibold text-gray-600 dark:text-gray-300">
                {f.label}
              </div>
              <div className="mt-0.5 break-all">{f.value}</div>
            </div>
          ))}
        </section>
      )}

      <section className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-200">
          Items ({items.length})
        </h4>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <table className="min-w-full text-[11px]">
            <thead className="bg-gray-100 dark:bg-gray-700/40 text-gray-600 dark:text-gray-300">
              <tr>
                <th className="text-left px-3 py-2 font-medium">Name</th>
                <th className="text-right px-3 py-2 font-medium">Qty</th>
                <th className="text-right px-3 py-2 font-medium">Price</th>
                <th className="text-right px-3 py-2 font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {items.map((i, idx) => (
                <tr key={idx} className="bg-white dark:bg-gray-800">
                  <td className="px-3 py-2 font-medium text-gray-700 dark:text-gray-200">
                    {i.name}
                  </td>
                  <td className="px-3 py-2 text-right">{i.quantity}</td>
                  <td className="px-3 py-2 text-right">
                    ₹{(i.price || 0).toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-right font-semibold">
                    ₹{((i.price || 0) * (i.quantity || 0)).toFixed(2)}
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-3 py-4 text-center text-gray-500"
                  >
                    No items.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4 text-[11px]">
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 space-y-1">
          <div className="font-semibold text-gray-600 dark:text-gray-300">
            Subtotal
          </div>
          <div>₹{subtotal.toFixed(2)}</div>
        </div>
        {typeof order.totalPrice === "number" && (
          <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 space-y-1">
            <div className="font-semibold text-gray-600 dark:text-gray-300">
              Grand Total
            </div>
            <div className="text-base font-bold">
              ₹{order.totalPrice.toFixed(2)}
            </div>
          </div>
        )}
        {order.deliveryBoy && (
          <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 space-y-1">
            <div className="font-semibold text-gray-600 dark:text-gray-300">
              Assigned Delivery Boy
            </div>
            <div>{order.deliveryBoy.name}</div>
          </div>
        )}
      </section>
    </div>
  );
};
