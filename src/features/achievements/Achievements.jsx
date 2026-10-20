import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ExternalLink, Users, Trophy,
  ChevronLeft, ChevronRight, ImageIcon, Info,
  MapPin, FolderOpen, FileText, Sparkles,
} from 'lucide-react';
import PageShell from '../../components/PageShell';
import Reveal from '../../components/Reveal';
import SEOHead from '../../components/SEOHead';
import { achievementsByYear, achievementYears } from '../../data/achievementsData';

/* ─────────────────────────────────────────────
   Category badge colour map
───────────────────────────────────────────── */
const CATEGORY_COLOURS = {
  'Ideathon':                        'bg-blue-50 text-navy-700',
  'Elocution':                       'bg-purple-50 text-purple-800',
  'Science Exhibition':              'bg-emerald-50 text-emerald-800',
  'Project Showcase':                'bg-amber-50 text-amber-800',
  'Student Chapter Project Showcase':'bg-amber-50 text-amber-800',
  'Chapter Recognition':             'bg-sparkGreen/10 text-sparkGreen',
  'Ideation & Elocution':            'bg-pink-50 text-pink-800',
  'default':                         'bg-slate-100 text-navy-700',
};

function categoryColour(cat) {
  return CATEGORY_COLOURS[cat] || CATEGORY_COLOURS['default'];
}

