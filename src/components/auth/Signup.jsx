import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Signup = ({ toggleForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signedUp = await signup(name, email, phone, password);
    if (signedUp) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="bg-black/70 backdrop-blur-sm p-8 rounded-lg shadow-2xl w-full">
      <h2 className="text-4xl font-black text-white text-center uppercase tracking-widest mb-8">Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2 uppercase tracking-wider" htmlFor="name">Name</label>
                    <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-soydeli-gold transition-all duration-300"
            placeholder="Full Name"
            required
          />
        </div>
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
                    <label className="block text-gray-300 text-sm font-bold mb-2 uppercase tracking-wider" htmlFor="phone">Phone</label>
                    <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-soydeli-gold transition-all duration-300"
            placeholder="Phone Number"
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
          Sign Up
        </button>
      </form>
            <p className="mt-6 text-center text-gray-400">
        Already have an account?{' '}
                <button onClick={() => toggleForm('login')} className="font-bold text-soydeli-gold hover:text-soydeli-lime transition-colors duration-300">
          Login
        </button>
      </p>
    </div>
  );
};

export default Signup;
