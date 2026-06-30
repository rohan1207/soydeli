import React, { useState, useEffect, useContext, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Swal from "sweetalert2";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { API_BASE_URL } from "../../config.js";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, token } = useContext(AuthContext);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [trackingData, setTrackingData] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState(null);
  const [trackingIntervalId, setTrackingIntervalId] = useState(null); // fallback polling
  const [breadcrumb, setBreadcrumb] = useState([]); // historical positions
  const prevStatusRef = useRef(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const routeFetchRef = useRef({ last: null });

  // Enhanced custom icons (bike + home pin)
  const riderIcon = L.divIcon({
    className: "rider-icon",
    html: `
      <div class="rider-wrapper -mt-5 -ml-5" id="rider-marker-inner">
        <svg viewBox='0 0 64 64' class='rider-svg'>
          <defs>
            <linearGradient id='rg' x1='0%' y1='0%' x2='100%' y2='100%'>
              <stop offset='0%' stop-color='#ff4d4d'/>
              <stop offset='100%' stop-color='#c80000'/>
            </linearGradient>
          </defs>
          <circle cx='32' cy='32' r='30' fill='url(#rg)' stroke='white' stroke-width='4'/>
          <path d='M25 40l2-8h-3l1-4h6l1-4h-4l1-4h8l-3 12h5l3 4h-9l-1 4h-7z' fill='white' opacity='.95'/>
          <path d='M14 46a6 6 0 1112 0 6 6 0 01-12 0zm24 0a6 6 0 1112 0 6 6 0 01-12 0z' fill='white' opacity='.9'/>
        </svg>
        <div class='pulse-ring'></div>
      </div>`,
  });

  const homeIcon = L.divIcon({
    className: "dest-icon",
    html: `
      <div class='dest-wrapper -mt-6 -ml-5'>
        <svg viewBox='0 0 64 64' class='dest-svg'>
          <defs>
            <linearGradient id='hg' x1='0%' y1='0%' x2='100%' y2='100%'>
              <stop offset='0%' stop-color='#111827'/>
              <stop offset='100%' stop-color='#374151'/>
            </linearGradient>
          </defs>
          <path d='M32 2L4 26h6v28h16V38h12v16h16V26h6L32 2z' fill='url(#hg)' stroke='white' stroke-width='3' stroke-linejoin='round'/>
          <circle cx='32' cy='54' r='8' fill='#fff'/>
          <path d='M32 48a6 6 0 100 12 6 6 0 000-12z' fill='#111827'/>
        </svg>
        <div class='label-bubble'>Home</div>
      </div>`,
  });

  // Inject minimal CSS once
  useEffect(() => {
    if (document.getElementById("tracking-icons-css")) return;
    const style = document.createElement("style");
    style.id = "tracking-icons-css";
    style.textContent = `
      .rider-wrapper { position: relative; width:40px; height:40px; }
      .rider-svg { width:40px; height:40px; filter: drop-shadow(0 2px 4px rgba(0,0,0,.35)); border-radius:50%; }
      .pulse-ring { position:absolute; inset:0; border:4px solid rgba(255,77,77,0.35); border-radius:50%; animation:pulse 2.4s infinite; }
      @keyframes pulse { 0% { transform:scale(.7); opacity:.9;} 70% { transform:scale(1.4); opacity:0;} 100% { opacity:0; transform:scale(1.6);} }
      .dest-wrapper { position:relative; width:46px; height:46px; }
      .dest-svg { width:46px; height:46px; filter: drop-shadow(0 2px 4px rgba(0,0,0,.4)); }
      .label-bubble { position:absolute; top:-20px; left:50%; transform:translateX(-50%); background:#111827; color:#fff; font-size:10px; padding:2px 6px; border-radius:12px; white-space:nowrap; box-shadow:0 2px 4px rgba(0,0,0,.3); }
    `;
    document.head.appendChild(style);
  }, []);

  // Animated marker component
  const AnimatedMarker = ({ position }) => {
    const map = useMap();
    const markerRef = useRef(null);
    const lastPosRef = useRef(position);
    useEffect(() => {
      if (!markerRef.current) return;
      const start = lastPosRef.current;
      const end = position;
      if (!start || !end) return;
      if (start[0] === end[0] && start[1] === end[1]) return;
      const duration = 1200;
      const startTime = performance.now();
      function animate(now) {
        const t = Math.min(1, (now - startTime) / duration);
        const lat = start[0] + (end[0] - start[0]) * t;
        const lng = start[1] + (end[1] - start[1]) * t;
        markerRef.current.setLatLng([lat, lng]);
        // rotate inner based on heading
        const dx = end[1] - start[1];
        const dy = end[0] - start[0];
        const angle = (Math.atan2(dx, dy) * 180) / Math.PI; // approximate
        const el = markerRef.current
          .getElement()
          ?.querySelector("#rider-marker-inner");
        if (el) el.style.transform = `rotate(${angle}deg)`;
        if (t < 1) requestAnimationFrame(animate);
        else lastPosRef.current = end;
      }
      requestAnimationFrame(animate);
    }, [position]);
    return <Marker ref={markerRef} position={position} icon={riderIcon} />;
  };
  const sseRef = useRef(null);
  const API_URL = `${API_BASE_URL}/api`;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(`${API_URL}/orders/myorders`, config);
        setOrders(data);
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
        console.error("Failed to fetch orders", err);
      }
      setLoading(false);
    };

    if (user) {
      fetchOrders();
    }
  }, [user, token]);

  const getStatusChipClass = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const viewOrderDetails = (order) => {
    const itemsHtml = order.orderItems
      .map(
        (item) =>
          `<li style="margin-bottom: 5px;"><strong>${item.name}</strong> - ${
            item.quantity
          } x ₹${item.price.toFixed(2)}</li>`
      )
      .join("");

    Swal.fire({
      title: `Order Details - ${order._id}`,
      html: `
        <div style="text-align: left;">
          <p><strong>Date:</strong> ${new Date(
            order.createdAt
          ).toLocaleDateString()}</p>
          <p><strong>Status:</strong> ${order.orderStatus}</p>
          <p><strong>Total:</strong> ₹${order.totalPrice.toFixed(2)}</p>
          <hr style="margin: 10px 0;" />
          <p><strong>Shipping Address:</strong></p>
          <p>${order.shippingAddress.street}, ${order.shippingAddress.city}, ${
        order.shippingAddress.state
      } - ${order.shippingAddress.postalCode}</p>
          <p><strong>Phone:</strong> ${order.shippingAddress.phone}</p>
          <hr style="margin: 10px 0;" />
          <p><strong>Items:</strong></p>
          <ul style="list-style-type: none; padding-left: 10px;">${itemsHtml}</ul>
        </div>
      `,
      icon: "info",
      confirmButtonText: "Close",
      confirmButtonColor: "#d33",
    });
  };

  const openTracking = async (order) => {
    setTrackingOrder(order);
    setTrackingData(null);
    setTrackingError(null);
    setTrackingLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get(
        `${API_URL}/orders/${order._id}/tracking`,
        config
      );
      setTrackingData(data);
      // Establish SSE stream for realtime updates
      if (sseRef.current) {
        sseRef.current.close();
      }
      const es = new EventSource(
        `${API_URL}/orders/${order._id}/stream?token=${token}`
      );
      sseRef.current = es;
      es.onmessage = (evt) => {
        try {
          const payload = JSON.parse(evt.data);
          setTrackingData((prev) => {
            // Append breadcrumb if location changed
            if (
              payload?.deliveryLocation?.lat != null &&
              payload?.deliveryLocation?.lng != null
            ) {
              setBreadcrumb((bc) => {
                const last = bc[bc.length - 1];
                if (
                  !last ||
                  last.lat !== payload.deliveryLocation.lat ||
                  last.lng !== payload.deliveryLocation.lng
                ) {
                  return [
                    ...bc.slice(-49),
                    {
                      lat: payload.deliveryLocation.lat,
                      lng: payload.deliveryLocation.lng,
                    },
                  ];
                }
                return bc;
              });
              // Route fetch: throttle (only if shipped + moved >100m or no route yet)
              if (payload.status?.toLowerCase() === "shipped") {
                const dest = prev?.destination || payload.destination;
                if (dest?.lat != null && dest?.lng != null) {
                  const lastFetch = routeFetchRef.current.last;
                  const prevPoint = lastFetch?.point;
                  const moved = !prevPoint
                    ? Infinity
                    : computeDistanceKmClientRaw(
                        prevPoint.lat,
                        prevPoint.lng,
                        payload.deliveryLocation.lat,
                        payload.deliveryLocation.lng
                      ) * 1000;
                  if (
                    !lastFetch ||
                    Date.now() - lastFetch.time > 30000 ||
                    moved > 100
                  ) {
                    fetchRoute(payload.deliveryLocation, dest);
                  }
                }
              }
            }
            // Toast on status change
            if (
              prev &&
              prev.status &&
              payload.status &&
              prev.status !== payload.status
            ) {
              showStatusToast(payload.status);
            }
            return { ...prev, ...payload };
          });
        } catch (_) {}
      };
      es.onerror = () => {
        // fallback to polling if SSE fails
        if (sseRef.current) {
          sseRef.current.close();
          sseRef.current = null;
        }
        const id = setInterval(async () => {
          try {
            const { data: updated } = await axios.get(
              `${API_URL}/orders/${order._id}/tracking`,
              config
            );
            setTrackingData(updated);
          } catch (e) {}
        }, 15000);
        setTrackingIntervalId(id);
      };
    } catch (e) {
      setTrackingError("Failed to load tracking info");
    }
    setTrackingLoading(false);
  };

  const closeTracking = () => {
    if (trackingIntervalId) clearInterval(trackingIntervalId);
    setTrackingIntervalId(null);
    if (sseRef.current) {
      sseRef.current.close();
      sseRef.current = null;
    }
    setTrackingOrder(null);
    setTrackingData(null);
    setTrackingError(null);
    setBreadcrumb([]);
  };

  // Simple toast system
  const showStatusToast = (status) => {
    const id = `toast-${Date.now()}`;
    const el = document.createElement("div");
    el.id = id;
    el.className =
      "fixed top-4 right-4 bg-gray-900 text-white text-sm px-4 py-2 rounded shadow-lg animate-fade-in-down z-[9999]";
    el.textContent = `Order status updated: ${status}`;
    document.body.appendChild(el);
    setTimeout(() => {
      el.classList.add("opacity-0", "translate-y-2");
    }, 3200);
    setTimeout(() => {
      el.remove();
    }, 3800);
  };

  // Distance + dynamic ETA decay (recompute locally each minute if we have last snapshot)
  useEffect(() => {
    let interval;
    if (
      trackingData?.deliveryLocation?.lat != null &&
      trackingData?.destination?.lat != null
    ) {
      interval = setInterval(() => {
        setTrackingData((d) => ({ ...d })); // trigger re-render for ETA countdown
      }, 60000);
    }
    return () => interval && clearInterval(interval);
  }, [trackingData?.deliveryLocation?.lat, trackingData?.destination?.lat]);

  const computeDistanceKmClient = () => {
    const dl = trackingData?.deliveryLocation;
    const dest = trackingData?.destination;
    if (!dl || !dest || dl.lat == null || dest.lat == null) return null;
    const toRad = (d) => (d * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(dest.lat - dl.lat);
    const dLon = toRad(dest.lng - dl.lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(dl.lat)) *
        Math.cos(toRad(dest.lat)) *
        Math.sin(dLon / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  const computeDistanceKmClientRaw = (lat1, lng1, lat2, lng2) => {
    const toRad = (d) => (d * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  const fetchRoute = async (from, to) => {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`;
      const res = await fetch(url);
      const json = await res.json();
      const coords = json?.routes?.[0]?.geometry?.coordinates || [];
      setRouteCoords(coords.map((c) => [c[1], c[0]]));
      routeFetchRef.current.last = { time: Date.now(), point: from };
    } catch (e) {
      /* ignore */
    }
  };

  const formatDistance = (km) =>
    km == null
      ? "-"
      : km < 1
      ? `${(km * 1000).toFixed(0)} m`
      : `${km.toFixed(1)} km`;

  const statusSteps = ["Pending", "Processing", "Shipped", "Delivered"];

  const renderStatusTimeline = () => (
    <ol className="flex items-center text-xs gap-2 flex-wrap">
      {statusSteps.map((step) => {
        const active =
          trackingData?.status &&
          statusSteps.indexOf(step) <= statusSteps.indexOf(trackingData.status);
        return (
          <li key={step} className="flex items-center gap-1">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                active ? "bg-soydeli-gold" : "bg-gray-300"
              }`}
            ></span>
            <span
              className={
                active ? "font-semibold text-soydeli-forest" : "text-gray-400"
              }
            >
              {step}
            </span>
            {step !== statusSteps[statusSteps.length - 1] && (
              <span className="w-6 h-px bg-gray-300"></span>
            )}
          </li>
        );
      })}
    </ol>
  );

  const renderTrackingModal = () => {
    if (!trackingOrder) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg relative">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold text-lg">
              Tracking Order #{trackingOrder._id}
            </h3>
            <button
              onClick={closeTracking}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
            {trackingLoading && <p>Loading tracking data...</p>}
            {trackingError && (
              <p className="text-red-500 text-sm">{trackingError}</p>
            )}
            {trackingData && (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 items-center text-sm">
                  <span className="font-medium">Status:</span>
                  <span className="px-2 py-1 rounded bg-soydeli-cream-green text-soydeli-forest text-xs font-semibold">
                    {trackingData.status}
                  </span>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Delivery Partner:</p>
                  {trackingData.deliveryBoy ? (
                    <p>
                      {trackingData.deliveryBoy.name} (
                      {trackingData.deliveryBoy.phone})
                    </p>
                  ) : (
                    <p className="text-gray-500">
                      Not assigned yet. Your order is being prepared.
                    </p>
                  )}
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Destination:</p>
                  {trackingData.destination &&
                  trackingData.destination.lat &&
                  trackingData.destination.lng ? (
                    <p>
                      Lat: {trackingData.destination.lat}, Lng:{" "}
                      {trackingData.destination.lng}
                    </p>
                  ) : (
                    <p className="text-gray-500">Coordinates not available</p>
                  )}
                </div>
                <div className="space-y-3">
                  {renderStatusTimeline()}
                  <div className="flex items-center gap-4 text-xs">
                    {trackingData.etaMinutes != null && (
                      <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-semibold">
                        ETA {trackingData.etaMinutes} min
                      </span>
                    )}
                    <span className="text-gray-500">
                      Distance {formatDistance(computeDistanceKmClient())}
                    </span>
                    {trackingData.deliveryLocation?.updatedAt && (
                      <span className="text-gray-500">
                        Updated{" "}
                        {new Date(
                          trackingData.deliveryLocation.updatedAt
                        ).toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                  <div className="h-64 w-full rounded overflow-hidden border relative">
                    {trackingData.destination?.lat &&
                    trackingData.destination?.lng ? (
                      <MapContainer
                        center={[
                          trackingData.destination.lat,
                          trackingData.destination.lng,
                        ]}
                        zoom={14}
                        style={{ height: "100%", width: "100%" }}
                        whenCreated={(map) => {
                          /* fit later when we have both points */ setTimeout(
                            () => {
                              if (trackingData.deliveryLocation?.lat != null) {
                                try {
                                  map.fitBounds(
                                    [
                                      [
                                        trackingData.destination.lat,
                                        trackingData.destination.lng,
                                      ],
                                      [
                                        trackingData.deliveryLocation.lat,
                                        trackingData.deliveryLocation.lng,
                                      ],
                                    ],
                                    { padding: [30, 30] }
                                  );
                                } catch (_) {}
                              }
                            },
                            200
                          );
                        }}
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker
                          position={[
                            trackingData.destination.lat,
                            trackingData.destination.lng,
                          ]}
                          icon={homeIcon}
                        />
                        {trackingData.deliveryLocation?.lat != null &&
                        trackingData.deliveryLocation?.lng != null ? (
                          <>
                            <AnimatedMarker
                              position={[
                                trackingData.deliveryLocation.lat,
                                trackingData.deliveryLocation.lng,
                              ]}
                            />
                            {trackingData.deliveryLocation.lat !==
                              trackingData.destination.lat ||
                            trackingData.deliveryLocation.lng !==
                              trackingData.destination.lng ? (
                              <>
                                {routeCoords.length > 1 ? (
                                  <Polyline
                                    positions={routeCoords}
                                    color="orange"
                                    weight={5}
                                    opacity={0.8}
                                  />
                                ) : (
                                  <Polyline
                                    positions={[
                                      [
                                        trackingData.deliveryLocation.lat,
                                        trackingData.deliveryLocation.lng,
                                      ],
                                      [
                                        trackingData.destination.lat,
                                        trackingData.destination.lng,
                                      ],
                                    ]}
                                    color="orange"
                                  />
                                )}
                                {breadcrumb.length > 1 && (
                                  <Polyline
                                    positions={breadcrumb.map((p) => [
                                      p.lat,
                                      p.lng,
                                    ])}
                                    color="#2563eb"
                                    weight={3}
                                    opacity={0.5}
                                  />
                                )}
                              </>
                            ) : null}
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-[11px] bg-white/60">
                            Waiting for delivery partner location...
                          </div>
                        )}
                      </MapContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full text-xs text-gray-500">
                        Destination coordinates not available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t flex justify-end gap-2">
            <button
              onClick={closeTracking}
              className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h2>
      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
        {/* Mobile horizontal scroll wrapper */}
        <div
          className="overflow-x-auto scrollbar-thin scrollbar-thumb-soydeli-lime scrollbar-track-transparent md:overflow-visible group"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <table className="min-w-[700px] md:min-w-full leading-normal">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="px-5 py-3">Order ID</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Total</th>
                <th className="px-5 py-3"></th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-5 py-5 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap font-semibold">
                      {order._id}
                    </p>
                  </td>
                  <td className="px-5 py-5 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-5 py-5 text-sm">
                    <span
                      className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full ${getStatusChipClass(
                        order.orderStatus
                      )}`}
                    >
                      <span
                        aria-hidden
                        className="absolute inset-0 opacity-50 rounded-full"
                      ></span>
                      <span className="relative">{order.orderStatus}</span>
                    </span>
                  </td>
                  <td className="px-5 py-5 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      ₹{order.totalPrice.toFixed(2)}
                    </p>
                  </td>
                  <td className="px-5 py-5 text-sm text-right">
                    <button
                      onClick={() => viewOrderDetails(order)}
                      className="text-soydeli-gold-dark hover:text-soydeli-forest font-semibold"
                    >
                      View Details
                    </button>
                  </td>
                  <td className="px-5 py-5 text-sm text-right">
                    {order.orderStatus &&
                      order.orderStatus.toLowerCase() !== "delivered" &&
                      order.orderStatus.toLowerCase() !== "cancelled" && (
                        <button
                          onClick={() => openTracking(order)}
                          className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          Track Order
                        </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Gradient edge cues on mobile */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white to-transparent md:hidden" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white to-transparent md:hidden" />
      </div>
      {renderTrackingModal()}
    </div>
  );
};

export default Orders;
