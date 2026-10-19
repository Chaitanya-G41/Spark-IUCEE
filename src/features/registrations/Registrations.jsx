import React from 'react';
import { motion } from 'framer-motion';
import PageShell from '../../components/PageShell';

const Registrations = () => {
  return (
    <PageShell
      title="Registrations"
      subtitle="Join SPARK IUCEE initiatives, workshops, and upcoming flagship events."
    >
      <section className="bg-slate-50 px-6 py-20 md:py-32">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-10 text-center shadow-lg md:p-16"
          >
            {/* Background Accent Blur */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sparkAccent/15 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-sparkBlue/10 blur-[80px]" />

            <h2 className="relative text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              Registrations starting soon
            </h2>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
};

export default Registrations;
