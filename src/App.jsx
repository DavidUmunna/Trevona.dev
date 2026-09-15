import React, { useState } from 'react';
import logoMark from './assets/logo2.svg';
import { trackEvent } from './analytics';
import CommissionCalculator from './components/CommissionCalculator';

const phoneNumberDisplay = '+447541052535'; // placeholder UK mobile number

const serviceBands = [
  {
    title: 'Any business, local or online',
    detail: 'From tradespeople to shops to startups - a clean, fast site that makes you look credible and easy to contact.',
    bg: 'pink',
    image: '/illustrations/team-collab.svg',
    imageAlt: 'Illustration of a team collaborating around a laptop',
  },
  {
    title: 'Bookings & reservations',
    detail: 'Salons, restaurants, clinics, and more - add an AI assistant that handles enquiries and books appointments for you.',
    bg: 'blue',
    reverse: true,
    image: '/illustrations/hero-dashboard.svg',
    imageAlt: 'Illustration of a booking dashboard with charts',
  },
  {
    title: 'Personal brands & new ventures',
    detail: 'Portfolios, freelancers, and side projects that need a simple site live fast.',
    bg: 'pink',
  },
];

const whatYouGet = [
  'Mobile-friendly website',
  'Click-to-call & contact form built in',
  'Clear services, menu, or portfolio',
  'Google Maps & opening hours',
  'Fast turnaround (5-7 days)',
];

const aiReservationFeatures = [
  'Answers booking enquiries instantly, day or night',
  'Confirms and reschedules appointments automatically',
  'Sends reminders to cut down no-shows',
  'Works through a booking widget on your website',
];

const aiPhoneAssistantFeatures = [
  "Answers incoming calls 24/7, even when you're on a job or closed",
  'Takes messages or books appointments by voice',
  'Forwards urgent calls through to you live',
  "Works alongside your website's AI Reservation Assistant - one covers your site, one covers your phone",
];

const demos = [
  {
    name: 'barbershop',
    title: 'Barber Shop Demo',
    link: 'https://barbershopinit.netlify.app/', // placeholder live link
    notes: ['Mobile-friendly', 'Click-to-call', 'Google-ready'],
  },
  {
    name: 'takeaway',
    title: 'Takeaway Demo',
    link: 'https://takeawayinit.netlify.app/', // placeholder live link
    notes: ['Mobile-friendly', 'Click-to-call', 'Google-ready'],
  },
];

const pricingPoints = [
  'Starter website: GBP 250-500 (one-off)',
  'AI Reservation Assistant: +GBP 40-80/month (optional add-on)',
  'Post-launch maintenance: GBP 50 per request',
  'No contracts. Cancel the add-on anytime.',
  'Free preview available.',
];

const highlights = [
  'Simple contact form, fast replies',
  'Google-ready structure',
  'Optional AI reservation assistant',
  'No long contracts, just results',
];

const SectionHeader = ({ eyebrow, title, copy }) => (
  <div className="section-header">
    {eyebrow && <span className="eyebrow">{eyebrow}</span>}
    <h2>{title}</h2>
    {copy && <p className="lead">{copy}</p>}
  </div>
);

const CTAButtons = ({
  primaryText = 'Get in Touch',
  secondaryText = 'View Demo Websites',
  secondaryHref = '#demos',
  ctaLocation,
}) => {
  const handlePrimaryClick = () => {
    if (ctaLocation) {
      trackEvent('cta_click', { cta_location: ctaLocation });
    }
  };

  return (
    <div className="cta-group">
      <a className="btn primary" href="#contact" onClick={handlePrimaryClick}>
        {primaryText}
        <span className="arrow" aria-hidden="true" />
      </a>
      <a className="btn ghost" href={secondaryHref}>
        {secondaryText}
      </a>
    </div>
  );
};

const FeatureBadge = ({ text }) => <span className="feature-badge">{text}</span>;

const encodeForNetlify = (data) =>
  Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');

