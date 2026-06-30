import React, { useEffect, useState } from "react";

const FACILITY_COORDS = { lat: 16.7697, lng: 74.5564 };
const DELIVERY_RADIUS_KM = 150;

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const LocationPopup = ({ onAllowed, onBlocked }) => {
  const [show, setShow] = useState(true);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!show) return;
    setChecking(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const dist = getDistanceFromLatLonInKm(
          FACILITY_COORDS.lat,
          FACILITY_COORDS.lng,
          lat,
          lng
        );
        if (dist <= DELIVERY_RADIUS_KM) {
          setShow(false);
          onAllowed && onAllowed({ lat, lng });
        } else {
          setShow(false);
          onBlocked && onBlocked({ lat, lng, dist });
        }
        setChecking(false);
      },
      () => {
        setError(
          "Location access denied. Please enable location to check delivery availability."
        );
        setChecking(false);
      }
    );
  }, [show, onAllowed, onBlocked]);

  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border border-emerald-100">
        <h2 className="text-xl font-bold mb-3 text-gray-800">
          Chilled Delivery Zone
        </h2>
        <p className="text-gray-600 mb-6">
          We deliver fresh Soydeli Tofu within a{" "}
          <span className="font-semibold text-emerald-600">
            150 km radius
          </span>{" "}
          of our Kolhapur manufacturing unit. Enable location to check if you are
          in our delivery zone.
        </p>
        {checking ? (
          <div className="text-emerald-600 font-medium">
            Checking your location...
          </div>
        ) : error ? (
          <div className="text-red-500 mb-2">{error}</div>
        ) : (
          <button
            className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-semibold shadow hover:bg-emerald-500 transition"
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default LocationPopup;
