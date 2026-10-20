import React from 'react';
import { Link } from 'react-router-dom';
import recruitmentConfig from '../config/recruitmentConfig';

const ANNOUNCEMENT_ITEMS = [
  'Join the SPARK Team',
  'Discover Your Potential',
  'Applications Open Now',
];

const isValidRegistrationUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
};

const AnnouncementTrack = () => (
  <div className="recruitment-marquee-track" aria-hidden="true">
    {[0, 1].map((copy) => (
      <div className="recruitment-marquee-copy" key={copy}>
        {ANNOUNCEMENT_ITEMS.map((item) => (
          <React.Fragment key={`${copy}-${item}`}>
            <span>{item}</span>
            <span className="recruitment-marquee-separator">•</span>
          </React.Fragment>
        ))}
      </div>
    ))}
  </div>
);

const RecruitmentMarquee = () => {
  if (!recruitmentConfig.recruitmentEnabled) {
    return null;
  }

  const registrationUrl = isValidRegistrationUrl(recruitmentConfig.registrationUrl)
    ? recruitmentConfig.registrationUrl
    : null;

  return (
    <section
      className="recruitment-marquee mx-auto mb-8 w-full max-w-4xl"
      aria-label="SPARK recruitment announcement"
    >
      <p className="sr-only">
        Now recruiting. Join the SPARK Team. Discover Your Potential. Applications Open Now.
      </p>
      <div className="recruitment-marquee-content">
        <span className="recruitment-marquee-badge">Now Recruiting</span>
        <div className="recruitment-marquee-window">
          <AnnouncementTrack />
        </div>
      </div>
      <div className="recruitment-marquee-actions">
        <Link
          to="/registrations"
          className="recruitment-marquee-button recruitment-marquee-button-secondary"
        >
          Know More
        </Link>
        {registrationUrl ? (
          <a
            href={registrationUrl}
            target="_blank"
            rel="noreferrer"
            className="recruitment-marquee-button recruitment-marquee-button-primary"
          >
            Register Now
          </a>
        ) : (
          <span className="recruitment-marquee-button recruitment-marquee-button-disabled">
            Register Now
          </span>
        )}
      </div>
    </section>
  );
};

export default RecruitmentMarquee;