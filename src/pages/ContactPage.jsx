import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLeaf, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { COMPANY, AVAILABILITY } from "../data/brandContent";

const infoCards = [
  {
    icon: FaEnvelope,
    title: "Email Us",
    lines: [COMPANY.email, COMPANY.supportEmail],
  },
  {
    icon: FaPhone,
    title: "Call Us",
    lines: [COMPANY.phone, "Mon-Sat: 9AM - 6PM"],
  },
  {
    icon: FaMapMarkerAlt,
    title: COMPANY.corporateOffice.title,
    lines: COMPANY.corporateOffice.lines,
  },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div className="relative min-h-screen bg-soydeli-page overflow-hidden">
      <div className="absolute top-20 right-10 w-32 h-32 opacity-10 pointer-events-none">
        <FaLeaf className="w-full h-full text-soydeli-primary" />
      </div>
      <div className="absolute bottom-20 left-10 w-40 h-40 opacity-10 pointer-events-none">
        <FaLeaf className="w-full h-full text-soydeli-dark" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          className="text-center mb-12 mt-14"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="section-title">Get in Touch</h1>
          <div className="flex items-center justify-center mt-3">
            <div className="h-0.5 w-12 md:w-16 bg-soydeli-primary mr-4" />
            <span className="eyebrow !mb-0">Plant-Powered Conversations</span>
            <div className="h-0.5 w-12 md:w-16 bg-soydeli-primary ml-4" />
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {infoCards.map(({ icon: Icon, title, lines }) => (
            <div
              key={title}
              className="card-soydeli card-soydeli-hover overflow-hidden text-center h-full flex flex-col"
            >
              <div className="theme-band p-5 sm:p-6">
                <div className="flex justify-center mb-3">
                  <Icon className="text-xl sm:text-2xl" />
                </div>
                <h3 className="text-sm sm:text-base font-bold uppercase tracking-widest">
                  {title}
                </h3>
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-center">
                {lines.map((line) => (
                  <p key={line} className="text-gray-600 text-sm">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-6xl mx-auto mb-12">
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
                className="w-full h-auto object-contain rounded-2xl"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-soydeli-primary rounded-full opacity-20" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-soydeli-dark rounded-full opacity-10" />
            </div>
          </motion.div>

          <motion.div
            className="flex-1 max-w-md w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="card-soydeli p-8">
              <div className="flex items-center gap-3 mb-6">
                <FaLeaf className="text-soydeli-primary text-2xl" />
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                  Let's Connect
                </h2>
              </div>
              <p className="section-desc mb-6">
                Questions about our tofu, bulk orders, or retail partnerships?
                We would love to hear from you!
              </p>

              {isSubmitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="icon-circle mx-auto mb-4 w-20 h-20">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-soydeli-primary mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600">
                    Your message has been sent successfully. We'll get back to
                    you soon.
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-5">
                  {[
                    { name: "name", label: "Your Name *", type: "text", placeholder: "Enter your full name" },
                    { name: "email", label: "Email Address *", type: "email", placeholder: "your.email@example.com" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="input-soydeli"
                        required
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="input-soydeli resize-none"
                    />
                  </div>
                  <button type="button" onClick={handleSubmit} className="btn-primary w-full">
                    Send Message
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center mb-8">
            <h2 className="section-title text-3xl md:text-4xl mb-2">
              Find Us Here
            </h2>
            <p className="section-desc">
              {COMPANY.manufacturingUnit.title} — {COMPANY.manufacturingUnit.lines.join(", ")}
            </p>
          </div>

          <div className="w-full h-96 bg-soydeli-surface rounded-2xl overflow-hidden shadow-soydeli border-4 border-white">
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

        <motion.div
          className="text-center mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="cta-band text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
              Ready to Go Plant-Based?
            </h3>
            <p className="mb-6 text-soydeli-mint">
              Find Soydeli Tofu at stores across India — high protein, 100%
              vegan, and chilled for freshness.
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center justify-center bg-white text-soydeli-dark px-8 py-3 font-bold uppercase tracking-[0.15em] rounded-full hover:bg-soydeli-surface transition-all duration-300 active:scale-[0.98]"
            >
              Explore Products
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
