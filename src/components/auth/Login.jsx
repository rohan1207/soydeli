import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = ({ toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const onLoginSuccess = async () => {
      // Ensure guest cart is merged and server cart is fetched before redirecting
      try {
      } catch (_) {}
      navigate(from, { replace: true });
    };
    await login(email, password, onLoginSuccess);
  };

  return (
    <div className="bg-black/70 backdrop-blur-sm p-8 rounded-lg shadow-2xl w-full">
      <h2 className="text-4xl font-black text-white text-center uppercase tracking-widest mb-8">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2 uppercase tracking-wider" htmlFor="email">Email</label>
                    <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-soydeli-gold transition-all duration-300"
            placeholder="your.email@example.com"
            required
          />
        </div>
        <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2 uppercase tracking-wider" htmlFor="password">Password</label>
                    <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-soydeli-gold transition-all duration-300"
            placeholder="••••••••"
            required
          />
        </div>
                <button type="submit" className="w-full bg-gradient-to-r from-soydeli-lime to-soydeli-gold-dark text-white font-bold uppercase tracking-widest py-3 px-4 rounded-md hover:from-soydeli-gold-dark hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          Login
        </button>
      </form>
            <p className="mt-6 text-center text-gray-400">
        Don't have an account?{' '}
                <button onClick={() => toggleForm('signup')} className="font-bold text-soydeli-gold hover:text-soydeli-lime transition-colors duration-300">
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;
