import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const Help = () => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    const whatsappNumber = '919024388894'; // Replace with your WhatsApp number
    const encodedMessage = encodeURIComponent(`Hello, my name is ${user.name} (${user.email}).\n\nI have a query:\n${message}`);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Help & Support</h2>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="text-gray-600 mb-6">
          Have a question or need assistance? Fill out the form below, and we'll get back to you as soon as possible. Clicking 'Send' will open WhatsApp with a pre-filled message.
        </p>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" id="name" value={user.name} readOnly className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm cursor-not-allowed focus:outline-none sm:text-sm" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" id="email" value={user.email} readOnly className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm cursor-not-allowed focus:outline-none sm:text-sm" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
            <textarea 
              id="message" 
              rows="4" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-soydeli-gold focus:border-soydeli-gold sm:text-sm"
              placeholder="How can we help you?"
            ></textarea>
          </div>
          <div>
            <button 
              onClick={handleSendMessage}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-soydeli-gold-dark hover:bg-soydeli-gold-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-soydeli-gold transition-colors"
            >
              Send via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
