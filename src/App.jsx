import React from 'react';

const whatsappNumber = '+447541052535'; // placeholder UK mobile number
const phoneNumberDisplay = '+447541052535';

const industries = [
  {
    title: 'Any business, local or online',
    detail: 'From tradespeople to shops to startups - a clean, fast site that makes you look credible and easy to contact.',
  },
  {
    title: 'Bookings & reservations',
    detail: 'Salons, restaurants, clinics, and more - add an AI assistant that handles enquiries and books appointments for you.',
  },
  {
    title: 'Personal brands & new ventures',
    detail: 'Portfolios, freelancers, and side projects that need a simple site live fast.',
  },
];

const aiReservationFeatures = [
  'Answers booking enquiries instantly, day or night',
  'Confirms and reschedules appointments automatically',
  'Sends reminders to cut down no-shows',
  'Works over WhatsApp or a booking widget on your site',
];

const demos = [
  {
    title: 'Barber Shop Demo',
    link: 'https://barbershopinit.netlify.app/', // placeholder live link
    notes: ['Mobile-friendly', 'Click-to-call', 'Google-ready'],
  },
  {
    title: 'Takeaway Demo',
    link: 'https://takeawayinit.netlify.app/', // placeholder live link
    notes: ['Mobile-friendly', 'Click-to-call', 'Google-ready'],
  },
];

const whatYouGet = [
  'Mobile-friendly website',
  'Click-to-call & WhatsApp buttons',
  'Clear services, menu, or portfolio',
  'Google Maps & opening hours',
  'Optional AI reservation & booking assistant',
  'Fast turnaround (5-7 days)',
];

const pricingPoints = [
  'Starter website: GBP 250-500 (one-off)',
  'AI Reservation Assistant: +GBP 40-80/month (optional add-on)',
  'No contracts. Cancel the add-on anytime.',
  'Free preview available.',
];

