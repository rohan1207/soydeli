import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#F4EAD7] via-white to-[#E6D9C3] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 opacity-10">
        <FaLeaf className="w-full h-full text-[#6AAF48]" />
      </div>
      <div className="absolute bottom-20 left-10 w-40 h-40 opacity-10">
        <FaLeaf className="w-full h-full text-[#4B7A2F]" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 mt-14"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-black text-[#333333] mb-3 tracking-wide">
            GET IN TOUCH
          </h1>
          <div className="flex items-center justify-center">
            <div className="h-0.5 w-12 md:w-16 bg-[#6AAF48] mr-4"></div>
            <span className="text-[#6AAF48] font-semibold text-xs md:text-sm tracking-widest">
              Plant-Powered Conversations
            </span>
            <div className="h-0.5 w-12 md:w-16 bg-[#6AAF48] ml-4"></div>
          </div>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Email Card */}
          <div className="bg-white p-6 rounded-md shadow-lg border border-[#DDDDDD] text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-[#6AAF48] to-[#4B7A2F] rounded-full flex items-center justify-center mx-auto mb-4">
              <FaEnvelope className="text-white text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-[#333333] mb-2">Email Us</h3>
            <p className="text-[#7A5F47] text-sm">hello@soydeli.in</p>
            <p className="text-[#7A5F47] text-sm">support@soydeli.in</p>
          </div>

          {/* Phone Card */}
          <div className="bg-white p-6 rounded-md shadow-lg border border-[#DDDDDD] text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-[#6AAF48] to-[#4B7A2F] rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPhone className="text-white text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-[#333333] mb-2">Call Us</h3>
            <p className="text-[#7A5F47] text-sm">+91 8828 55 6000</p>
            <p className="text-[#7A5F47] text-sm">Mon-Sat: 9AM - 6PM</p>
          </div>

          {/* Location Card */}
          <div className="bg-white p-6 rounded-md shadow-lg border border-[#DDDDDD] text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-[#6AAF48] to-[#4B7A2F] rounded-full flex items-center justify-center mx-auto mb-4">
              <FaMapMarkerAlt className="text-white text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-[#333333] mb-2">Visit Us</h3>
            <p className="text-[#7A5F47] text-sm">93, 9th Lane, Subhash Road</p>
            <p className="text-[#7A5F47] text-sm">Jaysingpur, Kolhapur · MH 416101</p>
          </div>
        </motion.div>

        {/* Main Content: Illustration and Form */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-6xl mx-auto mb-12">
          {/* Left side - Illustration */}
          <motion.div
            className="flex-1 max-w-md"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <img
                src="/about3.png"
                alt="Soydeli Tofu Products"
                className="w-full h-auto object-contain rounded-lg"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#6AAF48] rounded-full opacity-20"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#4B7A2F] rounded-full opacity-10"></div>
            </div>
          </motion.div>

          {/* Right side - Contact Form */}
          <motion.div
            className="flex-1 max-w-md w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-white p-8 rounded-md shadow-xl border border-[#DDDDDD]">
              <div className="flex items-center gap-3 mb-6">
                <FaLeaf className="text-[#6AAF48] text-2xl" />
                <h2 className="text-3xl font-black text-[#333333] leading-tight">
                  Let's Connect
                </h2>
              </div>
              <p className="text-[#7A5F47] mb-6">
                Questions about our tofu, bulk orders, or retail partnerships? We would love to hear from you!
              </p>

              {isSubmitted ? (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-20 h-20 bg-[#6AAF48] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#6AAF48] mb-2">Thank You!</h3>
                  <p className="text-[#7A5F47]">Your message has been sent successfully. We'll get back to you soon.</p>
                </motion.div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#333333] mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F4EAD7] border-2 border-[#E6D9C3] text-[#333333] placeholder-[#C3A98F] focus:outline-none focus:border-[#6AAF48] transition-colors rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#333333] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F4EAD7] border-2 border-[#E6D9C3] text-[#333333] placeholder-[#C3A98F] focus:outline-none focus:border-[#6AAF48] transition-colors rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#333333] mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-[#F4EAD7] border-2 border-[#E6D9C3] text-[#333333] placeholder-[#C3A98F] focus:outline-none focus:border-[#6AAF48] transition-colors resize-none rounded-md"
                    />
                  </div>
                  <motion.button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-[#6AAF48] to-[#4B7A2F] text-white px-6 py-4 font-bold tracking-wider hover:shadow-lg transition-all duration-300 rounded-md cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    SEND MESSAGE
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-2">Find Us Here</h2>
            <p className="text-[#7A5F47]">Visit our manufacturing unit in Jaysingpur, Kolhapur</p>
          </div>
          
          <div className="w-full h-96 bg-[#E6D9C3] rounded-lg overflow-hidden shadow-xl border-4 border-white">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.5!2d74.5564!3d16.7697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc119a8b8b8b8b9%3A0x0!2sJaysingpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1635123456789!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Soydeli Tofu Location"
            />
          </div>
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div 
          className="text-center mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="bg-gradient-to-r from-[#6AAF48] to-[#4B7A2F] p-8 rounded-lg shadow-xl text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Ready to Go Plant-Based?</h3>
            <p className="mb-6 text-[#E6D9C3]">
              Join thousands of families across Maharashtra who have made the switch to Soydeli Tofu.
              High protein, 100% vegan, and delivered fresh from our Kolhapur facility.
            </p>
            <motion.button
              className="bg-white text-[#4B7A2F] px-8 py-3 font-bold tracking-wider rounded-md hover:bg-[#F4EAD7] transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SHOP NOW
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;