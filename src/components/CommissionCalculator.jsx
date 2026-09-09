import React, { useState } from 'react';
import { trackEvent } from '../analytics';

const PLATFORM_RATES = {
  fresha: 20,
  treatwell: 42,
  booksy: 30,
};

const PLATFORM_LABELS = {
  fresha: 'Fresha',
  treatwell: 'Treatwell',
  booksy: 'Booksy',
  custom: 'Your platform',
};

const formatGBP = (value) => `£${Math.round(Math.max(value, 0)).toLocaleString('en-GB')}`;

const CommissionCalculator = () => {
  const [platform, setPlatform] = useState('fresha');
  const [customRate, setCustomRate] = useState('');
  const [newClients, setNewClients] = useState(10);
  const [avgSpend, setAvgSpend] = useState(30);
  const [hasTrackedUsage, setHasTrackedUsage] = useState(false);

  const ratePercent = platform === 'custom' ? parseFloat(customRate) || 0 : PLATFORM_RATES[platform];
  const clients = parseFloat(newClients) || 0;
  const spend = parseFloat(avgSpend) || 0;
  const monthlyCommissionCost = clients * spend * (ratePercent / 100);
  const annualCommissionCost = monthlyCommissionCost * 12;

  const handleInputBlur = () => {
    if (!hasTrackedUsage) {
      setHasTrackedUsage(true);
      trackEvent('calculator_used', { platform });
    }
  };

  const handleCtaClick = () => {
    trackEvent('cta_click', { cta_location: 'commission_calculator' });
  };

  return (
    <div className="form-card calculator-card">
      <div className="calculator-grid">
        <label>
          Booking platform
          <select value={platform} onChange={(event) => setPlatform(event.target.value)} onBlur={handleInputBlur}>
            <option value="fresha">Fresha (20%)</option>
            <option value="treatwell">Treatwell (42%)</option>
            <option value="booksy">Booksy (30%)</option>
            <option value="custom">Custom</option>
          </select>
        </label>

        {platform === 'custom' && (
          <label>
            Your commission rate (%)
            <input
              type="number"
              min="0"
              max="100"
              value={customRate}
              onChange={(event) => setCustomRate(event.target.value)}
              onBlur={handleInputBlur}
              placeholder="e.g. 25"
            />
          </label>
        )}

        <p className="tiny calculator-note">
          Rates shown are typical published rates as of 2026 and can vary by plan or change over time - check your
          own contract for the exact figure.
        </p>

        <label>
          New clients per month
          <input
            type="number"
            min="0"
            value={newClients}
            onChange={(event) => setNewClients(event.target.value)}
            onBlur={handleInputBlur}
          />
        </label>

        <label>
          Average first-visit spend (GBP)
          <input
            type="number"
            min="0"
            value={avgSpend}
            onChange={(event) => setAvgSpend(event.target.value)}
            onBlur={handleInputBlur}
          />
        </label>
      </div>

      <div className="calculator-result">
        <p className="lead">
          At these numbers, {PLATFORM_LABELS[platform]} commission could cost you roughly{' '}
          <strong>{formatGBP(annualCommissionCost)}/year</strong> on new-client bookings alone.
        </p>
        <p>
          A trevona.dev site is a one-off GBP 250-500, with the optional AI Reservation Assistant at GBP 40-80/month
          - and £0 commission either way.
        </p>
      </div>

      <a className="btn primary" href="#contact" onClick={handleCtaClick}>
        Get my free preview
        <span className="arrow" aria-hidden="true" />
      </a>
    </div>
  );
};

export default CommissionCalculator;