const highlights = [
  'Built for WhatsApp outreach & DMs',
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

const CTAButtons = ({ primaryText = 'Chat on WhatsApp', secondaryText = 'View Demo Websites' }) => {
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi, I'm interested in a website for my business. Can we chat?"
  )}`;

  return (
    <div className="cta-group">
      <a className="btn primary" href={whatsappLink} target="_blank" rel="noreferrer">
        <span className="dot" aria-hidden="true" />
        {primaryText}
      </a>
      <a className="btn ghost" href="#demos">
        {secondaryText}
      </a>
    </div>
  );
};

const FeatureBadge = ({ text }) => <span className="feature-badge">{text}</span>;

const App = () => {
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi, I'm interested in a website for my business. Can we chat?"
  )}`;

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const name = data.get('name')?.trim() || 'a business owner';
    const business = data.get('business')?.trim() || 'my business';
    const need = data.get('message')?.trim();
    const message = `Hi, I'm ${name} from ${business}. I'd like a quick chat about a new website with trevona.dev.${need ? ` Details: ${need}` : ''}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
    event.target.reset();
  };

  return (
    <div className="page">
      <div className="bg-blob one" aria-hidden="true" />
      <div className="bg-blob two" aria-hidden="true" />
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">t</div>
          <div>
            <span className="brand-name">trevona.dev</span>
            <p className="brand-tagline">Newcastle web design</p>
          </div>
        </div>
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
          <a className="btn small" href={whatsappLink} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-content">
            <div className="eyebrow pill">Newcastle-based | Websites for any business</div>
            <h1>Simple Websites That Help Your Business Get More Customers</h1>
            <p className="lead">
              trevona.dev builds fast, mobile-friendly websites for any business or brand - plus optional AI-powered
              reservation management for businesses that take bookings. No tech stress, no long contracts.
            </p>
            <CTAButtons />
            <div className="hero-highlights">
              {highlights.map((item) => (
                <FeatureBadge key={item} text={item} />
              ))}
            </div>
            <div className="trust-card">
              <div>
                <p className="trust-title">Built for conversations</p>
                <p className="trust-copy">
                  Perfect for WhatsApp outreach, walk-in chats, and quick Instagram DMs. Clear info, fast contact.
                </p>
              </div>
              <div className="trust-meta">
                <span className="dot" aria-hidden="true" />
                Ready in 5-7 days
              </div>
            </div>
          </div>
          <div className="hero-panel">
            <div className="panel-card">
              <p className="panel-kicker">Live-ready structure</p>
              <h3>Show up, look credible, start conversations.</h3>
              <ul className="panel-list">
                <li>Mobile-first layouts that load fast</li>
                <li>Google-friendly sections for services and hours</li>
                <li>Click-to-call and WhatsApp buttons everywhere</li>
              </ul>
              <a className="btn primary full" href={whatsappLink} target="_blank" rel="noreferrer">
                Book a WhatsApp intro
              </a>
              <p className="tiny">No pressure chat. Free preview if you want to see it before you buy.</p>
            </div>
          </div>
        </section>

        <section className="section" id="who">
          <SectionHeader
            eyebrow="Who this is for"
            title="Anyone who needs to be found and contacted fast."
            copy="If people search for you on Google and can't easily find or contact you, trevona.dev can help - whatever you do."
          />
          <div className="card-grid">
            {industries.map((item) => (
              <div className="card" key={item.title}>
                <div className="icon">{item.title[0]}</div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="demos">
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
                  <a className="text-link" href={demo.link} target="_blank" rel="noreferrer">
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
        </section>

        <section className="section" id="what-you-get">
          <SectionHeader eyebrow="What you get" title="Everything needed to turn searches into customers." />
          <div className="list-card">
            <ul>
              {whatYouGet.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" id="ai-reservations">
          <SectionHeader
            eyebrow="Add-on"
            title="Let AI handle your bookings, 24/7."
            copy="For businesses that take appointments or reservations - salons, restaurants, clinics, and more - add an AI assistant that manages enquiries, confirms bookings, and cuts down no-shows, right from WhatsApp or your website."
          />
          <div className="list-card">
            <ul>
              {aiReservationFeatures.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <CTAButtons primaryText="Ask about AI reservations" secondaryText="See pricing" />
        </section>

        <section className="section" id="pricing">
          <SectionHeader eyebrow="Pricing" title="Transparent, one-off pricing." />
          <div className="pricing-card">
            <div>
              <p className="price">GBP 250-500</p>
              <p className="lead">Starter website | One-off payment</p>
            </div>
            <ul>
              {pricingPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <CTAButtons primaryText="Start with WhatsApp" secondaryText="See demos" />
          </div>
        </section>

        <section className="section" id="about">
          <SectionHeader
            eyebrow="About trevona.dev"
            title="Newcastle-based, practical web design for any business."
            copy="trevona.dev helps businesses of every kind look professional online and convert searches into real customers."
          />
          <div className="about-card">
            <p>
              Based in Newcastle, trevona.dev builds simple, trustworthy sites that answer the questions people
              actually ask: what you do, when you're open, and how to contact you right now.
            </p>
            <p>
              Fast setup, honest pricing, and sites tuned for WhatsApp, click-to-call, and Google Maps - with an
              optional AI reservation assistant for businesses that take bookings - so you can close more customers
              without extra work.
            </p>
          </div>
        </section>

        <section className="section contact" id="contact">
          <SectionHeader eyebrow="Contact" title="Chat on WhatsApp for a quick, no-pressure conversation." />
          <div className="contact-grid">
            <div className="contact-card">
              <p className="lead">Prefer WhatsApp? So do most of our clients.</p>
              <div className="contact-actions">
                <a className="btn primary" href={whatsappLink} target="_blank" rel="noreferrer">
                  Chat on WhatsApp
                </a>
                <a className="btn ghost" href={`tel:${phoneNumberDisplay.replace(/\s+/g, '')}`}>
                  Call {phoneNumberDisplay}
                </a>
              </div>
              <p className="tiny">
                We can also share a quick, no-pressure preview of your site before you commit.
              </p>
            </div>
            <div className="form-card">
              <form onSubmit={handleFormSubmit}>
                <label>
                  Name
                  <input name="name" type="text" placeholder="Your name" />
                </label>
                <label>
                  Business
                  <input name="business" type="text" placeholder="e.g. your business or brand name" />
                </label>
                <label>
                  What do you need?
                  <textarea
                    name="message"
                    placeholder="Website for my business, plus AI reservation management if I take bookings."
                  />
                </label>
                <button className="btn primary full" type="submit">
                  Send via WhatsApp
                </button>
                <p className="tiny">No inbox to check - we open WhatsApp with your message ready.</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>trevona.dev - Newcastle-based web design and AI reservation management, for businesses everywhere.</p>
        <a href={whatsappLink} target="_blank" rel="noreferrer">
          Chat on WhatsApp
        </a>
      </footer>
    </div>
  );
};

export default App;
