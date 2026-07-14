import React, { useEffect, useState } from "react";
import { AVAILABILITY } from "../data/brandContent";

const LocationPopup = ({ onAllowed, onBlocked }) => {
  const [show, setShow] = useState(true);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!show) return;
    setChecking(true);
    const timer = setTimeout(() => {
      setShow(false);
      onAllowed && onAllowed();
      setChecking(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [show, onAllowed]);

  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="card-soydeli p-8 max-w-sm w-full text-center mx-4">
        <h2 className="text-xl font-bold mb-3 text-gray-900">
          {AVAILABILITY.panIndiaTitle}
        </h2>
        <p className="section-desc mb-6 max-w-none">
          {AVAILABILITY.panIndiaSubtitle}
        </p>
        {checking ? (
          <div className="text-soydeli-primary font-medium">Loading...</div>
        ) : error ? (
          <div className="text-red-500 mb-2">{error}</div>
        ) : (
          <button className="btn-primary" onClick={() => setShow(false)}>
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default LocationPopup;
