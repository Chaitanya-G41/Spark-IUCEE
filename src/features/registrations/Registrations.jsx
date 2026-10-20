import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageShell from '../../components/PageShell';
import recruitmentConfig from '../../config/recruitmentConfig';

// You can add more events to this array as they come up
const registrationsData = [
  {
    id: 1,
    category: 'Club Recruitment',
    year: '2026',
    date: '28th & 30th October',
    title: 'Club Recruitment Drive - Round 1',
    theme: 'Join the Innovation Hub',
    summary: 'Join SPARK IUCEE RVCE! We\'re looking for enthusiastic students passionate about innovation, hands-on learning, and creating an impact through technical projects, leadership, and collaboration.',
    description: 'Ready to innovate, create, and lead? SPARK IUCEE RVCE is welcoming enthusiastic students to join its diverse team. Gain hands-on experience through practical projects, competitions, workshops, and industrial visits while developing technical and leadership skills. We\'re looking for curious minds eager to learn, collaborate, and turn ideas into impact! \n\n📅 Recruitment Dates: 28th & 30th October 2026 \n⏰ Time: 4:30 PM – 6:30 PM \n📍 Venue: Will be updated soon !',
    formLink: recruitmentConfig.registrationUrl,
    instaLink: 'https://www.instagram.com/reel/DerUB6BxI45/?exln=MTc3b2Fyc3M3dGFzcA==',
  },
];

const Registrations = () => {
  const [selectedRegistration, setSelectedRegistration] = useState(null);

  const closeModal = () => {
    setSelectedRegistration(null);
  };

  return (
    <PageShell
      title="Registrations"
      subtitle="Join SPARK IUCEE initiatives, workshops, and upcoming flagship events."
    >
      <section className="bg-slate-50 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          
          {/* Page Introduction */}
          <div className="mb-12">
            <h2 className="mt-3 text-3xl font-bold text-navy-900 md:text-4xl">
              Active Registrations
            </h2>
            <p className="mt-4 text-navy-700 max-w-full">
              Explore open recruitments, events, and opportunities at SPARK IUCEE RVCE. Discover ways to innovate, collaborate, develop new skills, and create an impact!
            </p>
          </div>

          {/* Registrations Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {registrationsData.map((reg) => (
              <article
                key={reg.id}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-sparkAccent/30"
              >
                {/* Category, Year, and Date */}
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-navy-700">
                    {reg.category}
                  </span>
                  <div className="flex flex-col items-end text-right">
                    <span className="shrink-0 text-sm font-medium text-navy-600">
                      {reg.year}
                    </span>
                    {reg.date && (
                      <span className="mt-0.5 text-xs text-navy-500">
                        {reg.date}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="mt-5 text-xl font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-sparkAccent">
                  {reg.title}
                </h3>

                {/* Theme */}
                <p className="mt-3 text-sm font-medium text-navy-700">
                  {reg.theme}
                </p>

                {/* Summary */}
                <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-navy-700">
                  {reg.summary}
                </p>

                {/* View Details Button */}
                <button
                  type="button"
                  onClick={() => setSelectedRegistration(reg)}
                  className="mt-auto pt-6 text-left font-semibold text-sparkBlue transition-colors duration-300 hover:opacity-70 group-hover:text-sparkAccent"
                >
                  View Details →
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Details Modal */}
      {selectedRegistration && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl md:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-5 top-5 text-3xl font-light leading-none text-slate-500 transition hover:text-slate-900"
              aria-label="Close details"
            >
              ×
            </button>

            {/* Category, Year, and Date */}
            <div className="flex flex-wrap items-center gap-3 pr-10">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-navy-700">
                {selectedRegistration.category}
              </span>
              <span className="text-sm font-medium text-navy-600">
                {selectedRegistration.year}
              </span>
              {selectedRegistration.date && (
                <>
                  <span className="text-navy-300">•</span>
                  <span className="text-sm font-medium text-navy-600">
                    {selectedRegistration.date}
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h2 className="mt-5 text-2xl font-bold leading-tight text-navy-900 md:text-4xl">
              {selectedRegistration.title}
            </h2>

            {/* Theme */}
            <p className="mt-3 font-medium text-navy-700">
              {selectedRegistration.theme}
            </p>

            {/* Description */}
            <div className="mt-10">
              <h3 className="text-xl font-bold text-navy-900">
                About the Drive
              </h3>
              <p className="mt-4 whitespace-pre-line leading-8 text-navy-700">
                {selectedRegistration.description}
              </p>
            </div>

            {/* Action Buttons */}
            {/*Google Forms link button*/}
            <div className="mt-10 flex gap-4">
              <a
                href={selectedRegistration.formLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-xl bg-[#001D3D] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-sparkAccent hover:shadow-lg"
              >
                Register Now →
              </a>
              {/*Instagram Reel button*/}
              <a
                href={selectedRegistration.instaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-xl bg-[#001D3D] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-sparkAccent hover:shadow-lg"
              >
                Check out the Instagram Reel →
              </a>
            </div>

          </div>
        </div>
      )}
    </PageShell>
  );
};

export default Registrations;