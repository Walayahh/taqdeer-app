// pages/tip/[id].js  (or wherever you mount your AnimatedTipPage)
import React, { useState, useEffect } from 'react';

export default function AnimatedTipPage() {
  const [amount, setAmount]     = useState('');
  const [loading, setLoading]   = useState(false);
  const [message, setMessage]   = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFees, setShowFees]       = useState(false);

  // static worker info for demo; swap out for real fetch
  const worker = { name: 'Ahmed Hassan', id: '123' };

  // fees calculation
  const numAmount  = parseFloat(amount) || 0;
  const serviceFee = numAmount > 0 ? numAmount * 0.0225 + 0.25 : 0;
  const totalPay   = numAmount + serviceFee;
  const workerGets = numAmount;

  useEffect(() => {
    setShowFees(numAmount > 0);
  }, [numAmount]);

  const handleTip = async () => {
    if (numAmount < 1) {
      setMessage('❌ Please enter at least 1 AED');
      return setTimeout(() => setMessage(''), 3000);
    }
    setLoading(true);
    setMessage('');
    try {
      // → call your real API here
      await new Promise(r => setTimeout(r, 1500));
      setShowSuccess(true);
      setMessage(`✅ Tip sent! ${worker.name} gets ${workerGets.toFixed(2)} AED.`);
      setTimeout(() => {
        setShowSuccess(false);
        setAmount('');
        setMessage('');
      }, 4000);
    } catch {
      setMessage('❌ Network error');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <img src="/taqdeer.png" alt="Taqdeer Logo" className="logo" />

      <div className="card">
        <h1 className="card-title">Tip your worker</h1>
        <p className="card-subtitle">to {worker.name}</p>

        <div className="input-group">
          <label htmlFor="tip-amount">Amount (AED)</label>
          <input
            id="tip-amount"
            type="number"
            min="1"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            disabled={loading}
          />
        </div>

        {showFees && (
          <div className="fees">
            <div><span>Tip:</span><span>{numAmount.toFixed(2)} AED</span></div>
            <div><span>Service fee:</span><span>{serviceFee.toFixed(2)} AED</span></div>
            <div className="fees-total"><span>Total:</span><span>{totalPay.toFixed(2)} AED</span></div>
            <div className="worker-gets">Worker gets {workerGets.toFixed(2)} AED</div>
          </div>
        )}

        <button
          className="send-btn"
          onClick={handleTip}
          disabled={loading || numAmount < 1}
        >
          {loading ? 'Sending…' : 'Send Tip'}
        </button>

        {message && <div className="message">{message}</div>}
      </div>

      {showSuccess && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>🎉 Thank you!</h2>
            <p>Your tip is on its way to {worker.name}.</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .wrapper {
          /* full-screen olive background */
          min-height: 100vh;
          background: #4F7042;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          font-family: 'Inter', sans-serif;
          color: #F5ECD9;
          position: relative;
        }
        .logo {
          max-width: 180px;
          margin-bottom: 2rem;
        }
        .card {
          width: 100%;
          max-width: 360px;
          background: #F5ECD9;
          color: #4F7042;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
          text-align: center;
          animation: fadeIn 0.6s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-title {
          margin: 0;
          font-size: 1.75rem;
          font-weight: 700;
        }
        .card-subtitle {
          margin: .5rem 0 1.5rem;
          font-size: 1rem;
        }
        .input-group {
          text-align: left;
          margin-bottom: 1rem;
        }
        .input-group label {
          display: block;
          margin-bottom: .5rem;
          font-weight: 600;
        }
        .input-group input {
          width: 100%;
          padding: .75rem 1rem;
          border: 2px solid #4F7042;
          border-radius: 8px;
          font-size: 1rem;
          color: #4F7042;
          outline: none;
        }
        .input-group input:focus {
          box-shadow: 0 0 0 3px rgba(79,112,66,0.3);
        }
        .fees {
          background: rgba(79,112,66,0.1);
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1rem;
          text-align: left;
        }
        .fees > div {
          display: flex;
          justify-content: space-between;
          margin-bottom: .5rem;
        }
        .fees-total {
          font-weight: 700;
          border-top: 1px solid rgba(79,112,66,0.3);
          padding-top: .5rem;
        }
        .worker-gets {
          margin-top: .5rem;
          font-weight: 600;
          text-align: center;
        }
        .send-btn {
          width: 100%;
          padding: 1rem;
          background: #6E9F6D;
          border: none;
          border-radius: 8px;
          color: #F5ECD9;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background .3s;
        }
        .send-btn:disabled {
          background: #A5C3A1;
          cursor: not-allowed;
        }
        .send-btn:not(:disabled):hover {
          background: #56824F;
        }
        .message {
          margin-top: 1rem;
          font-size: .95rem;
        }
        .overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.6);
          display:flex; align-items:center; justify-content:center;
        }
        .overlay-content {
          background: #F5ECD9;
          color: #4F7042;
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          animation: popIn 0.5s ease-out;
        }
        @keyframes popIn {
          from { opacity:0; transform: scale(0.8); }
          to   { opacity:1; transform: scale(1); }
        }
        /* responsive tweaks */
        @media (max-width: 360px) {
          .card { padding: 1.5rem; }
          .card-title { font-size: 1.5rem; }
        }
      `}</style>
    </div>
  );
}
