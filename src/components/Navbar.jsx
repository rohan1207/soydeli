import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import { FaEnvelope, FaUser, FaShoppingCart } from "react-icons/fa";
import { HiOutlineMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useCart();
  const { user } = useContext(AuthContext);

  // Detect scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Disable body scroll when mobile menu open
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", mobileOpen);
  }, [mobileOpen]);

  const links = [
    { label: "Home", href: "/" },
    { label: "Recipes", href: "/recipes" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
  ];

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-lg"
            : "bg-white shadow-md"
        }`}
      >
        <nav className="flex items-center justify-between h-20 lg:h-24 px-5 sm:px-8 lg:px-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 min-w-0">
            <img
              src="/new_logo.png"
              alt="Soydeli Tofu"
              className="object-contain h-14 w-auto sm:h-16 lg:h-[4.75rem] max-w-[calc(100vw-5rem)] sm:max-w-none transition-all"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                to={link.href}
                key={link.label}
                className="uppercase font-bold tracking-[0.2em] text-sm transition-colors duration-300 text-gray-900 hover:text-emerald-600"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center gap-4">

            {/* {user ? (
              <Link
                to="/account"
                className="flex items-center gap-2 px-3 py-2 rounded-full transition duration-300 text-gray-900 hover:bg-gray-100"
              >
                <FaUser size={18} />
                <span className="font-semibold text-sm">
                  {user.name?.split(" ")[0] || "Account"}
                </span>
              </Link>
            ) : (
              <Link
                to="/account"
                className="p-2 rounded-full transition duration-300 text-gray-900 hover:bg-gray-100"
              >
                <FaUser size={18} />
              </Link>
            )} */}

            {/* Cart
            <Link
              to="/cart"
              className="p-2 rounded-full relative transition duration-300 text-gray-900 hover:bg-gray-100"
            >
              <FaShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link> */}

            {/* CTA */}
            <Link
              to="/contact"
              className="flex items-center gap-2 bg-[#6AAF48] hover:bg-[#4B7A2F] text-white px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-[0.2em] transition shadow-md"
            >
              <FaEnvelope size={16} />
              <span>Contact Us</span>
            </Link>
          </div>

          {/* Mobile Buttons */}
          <div className="lg:hidden flex items-center gap-3">

            {/* <Link
              to="/cart"
              className="p-2 rounded-full relative transition text-gray-900 hover:bg-gray-100"
            >
              <FaShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link> */}

            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-md transition text-gray-900"
            >
              <HiOutlineMenu size={28} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Sliding Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={closeMobile}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl flex flex-col transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <img
              src="/new_logo.png"
              alt="Soydeli Tofu"
              className="object-contain h-12 w-auto sm:h-14 max-w-[calc(100%-3rem)]"
            />
            <button
              onClick={closeMobile}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <HiX size={22} />
            </button>
          </div>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col gap-5 p-6">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={closeMobile}
                className="text-gray-900 text-lg font-semibold tracking-wide hover:text-emerald-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Footer */}
          <div className="p-6 border-t border-gray-200">
            <Link
              to="/contact"
              onClick={closeMobile}
              className="w-full flex items-center justify-center gap-2 bg-[#6AAF48] hover:bg-[#4B7A2F] text-white px-5 py-3 rounded-xl text-base font-semibold shadow"
            >
              <FaEnvelope /> Contact Us
            </Link>

            {/* <div className="text-center mt-4">
              <Link
                to="/account"
                onClick={closeMobile}
                className="font-semibold text-gray-700 hover:text-black"
              >
                {user ? "View Account" : "Login or Sign Up"}
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;