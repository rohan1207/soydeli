import React from 'react';
import Home from './pages/Home';
import { Route, BrowserRouter, Routes, useLocation } from 'react-router-dom';

import AboutUs from './pages/AboutUs';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OurMenu from './pages/OurMenu';
import Gallery from './pages/Gallery';
import ContactPage from './pages/ContactPage';
import OffersPage from './pages/OffersPage';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';
import Account from './pages/Account';
import Checkout from './pages/Checkout';
import LandingPage from './pages/LandingPage';
import Subscription from './pages/Subscription';
import Recipes from './pages/Recipes';
import ProductDetail from './pages/ProductDetail';
import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  const location = useLocation();

  // Hide Navbar + Footer ONLY on Landing Page
  const hideLayout = location.pathname === "/";

  return (
    <>
      <ScrollToTop />
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/menu" element={<OurMenu />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