const App = () => {
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | sent | error

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = Object.fromEntries(new FormData(form).entries());

    setFormStatus('sending');
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeForNetlify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Form submission failed with status ${response.status}`);
        }
        trackEvent('contact_form_submit', { method: 'contact_form' });
        setFormStatus('sent');
        form.reset();
      })
      .catch(() => setFormStatus('error'));
  };

  return (
    <div className="page">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="trevona.dev - back to home">
          <img className="brand-mark" src={logoMark} alt="" />
          <div>
            <span className="brand-name">trevona.dev</span>
            <p className="brand-tagline">More customers. Not just a website.</p>
          </div>
        </a>
        <div className="top-actions">
          <a className="nav-link" href="#ai-reservations">
            AI Booking
          </a>
          <a className="nav-link" href="#pricing">
            Pricing
          </a>
          <a className="nav-link" href="#contact">
            Contact
          </a>
          <a
            className="btn small primary"
            href="#contact"
            onClick={() => trackEvent('cta_click', { cta_location: 'nav' })}
          >
            Get in Touch
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-content">
            <span className="eyebrow">Websites for any business, anywhere</span>
            <h1>Simple Websites That Help Your Business Get More Customers</h1>
            <p className="lead">
              trevona.dev builds fast, mobile-friendly websites for any business or brand - plus optional AI-powered
              reservation management for businesses that take bookings. No tech stress, no long contracts.
            </p>
            <CTAButtons ctaLocation="hero" />
            <div className="hero-highlights">
              {highlights.map((item) => (
                <FeatureBadge key={item} text={item} />
              ))}
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-blob" aria-hidden="true" />
            <img
              className="hero-illustration"
              src="/illustrations/hero-dashboard.svg"
              alt="Illustration of two people reviewing business dashboard charts"
            />
          </div>
        </section>

        <section className="section tight" id="about">
          <div className="inner">
            <div className="capsule-panel">
              <h2>Why trevona.dev</h2>
              <div>
                <p>
                  trevona.dev builds simple, trustworthy sites that answer the questions people actually ask: what
                  you do, when you're open, and how to contact you right now.
                </p>
                <p style={{ marginTop: 14 }}>
                  Fast setup, honest pricing, and sites tuned for click-to-call, contact forms, and Google Maps - with
                  an optional AI reservation assistant for businesses that take bookings - so you can close more
                  customers without extra work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="who">
          <div className="inner">
            <SectionHeader
              eyebrow="Who this is for"
              title="Our Services"
              copy="Anyone who needs to be found and contacted fast - whatever you do."
            />
            {serviceBands.map((band) => (
              <div className={`service-band ${band.bg}${band.reverse ? ' reverse' : ''}`} key={band.title}>
                <div>
                  <h3>{band.title}</h3>
                  <p>{band.detail}</p>
                  <div className="cta-group">
                    <a className="btn ghost small" href="#contact">
                      Learn More
                      <span className="arrow" aria-hidden="true" />
                    </a>
                  </div>
                </div>
                {band.image && (
                  <div className="service-band-media">
                    <img src={band.image} alt={band.imageAlt} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="what-you-get">
          <div className="inner">
            <SectionHeader eyebrow="Service Map" title="Everything needed to turn searches into customers." />
            <div className="feature-row">
              <h3>What you get</h3>
              <ul>
                {whatYouGet.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="ai-reservations">
          <div className="inner">
            <SectionHeader
              eyebrow="Add-on"
              title="Let AI handle your bookings, 24/7."
              copy="For businesses that take appointments or reservations - salons, restaurants, clinics, and more - add an AI assistant that manages enquiries, confirms bookings, and cuts down no-shows, right from your website."
            />
            <div className="feature-row">
              <h3>AI Reservation Assistant</h3>
              <ul>
                {aiReservationFeatures.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="feature-row-note">
                Industry data: businesses using AI-handled booking report around 75% fewer missed calls and 23% more
                booked appointments on average.*
              </p>
            </div>
            <CTAButtons primaryText="Ask about AI reservations" secondaryText="See pricing" secondaryHref="#pricing" />
          </div>
        </section>

        <section className="section" id="ai-phone-assistant">
          <div className="inner">
            <SectionHeader
              eyebrow="Add-on"
              title="Never miss a call again."
              copy="Most customers still pick up the phone before they fill in a form. The AI Phone Assistant answers your business calls day or night, takes a message or books the appointment, and forwards anything urgent straight through to you."
            />
            <div className="feature-row">
              <h3>AI Phone Assistant</h3>
              <ul>
                {aiPhoneAssistantFeatures.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <CTAButtons
              primaryText="Ask about the Phone Assistant"
              secondaryText="See pricing"
              secondaryHref="#pricing"
              ctaLocation="ai_phone_assistant"
            />
          </div>
        </section>

        <section id="commission-calculator" className="section">
          <div className="inner">
            <SectionHeader
              eyebrow="Commission check"
              title="See what your booking platform is actually costing you"
              copy="Marketplace platforms take a cut of every booking, forever. See roughly what that adds up to over a year."
            />
            <CommissionCalculator />
          </div>
        </section>

        <section className="section" id="demos">
          <div className="inner">
            <SectionHeader
              eyebrow="Demo websites"
              title="See exactly what customers will see on their phones."
              copy="These demo websites show the kind of quality and structure you'll get - fully customised to you, whatever your business."
            />
            <div className="card-grid demos">
              {demos.map((demo) => (
                <div className="card demo-card" key={demo.title}>
                  <div className="demo-header">
                    <div>
                      <p className="eyebrow">Live demo</p>
                      <h3>{demo.title}</h3>
                    </div>
                    <a
                      className="text-link"
                      href={demo.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackEvent('demo_site_click', { demo_name: demo.name })}
                    >
                      Open
                    </a>
                  </div>
                  <div className="demo-preview">
                    {demo.notes.map((note) => (
                      <FeatureBadge key={note} text={note} />
                    ))}
                  </div>
                  <p className="tiny">These are demo websites; your site will be fully customised to your business.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="pricing">
          <div className="inner">
            <SectionHeader eyebrow="Pricing" title="Transparent, one-off pricing." />
            <div className="pricing-panel">
              <div className="pricing-grid">
                <div>
                  <p className="price">GBP 250-500</p>
                  <p className="lead">Starter website | One-off payment</p>
                </div>
                <ul>
                  {pricingPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <CTAButtons primaryText="Get Started" secondaryText="See demos" />
              </div>
              <p className="lead">
                No 3-month agency wait. No 20%+ commission on every booking. A free preview before you pay anything.
              </p>
              <p className="tiny">
                *Industry-wide figures for AI phone/booking automation adoption, not a guarantee for any specific
                business.
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="inner">
            <SectionHeader eyebrow="Contact" title="Send a message for a quick, no-pressure conversation." />
            <div className="contact-panel">
              <div className="contact-blob one" aria-hidden="true" />
              <div className="contact-blob two" aria-hidden="true" />
              <div className="contact-grid">
                <div className="contact-card">
                  <p className="lead">Fill in the form and we'll get back to you fast.</p>
                  <p className="tiny">
                    Prefer to talk? Use the call button in the corner. We can also share a quick, no-pressure preview
                    of your site before you commit.
                  </p>
                </div>
                <div className="form-card">
                  {formStatus === 'sent' ? (
                    <div className="form-success">
                      <h3>Thanks - message sent!</h3>
                      <p>We've got your details and will get back to you shortly.</p>
                    </div>
                  ) : (
                    <form
                      name="contact"
                      method="POST"
                      data-netlify="true"
                      netlify-honeypot="bot-field"
                      onSubmit={handleFormSubmit}
                    >
                      <input type="hidden" name="form-name" value="contact" />
                      <p className="hp-field" aria-hidden="true">
                        <label>
                          Leave this field blank
                          <input name="bot-field" tabIndex="-1" autoComplete="off" />
                        </label>
                      </p>
                      <label>
                        Name
                        <input name="name" type="text" placeholder="Your name" required />
                      </label>
                      <label>
                        Business
                        <input name="business" type="text" placeholder="e.g. your business or brand name" />
                      </label>
                      <label>
                        Email or phone
                        <input name="contact" type="text" placeholder="How should we reach you back?" required />
                      </label>
                      <label>
                        What do you need?
                        <textarea
                          name="message"
                          placeholder="Website for my business, plus AI reservation management if I take bookings."
                          required
                        />
                      </label>
                      <button className="btn primary full" type="submit" disabled={formStatus === 'sending'}>
                        {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                      </button>
                      {formStatus === 'error' && (
                        <p className="form-error">Something went wrong sending that - please try again.</p>
                      )}
                      <p className="tiny">We reply by email or phone, usually within one business day.</p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>trevona.dev - Web design and AI reservation management, for businesses everywhere.</p>
        <a href="#contact" onClick={() => trackEvent('cta_click', { cta_location: 'footer' })}>
          Get in Touch
        </a>
      </footer>

      <a
        className="call-fab"
        href={`tel:${phoneNumberDisplay.replace(/\s+/g, '')}`}
        aria-label="Call us"
        onClick={() => trackEvent('call_button_click', { location: 'floating_button' })}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
    </div>
  );
};

export default App;
