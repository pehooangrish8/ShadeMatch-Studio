import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  UserCheck, 
  Sparkles, 
  CheckCircle2, 
  Star, 
  MapPin,
  ArrowRight,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockArtists } from '../data/mockData';
import { Artist, Appointment } from '../types';

export const AppointmentSchedulingPage: React.FC = () => {
  const { appointments, addAppointment, cancelAppointment } = useApp();

  const [selectedService, setSelectedService] = useState({
    name: 'Custom 1-on-1 AI Shade Consultation & Express Facial',
    price: 3500,
    duration: '45 mins'
  });

  const [selectedArtist, setSelectedArtist] = useState<Artist>(mockArtists[0]);
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-05');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('02:00 PM');
  const [notes, setNotes] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const services = [
    {
      name: 'Custom 1-on-1 AI Shade Consultation & Express Facial',
      price: 3500,
      duration: '45 mins',
      desc: 'Undertone spectrophotometer analysis, formulation matching, and soothing rose hydrator prep.'
    },
    {
      name: 'Luminous Bridal Trial & Skin Prep Routine',
      price: 5500,
      duration: '75 mins',
      desc: 'Complete HD photo-proof bridal trial with custom lip blend and longwear waterproof setting.'
    },
    {
      name: 'Masterclass Soft Glam Makeup Application',
      price: 4200,
      duration: '60 mins',
      desc: 'Full face application highlighting red carpet luminescence, feathered lashes, and satin lips.'
    }
  ];

  const timeSlots = [
    '10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'
  ];

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    addAppointment({
      serviceName: selectedService.name,
      artistId: selectedArtist.id,
      artistName: selectedArtist.name,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      status: 'Upcoming',
      price: selectedService.price,
      location: 'ShadeMatch Flagship Studio, Beverly Hills',
      notes: notes || 'Bare skin prep requested.',
    });
    setShowConfirmation(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FADADD]/40 border border-[#E8B4B8]/50 text-xs font-bold text-[#D98CA3]">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>Concierge Artist Studio</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#33272A]">
          Appointment Scheduling
        </h1>
        <p className="text-xs sm:text-sm text-[#5C4D51]">
          Reserve a private session with celebrity beauty artists and master shade tech specialists.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Booking Form (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Step 1: Select Service */}
          <div className="glass-card p-6 rounded-3xl space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#33272A] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#FADADD] text-[#D98CA3] text-xs font-bold flex items-center justify-center">1</span>
              <span>Select Service Experience</span>
            </h3>

            <div className="space-y-3">
              {services.map((srv) => {
                const isSelected = selectedService.name === srv.name;
                return (
                  <button
                    key={srv.name}
                    type="button"
                    onClick={() => setSelectedService(srv)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#D98CA3] bg-[#FADADD]/30 ring-2 ring-[#D98CA3]/30'
                        : 'border-[#F7CAD0]/50 hover:border-[#D98CA3] bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-base font-bold text-[#33272A]">{srv.name}</h4>
                      <span className="font-bold text-sm text-[#D98CA3]">₹{srv.price.toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-xs text-[#5C4D51] mt-1">{srv.desc}</p>
                    <span className="text-[10px] font-bold text-[#5C4D51]/80 mt-2 block">Duration: {srv.duration}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Artist */}
          <div className="glass-card p-6 rounded-3xl space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#33272A] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#FADADD] text-[#D98CA3] text-xs font-bold flex items-center justify-center">2</span>
              <span>Choose Master Artist</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {mockArtists.map((artist) => {
                const isSelected = selectedArtist.id === artist.id;
                return (
                  <button
                    key={artist.id}
                    type="button"
                    onClick={() => setSelectedArtist(artist)}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'border-[#D98CA3] bg-[#FADADD]/30 ring-2 ring-[#D98CA3]/30 scale-[1.02]'
                        : 'border-[#F7CAD0]/50 hover:border-[#D98CA3] bg-white'
                    }`}
                  >
                    <img
                      src={artist.avatar}
                      alt={artist.name}
                      className="w-16 h-16 rounded-full object-cover mx-auto mb-2 ring-2 ring-[#E8B4B8]"
                    />
                    <h4 className="font-bold text-xs text-[#33272A]">{artist.name}</h4>
                    <span className="text-[10px] text-[#D98CA3] font-semibold block">{artist.role}</span>
                    <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-[#33272A] mt-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{artist.rating}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Date & Time Slot */}
          <div className="glass-card p-6 rounded-3xl space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#33272A] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#FADADD] text-[#D98CA3] text-xs font-bold flex items-center justify-center">3</span>
              <span>Date & Time Slot</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#33272A] mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min="2026-07-25"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-[#F7CAD0] text-sm text-[#33272A] focus:outline-hidden focus:border-[#D98CA3]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#33272A] mb-2">
                  Time Slot
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedTimeSlot === slot
                          ? 'border-[#D98CA3] bg-[#D98CA3] text-white'
                          : 'border-[#F7CAD0] bg-white text-[#5C4D51]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#33272A] mb-2">
                Special Skin Notes / Allergies (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention any skin sensitivity or upcoming event specifics..."
                className="w-full px-4 py-3 rounded-2xl bg-white border border-[#F7CAD0] text-xs text-[#33272A] h-20 focus:outline-hidden focus:border-[#D98CA3]"
              />
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleBookAppointment}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D98CA3] via-[#E8B4B8] to-[#D98CA3] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Confirm Studio Reservation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

        {/* Existing Reservations Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 rounded-3xl space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#33272A] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D98CA3]" />
              <span>Your Appointments ({appointments.length})</span>
            </h3>

            <div className="space-y-4">
              {appointments.map((app) => (
                <div key={app.id} className="p-4 rounded-2xl bg-[#FFF9FB] border border-[#F7CAD0]/50 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      app.status === 'Upcoming' ? 'bg-[#FADADD] text-[#D98CA3]' : 'bg-stone-100 text-stone-500'
                    }`}>
                      {app.status}
                    </span>
                    <span className="font-bold text-xs text-[#33272A]">₹{app.price.toLocaleString('en-IN')}</span>
                  </div>

                  <h5 className="font-bold text-xs text-[#33272A]">{app.serviceName}</h5>
                  <p className="text-[11px] text-[#5C4D51]">
                    Artist: <span className="font-semibold text-[#33272A]">{app.artistName}</span>
                  </p>
                  <p className="text-[10px] text-[#5C4D51]">{app.date} at {app.timeSlot}</p>

                  {app.status === 'Upcoming' && (
                    <button
                      onClick={() => cancelAppointment(app.id)}
                      className="text-[10px] text-rose-500 hover:underline pt-1 block font-semibold"
                    >
                      Cancel Reservation
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirmation(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-4 border border-[#F7CAD0] shadow-2xl z-10"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#33272A]">Appointment Booked!</h3>
              <p className="text-xs text-[#5C4D51]">
                Your studio session with <span className="font-bold text-[#33272A]">{selectedArtist.name}</span> on <span className="font-bold text-[#33272A]">{selectedDate}</span> at <span className="font-bold text-[#33272A]">{selectedTimeSlot}</span> is confirmed.
              </p>

              <button
                onClick={() => setShowConfirmation(false)}
                className="w-full py-3 rounded-2xl bg-[#D98CA3] text-white font-bold text-xs"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
