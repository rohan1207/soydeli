import React, { useState, useEffect, useContext } from "react";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useCart } from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  PlusCircle,
  X,
  CheckCircle,
  MapPin,
  Package,
  CreditCard,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { API_BASE_URL } from "../config.js";

const Checkout = () => {
  const { cartItems, total, clearCart } = useCart();
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1 = Address, 2 = Review & Pay
  const [showAllItems, setShowAllItems] = useState(false);
  const [newAddress, setNewAddress] = useState({
    house: "",
    buildingName: "",
    street: "", // street / locality
    locality: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    landmark: "",
    deliveryInstructions: "",
    addressType: "Home",
    phone: "",
    latitude: "",
    longitude: "",
  });
  const [locating, setLocating] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const API_URL = `${API_BASE_URL}/api`;

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      setError("");
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(`${API_URL}/address`, config);
        setAddresses(data);
        if (data.length > 0) {
          setSelectedAddress(data[0]._id);
        }
      } catch (err) {
        setError("Failed to fetch addresses.");
        console.error(err);
      }
      setLoading(false);
    };

    if (user) {
      fetchAddresses();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [user, token]);

  const handleAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  // Basic validators
  const validateField = (name, value) => {
    if (name === "phone") {
      if (!/^\d{10}$/.test(value)) return "Phone must be 10 digits";
    }
    if (name === "postalCode") {
      // Indian PIN code: 6 digits, first not 0
      if (!/^[1-9][0-9]{5}$/.test(value)) return "Invalid PIN code";
    }
    return "";
  };

  const handleBlurValidate = (e) => {
    const { name, value } = e.target;
    const msg = validateField(name, value.trim());
    setFormErrors((fe) => ({ ...fe, [name]: msg }));
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      Swal.fire("Error", "Geolocation not supported by this browser", "error");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          // Free reverse geocoding using Nominatim (OpenStreetMap)
          const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
          const resp = await fetch(url, {
            headers: { Accept: "application/json" },
          });
          const data = await resp.json();
          const ac = data.address || {};
          setNewAddress((prev) => ({
            ...prev,
            street: ac.road || ac.residential || prev.street,
            locality:
              ac.suburb || ac.neighbourhood || ac.village || prev.locality,
            city: ac.city || ac.town || ac.county || prev.city,
            state: ac.state || prev.state,
            postalCode: ac.postcode || prev.postalCode,
            country: ac.country || prev.country,
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          }));
          Swal.fire(
            "Location Set",
            "Address fields updated from your location.",
            "success"
          );
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to fetch address from location", "error");
        } finally {
          setLocating(false);
        }
      },
      (err) => {
        console.error(err);
        Swal.fire("Error", "Unable to retrieve your location", "error");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Leaflet marker icon fix (default icons paths)
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });

  const DraggableMarker = () => {
    const [position, setPosition] = useState(
      newAddress.latitude && newAddress.longitude
        ? [parseFloat(newAddress.latitude), parseFloat(newAddress.longitude)]
        : [18.5204, 73.8567]
    ); // default Pune
    const map = useMapEvents({
      dragend: () => {},
    });
    useEffect(() => {
      if (newAddress.latitude && newAddress.longitude) {
        const p = [
          parseFloat(newAddress.latitude),
          parseFloat(newAddress.longitude),
        ];
        setPosition(p);
        map.setView(p, 16);
      }
    }, [newAddress.latitude, newAddress.longitude]);
    return (
      <Marker
        draggable
        eventHandlers={{
          dragend: async (e) => {
            const latlng = e.target.getLatLng();
            setNewAddress((prev) => ({
              ...prev,
              latitude: latlng.lat.toString(),
              longitude: latlng.lng.toString(),
            }));
            try {
              const rev = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`
              );
              const d = await rev.json();
              const ac = d.address || {};
              setNewAddress((prev) => ({
                ...prev,
                street: ac.road || ac.residential || prev.street,
                locality:
                  ac.suburb || ac.neighbourhood || ac.village || prev.locality,
                city: ac.city || ac.town || ac.county || prev.city,
                state: ac.state || prev.state,
                postalCode: ac.postcode || prev.postalCode,
                country: ac.country || prev.country,
              }));
            } catch (err) {
              console.error("Reverse geocode failed", err);
            }
          },
        }}
        position={position}
      />
    );
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${API_URL}/address`,
        newAddress,
        config
      );
      setAddresses([...addresses, data]);
      setSelectedAddress(data._id);
      setShowAddressForm(false);
      setNewAddress({
        house: "",
        buildingName: "",
        street: "",
        locality: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
        landmark: "",
        deliveryInstructions: "",
        addressType: "Home",
        phone: "",
        latitude: "",
        longitude: "",
      });
      Swal.fire("Success", "Address saved successfully!", "success");
    } catch (err) {
      setError("Failed to save address. Please try again.");
      console.error(err);
      Swal.fire("Error", "Failed to save address.", "error");
    }
    setSubmitting(false);
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!user) {
      // Check for user object instead of token
      Swal.fire({
        title: "Please Login",
        text: "You need to be logged in to proceed with the payment.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/account");
        }
      });
      return;
    }

    if (!selectedAddress) {
      Swal.fire(
        "Warning",
        "Please select or add a shipping address.",
        "warning"
      );
      return;
    }

    if (!total || total <= 0) {
      Swal.fire(
        "Error",
        "Your cart total is invalid. Please check your cart and try again.",
        "error"
      );
      return;
    }

    setSubmitting(true);
    setError("");

    console.log("Attempting to create payment with total:", total); // Debugging line

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/orders/create-payment`,
        { totalPrice: total },
        config
      );
      const { razorpayOrder } = data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Soydeli Tofu",
        description: "Test Transaction",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          const paymentData = {
            orderItems: cartItems.map((item) => ({
              ...item,
              price: item.discountedPrice,
            })),
            shippingAddress: addresses.find((a) => a._id === selectedAddress),
            totalPrice: total,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          try {
            const verificationResponse = await axios.post(
              `${API_URL}/orders/verify-payment`,
              paymentData,
              config
            );

            if (verificationResponse.data.success) {
              Swal.fire(
                "Success",
                "Payment successful! Your order has been placed.",
                "success"
              );
              clearCart();
              navigate("/account");
            } else {
              Swal.fire(
                "Error",
                "Payment verification failed. Please contact support.",
                "error"
              );
            }
          } catch (error) {
            console.error("Payment processing error:", error);
            Swal.fire(
              "Error",
              "An error occurred during payment verification.",
              "error"
            );
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: newAddress.phone,
        },
        theme: {
          color: "#F59E0B",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment failed", error);
      Swal.fire("Error", "Payment failed. Please try again.", "error");
    }
    setSubmitting(false);
  };

  // Derived values for order items display
  const VISIBLE_COUNT = 5;
  const visibleItems = showAllItems
    ? cartItems
    : cartItems.slice(0, VISIBLE_COUNT);
  const remainingCount = cartItems.length - VISIBLE_COUNT;

  return (
    <div className="bg-gradient-to-b from-neutral-50 via-white to-neutral-100 min-h-screen font-sans mt-12">
      <div
        className={
          "max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 " +
          (currentStep === 2 ? "pb-32 lg:pb-12" : "")
        }
      >
        {/* Stepper */}
        <div className="flex flex-row items-center justify-center gap-6 md:gap-8 mb-10">
          {[1, 2].map((step) => {
            const label = step === 1 ? "Address" : "Review & Pay";
            const Icon = step === 1 ? MapPin : CreditCard;
            const active = currentStep === step;
            const completed = currentStep > step;
            return (
              <div
                key={step}
                className="flex items-center gap-3"
                onClick={() => step < currentStep && setCurrentStep(step)}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer ${
                    active
                      ? "bg-amber-500 border-amber-500 text-white shadow"
                      : completed
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : "bg-white border-gray-300 text-gray-500"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-semibold text-sm md:text-base text-gray-700">
                  {label}
                </div>
                {step === 1 && (
                  <div className="w-10 md:w-16 h-[2px] bg-gradient-to-r from-amber-400 to-amber-600" />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Step 1: Address Selection */}
            {currentStep === 1 && (
              <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-amber-100/40">
                <div className="flex items-center gap-3 mb-6">
                  <span className="p-2 rounded-xl bg-amber-100 text-amber-600">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                    Shipping Address
                  </h2>
                </div>
                {loading && (
                  <p className="text-gray-500">Loading addresses...</p>
                )}
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {!loading && addresses.length === 0 && !showAddressForm && (
                  <div className="text-center p-6 border-2 border-dashed rounded-2xl bg-gradient-to-br from-neutral-50 to-white">
                    <p className="text-gray-600 mb-4">
                      You haven't added any address yet.
                    </p>
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="inline-flex items-center gap-2 bg-amber-500 text-white px-5 py-2.5 rounded-xl font-medium shadow hover:bg-amber-600 transition"
                    >
                      <PlusCircle className="w-5 h-5" /> Add Address
                    </button>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((address) => {
                    const active = selectedAddress === address._id;
                    return (
                      <button
                        type="button"
                        key={address._id}
                        onClick={() => setSelectedAddress(address._id)}
                        className={`group text-left relative p-5 rounded-2xl border transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                          active
                            ? "border-amber-500 bg-amber-50/70 shadow-sm"
                            : "border-gray-200 hover:border-amber-300 bg-white"
                        }`}
                      >
                        <div className="flex justify-between items-start gap-3">
                          <div className="font-semibold text-gray-800 line-clamp-1">
                            {address.street}
                          </div>
                          {active && (
                            <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-gray-600 mt-1 text-sm leading-snug line-clamp-2">
                          {address.city}, {address.state} - {address.postalCode}
                        </p>
                        <p className="text-gray-500 mt-2 text-xs">
                          Phone: {address.phone}
                        </p>
                        <span
                          className={`absolute inset-0 rounded-2xl transition-opacity pointer-events-none ${
                            active
                              ? "ring-2 ring-amber-400/60"
                              : "group-hover:ring-2 group-hover:ring-amber-300/50 opacity-0 group-hover:opacity-100"
                          }`}
                        />
                      </button>
                    );
                  })}
                  {addresses.length > 0 && (
                    <div
                      onClick={() => setShowAddressForm(true)}
                      className="p-5 rounded-2xl border-2 border-dashed border-amber-200 hover:border-amber-400 hover:bg-amber-50/40 cursor-pointer transition-all flex flex-col items-center justify-center text-amber-500 hover:text-amber-600"
                    >
                      <PlusCircle className="w-9 h-9 mb-2" />
                      <span className="font-semibold text-sm">
                        Add New Address
                      </span>
                    </div>
                  )}
                </div>
                {selectedAddress && (
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 rounded-xl bg-amber-500 text-white font-semibold shadow hover:bg-amber-600 transition disabled:bg-gray-300"
                      disabled={!selectedAddress}
                    >
                      Continue to Review
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* Step 2: Review & Pay */}
            {currentStep === 2 && (
              <div className="bg-white/90 backdrop-blur p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] border border-amber-100/50">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-amber-100 text-amber-600">
                      <Package className="w-5 h-5" />
                    </span>
                    <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                      Review Order
                    </h2>
                  </div>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-sm text-amber-600 font-medium hover:underline"
                  >
                    Edit Address
                  </button>
                </div>
                <div className="space-y-4 max-h-[60vh] md:max-h-[420px] overflow-y-auto pr-1 custom-scrollbar">
                  {visibleItems.map((item) => (
                    <div
                      key={item.sku}
                      className="flex justify-between items-center bg-gradient-to-r from-neutral-50 to-white p-4 rounded-2xl border border-gray-100 shadow-sm/50 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 ring-1 ring-gray-200">
                          <img
                            src={item.images?.[0] || "/placeholder-dish.jpg"}
                            alt={item.name}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "/logo.png";
                            }}
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 leading-tight">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 tracking-wide">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-800 whitespace-nowrap ml-4">
                        ₹{(item.discountedPrice * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  {remainingCount > 0 && !showAllItems && (
                    <button
                      onClick={() => setShowAllItems(true)}
                      className="w-full py-2 text-sm font-medium text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-xl flex items-center justify-center gap-1"
                    >
                      Show {remainingCount} more item
                      {remainingCount > 1 ? "s" : ""}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  )}
                  {showAllItems && cartItems.length > VISIBLE_COUNT && (
                    <button
                      onClick={() => setShowAllItems(false)}
                      className="w-full py-2 text-sm font-medium text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-xl flex items-center justify-center gap-1"
                    >
                      Collapse List <ChevronUp className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100/30 border border-amber-200">
                  <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
                    <span>Items ({cartItems.length})</span>
                    <span>₹{(total || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center font-semibold text-gray-800 text-lg mt-3">
                    <span>Total Payable</span>
                    <span>₹{(total || 0).toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-8 flex flex-col md:flex-row gap-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 py-3 rounded-xl font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={
                      submitting || cartItems.length === 0 || !selectedAddress
                    }
                    className="flex-1 py-3 rounded-xl font-semibold bg-amber-500 text-white shadow-lg shadow-amber-500/30 hover:bg-amber-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Processing..." : "Pay Securely"}
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Right Column Summary (Persistent) */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur sticky top-4 p-6 rounded-3xl border border-amber-100 shadow-[0_4px_18px_-2px_rgba(0,0,0,0.05)]">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-500" /> Order Snapshot
              </h2>
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
                {cartItems.map((item) => (
                  <div
                    key={item.sku}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-100 ring-1 ring-gray-200 flex-shrink-0">
                        <img
                          src={item.images?.[0] || "/placeholder-dish.jpg"}
                          alt={item.name}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/logo.png";
                          }}
                          className="w-full h-full object-cover object-center"
                          loading="lazy"
                        />
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          x {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 whitespace-nowrap ml-2">
                      ₹{(item.discountedPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-dashed border-gray-200 my-5" />
              <div className="flex justify-between items-center text-base font-semibold text-gray-800">
                <span>Total</span>
                <span>₹{(total || 0).toFixed(2)}</span>
              </div>
              {currentStep === 1 && (
                <button
                  onClick={() => setCurrentStep(2)}
                  disabled={!selectedAddress || cartItems.length === 0}
                  className="w-full mt-6 bg-amber-500 text-white py-3 rounded-xl font-semibold hover:bg-amber-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              )}
              {currentStep === 2 && (
                <button
                  onClick={handlePayment}
                  disabled={
                    submitting || cartItems.length === 0 || !selectedAddress
                  }
                  className="w-full mt-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-amber-500/30 hover:from-amber-600 hover:to-amber-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {submitting
                    ? "Processing..."
                    : "Pay ₹" + (total || 0).toFixed(2)}
                </button>
              )}
              <p className="mt-3 text-[11px] text-gray-500 text-center">
                Payments are 100% secure & encrypted.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      {showAddressForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="relative bg-white w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl p-6 md:p-8 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.25)] border border-amber-100/60">
            <div className="flex justify-between items-center mb-4 shrink-0">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-500" /> Add Address
              </h2>
              <button
                onClick={() => setShowAddressForm(false)}
                className="text-gray-400 hover:text-gray-700 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form
              onSubmit={handleAddressSubmit}
              className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1"
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={useMyLocation}
                  disabled={locating}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 disabled:bg-gray-400"
                >
                  {locating ? "Locating..." : "📍 Use My Location"}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="house"
                  placeholder="House / Flat No."
                  value={newAddress.house}
                  onChange={handleAddressChange}
                  className="w-full p-3.5 bg-neutral-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/60 text-gray-800"
                />
                <input
                  type="text"
                  name="buildingName"
                  placeholder="Building Name"
                  value={newAddress.buildingName}
                  onChange={handleAddressChange}
                  className="w-full p-3.5 bg-neutral-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/60 text-gray-800"
                />
              </div>
              <input
                type="text"
                name="street"
                placeholder="Street / Locality"
                value={newAddress.street}
                onChange={handleAddressChange}
                required
                className="w-full p-3.5 bg-neutral-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/60 text-gray-800"
              />
              <input
                type="text"
                name="locality"
                placeholder="Area / Neighborhood (optional)"
                value={newAddress.locality}
                onChange={handleAddressChange}
                className="w-full p-3.5 bg-neutral-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/60 text-gray-800"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={newAddress.city}
                  onChange={handleAddressChange}
                  required
                  className="w-full p-3.5 bg-neutral-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/60 text-gray-800"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={newAddress.state}
                  onChange={handleAddressChange}
                  required
                  className="w-full p-3.5 bg-neutral-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/60 text-gray-800"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={newAddress.postalCode}
                  onChange={handleAddressChange}
                  onBlur={handleBlurValidate}
                  required
                  className="w-full p-3.5 bg-neutral-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/60 text-gray-800"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Receiver's Phone Number"
                  value={newAddress.phone}
                  onChange={handleAddressChange}
                  onBlur={handleBlurValidate}
                  required
                  className="w-full p-3.5 bg-neutral-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/60 text-gray-800"
                />
              </div>
              {(formErrors.postalCode || formErrors.phone) && (
                <div className="text-xs text-red-600 flex flex-col gap-1">
                  {formErrors.postalCode && (
                    <span>{formErrors.postalCode}</span>
                  )}
                  {formErrors.phone && <span>{formErrors.phone}</span>}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="landmark"
                  placeholder="Landmark (optional)"
                  value={newAddress.landmark}
                  onChange={handleAddressChange}
                  className="w-full p-3.5 bg-neutral-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/60 text-gray-800"
                />
                <select
                  name="addressType"
                  value={newAddress.addressType}
                  onChange={handleAddressChange}
                  className="w-full p-3.5 bg-neutral-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/60 text-gray-800"
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <textarea
                name="deliveryInstructions"
                placeholder="Delivery Instructions (optional)"
                value={newAddress.deliveryInstructions}
                onChange={handleAddressChange}
                rows={3}
                className="w-full p-3.5 bg-neutral-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/60 text-gray-800"
              />

              {newAddress.latitude && newAddress.longitude && (
                <div className="h-64 rounded-xl overflow-hidden border border-gray-200">
                  <MapContainer
                    center={[
                      parseFloat(newAddress.latitude),
                      parseFloat(newAddress.longitude),
                    ]}
                    zoom={15}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <DraggableMarker />
                  </MapContainer>
                </div>
              )}
              <div className="flex gap-3 pt-2 pb-1 sticky bottom-0 bg-white/80 backdrop-blur rounded-b-2xl">
                <button
                  type="button"
                  onClick={() => setShowAddressForm(false)}
                  className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600 transition disabled:bg-gray-400"
                >
                  {submitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Mobile sticky bottom pay bar (Step 2 only) */}
      {currentStep === 2 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-gray-200 px-4 py-3 flex items-center justify-between shadow-[0_-4px_12px_-4px_rgba(0,0,0,0.08)]">
          <div className="flex flex-col leading-tight">
            <span className="text-xs uppercase tracking-wide text-gray-500">
              Total
            </span>
            <span className="text-lg font-semibold text-gray-800">
              ₹{(total || 0).toFixed(2)}
            </span>
          </div>
          <button
            onClick={handlePayment}
            disabled={submitting || cartItems.length === 0 || !selectedAddress}
            className="flex-1 ml-4 py-3 rounded-xl font-semibold bg-amber-500 text-white shadow hover:bg-amber-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {submitting ? "Processing..." : `Pay ₹${(total || 0).toFixed(2)}`}
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
