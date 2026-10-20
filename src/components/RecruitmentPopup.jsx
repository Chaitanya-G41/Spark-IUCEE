import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import recruitmentConfig from '../config/recruitmentConfig';

const DISMISSED_KEY = 'spark-recruitment-popup-dismissed';

const isValidRegistrationUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
};

const RecruitmentPopup = () => {
  const [visible, setVisible] = useState(false);
  const registrationUrl = isValidRegistrationUrl(recruitmentConfig.registrationUrl)
    ? recruitmentConfig.registrationUrl
    : null;

  useEffect(() => {
    if (!recruitmentConfig.recruitmentEnabled || !recruitmentConfig.showRecruitmentPopup) {
      return undefined;
    }

    try {
      if (window.sessionStorage.getItem(DISMISSED_KEY) === 'true') {
        return undefined;
      }
    } catch {
      // Storage can be unavailable in privacy-restricted browsers.
    }

    const timer = window.setTimeout(() => setVisible(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        dismiss();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible]);

  const dismiss = () => {
    setVisible(false);
    try {
      window.sessionStorage.setItem(DISMISSED_KEY, 'true');
    } catch {
      // Dismissal still applies for the current render when storage is unavailable.
    }
  };

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-sparkBlue/70 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-6"
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
    >
      <motion.section
        role="dialog"
        aria-modal="true"
        aria-labelledby="recruitment-popup-title"
        aria-describedby="recruitment-popup-description"
        className="relative my-auto max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/15 bg-sparkBlue/95 p-5 text-white shadow-[0_24px_80px_rgba(3,15,32,0.55)] backdrop-blur-xl sm:max-h-[calc(100vh-3rem)] sm:p-8"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden="true">
          <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full border border-sparkAccent/15" />
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full border border-sparkAccent/10" />
          <div className="absolute bottom-10 left-0 h-px w-40 bg-gradient-to-r from-sparkAccent/40 to-transparent" />
          <div className="absolute bottom-14 left-8 h-px w-24 bg-gradient-to-r from-white/20 to-transparent" />
          <div className="absolute right-8 top-1/2 h-24 w-px bg-gradient-to-b from-transparent via-sparkAccent/25 to-transparent" />
        </div>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Close recruitment announcement"
          className="absolute right-4 top-4 rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sparkAccent"
        >
          <X size={20} />
        </button>

        <div className="relative z-10 pr-7 sm:pr-8">
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center rounded-2xl border border-white/10 bg-white/[0.06] px-2 py-3 sm:px-4 sm:py-4">
            <div className="flex h-14 items-center justify-center sm:h-16">
              <img
                src="/images/rvce.png"
                alt="RVCE Logo"
                loading="eager"
                decoding="async"
                className="block h-11 w-auto max-w-[105px] object-contain invert sm:h-14 sm:max-w-[125px]"
              />
            </div>
            <span className="mx-1 h-9 w-px bg-white/15 sm:mx-2 sm:h-11" aria-hidden="true" />
            <div className="flex h-14 items-center justify-center sm:h-16">
              <img
                src="/spark.png"
                alt="SPARK Logo"
                loading="eager"
                decoding="async"
                className="block h-14 w-14 object-contain sm:h-16 sm:w-16"
              />
            </div>
            <span className="mx-1 h-9 w-px bg-white/15 sm:mx-2 sm:h-11" aria-hidden="true" />
            <div className="flex h-14 items-center justify-center sm:h-16">
              <img
                src="/images/iucee.png"
                alt="IUCEE Logo"
                loading="eager"
                decoding="async"
                className="block h-12 w-12 object-contain sm:h-14 sm:w-14"
              />
            </div>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-sparkAccent/60" aria-hidden="true" />
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.16em] text-sparkAccent sm:text-[11px] sm:tracking-[0.2em]">
              IUCEE Student Chapter · RVCE
            </p>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-sparkAccent/60" aria-hidden="true" />
          </div>
          <h2 id="recruitment-popup-title" className="mt-3 text-2xl font-black leading-[1.08] tracking-tight text-white sm:text-4xl">
            SPARK Recruitment <span className="text-sparkAccent">2026–27</span>
          </h2>
          <p className="mt-4 text-[11px] font-bold leading-5 tracking-[0.1em] text-sparkAccent sm:mt-5 sm:text-sm sm:tracking-[0.16em]">
            Your Ideas. Your Skills. Your SPARK.
          </p>
          <p id="recruitment-popup-description" className="mt-4 text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
            Have a passion for technology, creativity, or innovation? Join SPARK and collaborate with like-minded
            students to turn ideas into impact.
          </p>
          <p className="mt-4 text-sm font-semibold leading-6 text-white/90">
            Be part of the team. Build something meaningful. Make a difference.
          </p>
        </div>

        <div className="relative z-10 mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row">
          {registrationUrl ? (
            <a
              href={registrationUrl}
              target="_blank"
              rel="noreferrer"
              onClick={dismiss}
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-sparkAccent px-5 py-3 text-sm font-bold text-sparkBlue shadow-[0_8px_24px_rgba(25,167,206,0.2)] transition-all hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Register Now →
            </a>
          ) : (
            <span className="inline-flex min-h-12 flex-1 cursor-not-allowed items-center justify-center rounded-xl bg-white/15 px-5 py-3 text-center text-sm font-bold text-white/50">
              Registration unavailable
            </span>
          )}
          <Link
            to="/registrations"
            onClick={dismiss}
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:border-sparkAccent hover:text-sparkAccent focus:outline-none focus-visible:ring-2 focus-visible:ring-sparkAccent"
          >
            Know More
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default RecruitmentPopup;