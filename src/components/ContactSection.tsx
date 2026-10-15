import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/products';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ContactSection: React.FC = () => {
  const { showToast } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSent, setIsSent] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim()) errs.message = 'Please type your question or feedback.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSent(true);
    showToast('Message Sent!', 'Thank you! Our customer care team will get back to you shortly.', 'success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => {
      setIsSent(false);
    }, 6000);
  };

  return (
    <section id="contact" className="w-full py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Business Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#7EA778] mb-2 block">
                Get In Touch
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#315F39] mb-4">
                We'd Love to Hear From You
              </h2>
              <p className="text-sm sm:text-base text-[#203D26]/75 mb-8">
                Have questions about our harvest schedules, bulk orders, or farm visits? Reach out to our friendly organic concierge team.
              </p>

              {/* Contact Information List */}
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#E3F0D7] text-[#315F39] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5">
                      Store & Experience Hub
                    </h4>
                    <p className="text-sm font-semibold text-[#203D26] leading-snug">
                      {BUSINESS_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#E3F0D7] text-[#315F39] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5">
                      Customer Hotline & WhatsApp
                    </h4>
                    <a
                      href={`tel:${BUSINESS_INFO.phone}`}
                      className="text-sm font-semibold text-[#315F39] hover:underline"
                    >
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#E3F0D7] text-[#315F39] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5">
                      Email Inquiries
                    </h4>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="text-sm font-semibold text-[#315F39] hover:underline"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#E3F0D7] text-[#315F39] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5">
                      Operating Hours
                    </h4>
                    <p className="text-sm text-[#203D26] font-medium leading-snug">
                      {BUSINESS_INFO.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery badge */}
            <div className="mt-8 p-4 rounded-2xl bg-[#E3F0D7]/60 border border-[#CDE4BF] text-xs text-[#203D26]">
              🌿 <strong>Express Delivery:</strong> Order before 10:00 AM for same-day evening delivery across Dhaka metropolitan area.
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-[#F7FAEF] rounded-3xl p-6 sm:p-10 border border-[#E3F0D7] shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-[#315F39] mb-2">
              Send Us a Message
            </h3>
            <p className="text-xs sm:text-sm text-[#203D26]/75 mb-6">
              Fill out the form below and we will respond within a few hours.
            </p>

            {isSent && (
              <div className="mb-6 p-4 rounded-2xl bg-[#E3F0D7] border border-[#CDE4BF] text-[#315F39] flex items-center gap-3">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span className="text-xs font-semibold">
                  Thank you! Your message has been received. Our team will contact you shortly.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#203D26] mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Farhana Yasmin"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-white border ${
                      errors.name ? 'border-red-400' : 'border-[#E3F0D7]'
                    } focus:outline-none focus:ring-2 focus:ring-[#315F39]`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#203D26] mb-1.5">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="farhana@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-white border ${
                      errors.email ? 'border-red-400' : 'border-[#E3F0D7]'
                    } focus:outline-none focus:ring-2 focus:ring-[#315F39]`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#203D26] mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Weekly vegetable subscription query"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white border border-[#E3F0D7] focus:outline-none focus:ring-2 focus:ring-[#315F39]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#203D26] mb-1.5">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Write your note or inquiry here..."
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-white border ${
                    errors.message ? 'border-red-400' : 'border-[#E3F0D7]'
                  } focus:outline-none focus:ring-2 focus:ring-[#315F39]`}
                />
                {errors.message && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#315F39] hover:bg-[#234529] text-[#F7FAEF] font-semibold text-xs tracking-wider uppercase transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