/* ─────────────────────────────────────────────
   Photo Carousel
───────────────────────────────────────────── */
const PhotoCarousel = ({ images, alt }) => {
  const [current, setCurrent]   = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const hasPhotos = images && images.length > 0;
  const count     = hasPhotos ? images.length : 0;
  const isMulti   = count > 1;

  const goPrev = (e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + count) % count); };
  const goNext = (e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % count); };

  useEffect(() => {
    if (!lightbox) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowLeft' && isMulti) setCurrent((c) => (c - 1 + count) % count);
      if (e.key === 'ArrowRight' && isMulti) setCurrent((c) => (c + 1) % count);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightbox, isMulti, count]);

  return (
    <>
      <div className="relative w-full h-56 overflow-hidden bg-slate-100">
        {hasPhotos ? (
          <>
            <AnimatePresence mode="wait" initial={false}>
              <motion.button
                key={current}
                type="button"
                onClick={() => setLightbox(true)}
                aria-label={`View photo ${current + 1} of ${count} in full size`}
                className="absolute inset-0 w-full h-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sparkAccent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={images[current]}
                  alt={`${alt} — photo ${current + 1} of ${count}`}
                  loading="lazy"
                  className="h-full w-full object-contain"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </motion.button>
            </AnimatePresence>

            {/* Gradient overlay matching Events page */}
            <div className="absolute inset-0 bg-gradient-to-t from-sparkBlue/80 via-sparkBlue/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

            {/* Category badge on image */}

            {isMulti && (
              <button type="button" onClick={goPrev} aria-label="Previous photo"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/75 focus:outline-none">
                <ChevronLeft size={18} />
              </button>
            )}
            {isMulti && (
              <button type="button" onClick={goNext} aria-label="Next photo"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/75 focus:outline-none">
                <ChevronRight size={18} />
              </button>
            )}
            {isMulti && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                {images.map((_, i) => (
                  <button key={i} type="button"
                    onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                    aria-label={`Go to photo ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-200 focus:outline-none ${i === current ? 'w-4 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'}`}
                  />
                ))}
              </div>
            )}
            {isMulti && (
              <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/20">
                📷 +{count} Photos
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-100 to-slate-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70 shadow-sm">
              <ImageIcon size={22} className="text-slate-400" aria-hidden="true" />
            </div>
            <p className="text-xs font-medium text-slate-400 select-none">Photo coming soon</p>
          </div>
        )}
      </div>

      {/* Lightbox — portaled so overflow/transform on cards cannot clip it */}
      {createPortal(
        <AnimatePresence>
          {lightbox && hasPhotos && (
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/92 p-4"
              onClick={() => setLightbox(false)}
            >
              <button type="button" onClick={() => setLightbox(false)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 focus:outline-none"
                aria-label="Close lightbox"><X size={20} /></button>
              {isMulti && (
                <button type="button" onClick={goPrev}
                  className="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 focus:outline-none"
                  aria-label="Previous photo"><ChevronLeft size={22} /></button>
              )}
              <AnimatePresence mode="wait" initial={false}>
                <motion.img key={current}
                  initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.18 }}
                  src={images[current]} alt={`${alt} — photo ${current + 1} of ${count}`}
                  className="h-auto w-auto max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
              </AnimatePresence>
              {isMulti && (
                <button type="button" onClick={goNext}
                  className="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 focus:outline-none"
                  aria-label="Next photo"><ChevronRight size={22} /></button>
              )}
              {isMulti && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 text-sm text-white select-none">
                  {current + 1} / {count}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

/* ─────────────────────────────────────────────
   Info Modal — shows extra details
───────────────────────────────────────────── */
const InfoModal = ({ achievement, onClose }) => {
  const hasLocation = !!achievement.location;
  const hasProject  = !!achievement.projectTitle;
  const hasDesc     = !!achievement.description;
  const hasLink     = !!achievement.eventLink;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9990] flex items-center justify-center bg-sparkBlue/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 12 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 focus:outline-none"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-6 pr-8">
          <span className={`inline-block rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider ${categoryColour(achievement.category)}`}>
            {achievement.category}
          </span>
          <h3 className="mt-3 text-2xl font-black leading-snug text-sparkBlue">
            {achievement.eventName}
          </h3>
          <p className="mt-2 flex items-center gap-2 text-base font-bold text-sparkAccent">
            <Trophy size={16} aria-hidden="true" />
            {achievement.award}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {hasLocation && (
            <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-3">
              <MapPin size={15} className="mt-0.5 shrink-0 text-sparkGreen" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-navy-400 mb-0.5">Location</p>
                <p className="text-sm text-navy-800">{achievement.location}</p>
              </div>
            </div>
          )}

          {hasProject && (
            <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-3">
              <FolderOpen size={15} className="mt-0.5 shrink-0 text-sparkAccent" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-navy-400 mb-0.5">Project</p>
                <p className="text-sm font-semibold text-navy-800">{achievement.projectTitle}</p>
              </div>
            </div>
          )}

          {hasDesc && (
            <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-3">
              <FileText size={15} className="mt-0.5 shrink-0 text-sparkBlue" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-navy-400 mb-0.5">Description</p>
                <p className="text-sm leading-relaxed text-navy-700">{achievement.description}</p>
              </div>
            </div>
          )}

          {hasLink && (
            <a
              href={achievement.eventLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-2 self-start rounded-xl bg-sparkBlue px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-sparkAccent"
            >
              <ExternalLink size={14} />
              View Event
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Achievement Card — premium styling matching Events page
───────────────────────────────────────────── */
const AchievementCard = ({ achievement }) => {
  const [infoOpen, setInfoOpen] = useState(false);

  const hasMembers = achievement.teamMembers && achievement.teamMembers.length > 0;
  const hasPhotos  = achievement.images && achievement.images.length > 0;

  // Extra info = anything beyond the standard uniform fields
  const hasExtra =
    !!achievement.location ||
    !!achievement.projectTitle ||
    !!achievement.description ||
    !!achievement.eventLink;

  return (
    <>
      <article className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-default relative">

        {/* ① Photo slot — only rendered when achievement has photos */}
        {hasPhotos && (
          <div className="relative">
            <PhotoCarousel
              images={achievement.images}
              alt={`${achievement.eventName} — ${achievement.award}`}
            />
            {/* Category badge overlaid on image */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <span className="px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-sparkBlue/90 backdrop-blur-md text-white border border-white/20 shadow-md">
                {achievement.category}
              </span>
            </div>
            {/* Award badge on image bottom */}
            <div className="absolute bottom-3 left-4 right-4 z-10 pointer-events-none flex items-center gap-2 text-white/90 text-xs font-semibold">
              <Trophy size={14} className="text-sparkAccent" />
              <span>{achievement.award}</span>
            </div>
          </div>
        )}

        {/* ② Card content body */}
        <div className="flex flex-1 flex-col p-7">

          {/* Category badge (shown only when no photo, since it's on the image otherwise) */}
          {!hasPhotos && (
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryColour(achievement.category)}`}>
                {achievement.category}
              </span>
              {hasExtra && (
                <button
                  type="button"
                  onClick={() => setInfoOpen(true)}
                  aria-label="View more details"
                  title="More details"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-navy-400 transition hover:bg-slate-100 hover:text-sparkAccent focus:outline-none focus-visible:ring-2 focus-visible:ring-sparkAccent"
                >
                  <Info size={16} />
                </button>
              )}
            </div>
          )}

          {/* Event name */}
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            {achievement.eventName}
          </p>

          {/* Award (shown prominently when no photo since it's not on the image) */}
          {!hasPhotos && (
            <div className="flex items-start gap-2 mb-4">
              <Trophy size={17} className="mt-0.5 shrink-0 text-sparkAccent" aria-hidden="true" />
              <h3 className="text-base font-black leading-snug text-sparkBlue group-hover:text-sparkAccent transition-colors duration-300">
                {achievement.award}
              </h3>
            </div>
          )}

          {/* Title when has photo — show award as heading */}
          {hasPhotos && (
            <h3 className="text-xl font-black text-sparkBlue group-hover:text-sparkAccent transition-colors duration-200 mb-3 leading-snug">
              {achievement.award}
            </h3>
          )}

          {/* Info button row for photo cards */}
          {hasPhotos && hasExtra && (
            <button
              type="button"
              onClick={() => setInfoOpen(true)}
              aria-label="View more details"
              className="mb-3 inline-flex items-center gap-1.5 self-start text-xs font-bold text-sparkBlue hover:text-sparkAccent transition-colors"
            >
              <Info size={14} />
              More Details
            </button>
          )}

          {/* Team members — always at the bottom, pushed down */}
          <div className="mt-auto pt-5 border-t border-slate-100">
            <div className="flex items-center gap-1.5 mb-2">
              <Users size={13} className="text-navy-400 shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-navy-400">Team</span>
            </div>

            {hasMembers ? (
              <div className="flex flex-wrap gap-1.5">
                {achievement.teamMembers.map((member) => (
                  <span
                    key={member}
                    className="rounded-lg bg-sparkBlue/5 border border-sparkBlue/10 px-2.5 py-1 text-xs font-semibold text-sparkBlue"
                  >
                    {member}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-navy-400 italic">Chapter-wide recognition</p>
            )}
          </div>

        </div>
      </article>

      {createPortal(
        <AnimatePresence>
          {infoOpen && (
            <InfoModal achievement={achievement} onClose={() => setInfoOpen(false)} />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

/* ─────────────────────────────────────────────
   Interactive Year Timeline Selector
   (matching the Events & Activities page)
───────────────────────────────────────────── */
const YearTimeline = ({ years, selected, onChange }) => {
  const yearCounts = {};
  years.forEach((key) => {
    yearCounts[key] = achievementsByYear[key]?.achievements?.length || 0;
  });

  return (
    <div className="mb-14 max-w-4xl mx-auto px-4">
      <div className="relative flex items-center justify-between py-6">
        {/* Connecting background line */}
        <div className="absolute top-1/2 left-[8%] right-[8%] h-1 bg-slate-200 -translate-y-1/2 rounded-full z-0" />

        {/* Progress active line */}
        <motion.div
          className="absolute top-1/2 left-[8%] h-1 bg-gradient-to-r from-sparkAccent to-sparkGreen -translate-y-1/2 rounded-full z-0"
          initial={false}
          animate={{
            width: `${(years.indexOf(selected) / (years.length - 1)) * 84}%`
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        />

        {/* Year Nodes */}
        {years.map((key, idx) => {
          const label = achievementsByYear[key]?.label || key;
          const isSelected = key === selected;
          const isPast = years.indexOf(selected) >= idx;
          const count = yearCounts[key];

          return (
            <div key={key} className="relative z-10 flex flex-col items-center">
              <button
                type="button"
                role="tab"
                aria-selected={isSelected}
                id={`tab-${key}`}
                aria-controls={`panel-${key}`}
                onClick={() => onChange(key)}
                className={`relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl font-black text-sm md:text-base transition-all duration-300 shadow-md ${
                  isSelected
                    ? 'bg-sparkBlue text-white ring-4 ring-sparkAccent/30 scale-110 shadow-xl'
                    : isPast
                    ? 'bg-white text-sparkBlue border-2 border-sparkAccent hover:scale-105'
                    : 'bg-white text-slate-400 border-2 border-slate-200 hover:border-slate-300 hover:scale-105'
                }`}
              >
                {label}
                {isSelected && (
                  <motion.span
                    layoutId="timeline-active-achievement"
                    className="absolute -bottom-2 w-3 h-3 rounded-full bg-sparkGreen shadow-[0_0_12px_#85C227]"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </button>
              <span className={`mt-3 text-xs font-bold tracking-wider uppercase ${
                isSelected ? 'text-sparkBlue' : 'text-slate-400'
              }`}>
                {count} {count === 1 ? 'Award' : 'Awards'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Year sub-banner */}
      <div className="mt-4 text-center bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm">
        <h3 className="text-lg font-bold text-sparkBlue">
          {achievementsByYear[selected]?.label || selected}: <span className="text-sparkAccent">Achievements & Recognitions</span>
        </h3>
        <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-2xl mx-auto">
          Competition wins, special mentions, and chapter recognitions for this academic year.
        </p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Achievements Page
───────────────────────────────────────────── */
const Achievements = () => {
  const [selectedYear, setSelectedYear] = useState('2026-27');

  const yearData     = achievementsByYear[selectedYear];
  const achievements = yearData?.achievements || [];
  const withPhotos    = useMemo(() => achievements.filter(a => a.images && a.images.length > 0), [achievements]);
  const withoutPhotos = useMemo(() => achievements.filter(a => !a.images || a.images.length === 0), [achievements]);

  return (
    <PageShell
      title="Achievements"
      subtitle="Celebrating innovation, excellence, and the achievements of SPARK members."
    >
      <SEOHead
        title="Achievements | SPARK IUCEE RVCE"
        description="Explore the competition wins, special mentions, and chapter recognitions earned by SPARK IUCEE RVCE members across academic years."
        path="/achievements"
      />

      <section className="w-full bg-slate-50 py-24 px-6 md:px-12 xl:px-20 relative overflow-hidden border-t border-slate-200/60">
        {/* Decorative background glow circles matching Events page */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-sparkAccent/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-sparkGreen/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-screen-2xl mx-auto relative z-10">

          {/* ── Centered Section Title Header (matching Events page) ── */}
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sparkBlue/5 border border-sparkBlue/10 text-sparkBlue text-xs font-bold uppercase tracking-widest mb-4">
                <Sparkles size={0} className="text-sparkAccent" /> SPARK Hall of Fame
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-sparkBlue leading-tight mb-4">
                Award-Winning Excellence
              </h2>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                From national forums to inter-college competitions, SPARK members consistently represent RVCE with distinction.
              </p>
            </div>
          </Reveal>

          {/* ── Interactive Year Timeline Selector ── */}
          <Reveal delay={0.1}>
            <YearTimeline years={achievementYears} selected={selectedYear} onChange={setSelectedYear} />
          </Reveal>

          {/* ── Achievements Grid ── */}
          <div id={`panel-${selectedYear}`} role="tabpanel" aria-labelledby={`tab-${selectedYear}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedYear}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {achievements.length > 0 ? (
                  <>
                    {/* With-photos grid */}
                    {withPhotos.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {withPhotos.map((achievement, i) => (
                          <Reveal key={achievement.id} delay={0.05 * (i % 6)} className="h-full">
                            <AchievementCard achievement={achievement} />
                          </Reveal>
                        ))}
                      </div>
                    )}

                    {/* Without-photos grid — separate row, left-aligned */}
                    {withoutPhotos.length > 0 && (
                      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8${withPhotos.length > 0 ? ' mt-8' : ''}`}>
                        {withoutPhotos.map((achievement, i) => (
                          <Reveal key={achievement.id} delay={0.05 * (i % 6)} className="h-full">
                            <AchievementCard achievement={achievement} />
                          </Reveal>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sparkBlue/5">
                      <Trophy size={28} className="text-sparkBlue/40" />
                    </div>
                    <h3 className="text-xl font-bold text-navy-900">No Achievements Listed</h3>
                    <p className="mt-2 text-navy-600">Check back soon — achievements for this year will be added shortly.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>
    </PageShell>
  );
};

export default Achievements;
