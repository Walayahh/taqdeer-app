import React, { useState, useEffect } from 'react';

export default function AnimatedTipPage() {
  const [worker] = useState({ name: 'Ahmed Hassan', id: '123' });
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFees, setShowFees] = useState(false);

  // Calculate fees
  const numAmount = parseFloat(amount) || 0;
  const serviceFee = numAmount > 0 ? numAmount * 0.0225 + 0.25 : 0;
  const totalToPay = numAmount + serviceFee;
  const workerGets = numAmount;

  useEffect(() => {
    setShowFees(numAmount > 0);
  }, [numAmount]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setMessage('');
  };

  const handleTip = async () => {
    if (numAmount < 1) {
      setMessage('❌ Please enter at least 1 AED');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      setShowSuccess(true);
      setMessage('✅ Tip sent successfully! Ahmed will receive your generous tip.');
      
      // Reset form after success
      setTimeout(() => {
        setAmount('');
        setShowSuccess(false);
        setMessage('');
      }, 4000);
      
    } catch (error) {
      setMessage('❌ Network error. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      {/* Animated Background Elements */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>
      <div className="bg-particles">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>

      <div className="card">
        <div className="card-glow"></div>
        
        {/* Header with animated emoji */}
        <header className="header">
          <div className="emoji-container">
            <div className="emoji main-emoji">🎁</div>
            <div className="emoji-sparkles">
              <span className="sparkle sparkle-1">✨</span>
              <span className="sparkle sparkle-2">💫</span>
              <span className="sparkle sparkle-3">⭐</span>
              <span className="sparkle sparkle-4">🌟</span>
            </div>
          </div>
          <h1 className="title">
            <span className="title-word">Send</span>{' '}
            <span className="title-word">a</span>{' '}
            <span className="title-word">Tip</span>
          </h1>
          <p className="subtitle">to {worker.name}</p>
        </header>

        {/* Guarantee Message */}
        <div className="guarantee-badge">
          <div className="guarantee-icon">🛡️</div>
          <div className="guarantee-text">
            <div className="guarantee-title">100% Direct Transfer</div>
            <div className="guarantee-subtitle">Every penny goes directly to the worker</div>
          </div>
        </div>

        {/* Amount Input */}
        <section className="form-group">
          <label className="label">
            <span className="label-text">Tip Amount</span>
            <span className="label-emoji">💰</span>
          </label>
          <div className="input-container">
            <div className="input-wrapper">
              <span className="currency-symbol">AED</span>
              <input
                type="number"
                min="1"
                step="0.01"
                placeholder="Add tip"
                value={amount}
                onChange={handleAmountChange}
                disabled={loading}
                className="input"
              />
              <div className="input-glow"></div>
            </div>
          </div>
        </section>

        {/* Fee Breakdown */}
        {showFees && (
          <section className="fees fees-enter">
            <div className="fees-header">
              <span className="fees-title">💳 Payment Summary</span>
            </div>
            <div className="fee-rows">
              <div className="fee-row fee-row-1">
                <span className="fee-label">
                  <span className="fee-emoji">🎯</span>
                  Tip Amount
                </span>
                <span className="fee-value">{numAmount.toFixed(2)} AED</span>
              </div>
              <div className="fee-row fee-row-2">
                <span className="fee-label">
                  <span className="fee-emoji">⚡</span>
                  Service Fee
                </span>
                <span className="fee-value service-fee-value">{serviceFee.toFixed(2)} AED</span>
              </div>
              <div className="fee-row total-row fee-row-3">
                <span className="fee-label">
                  <span className="fee-emoji">💎</span>
                  Total Payment
                </span>
                <span className="fee-value total-value">{totalToPay.toFixed(2)} AED</span>
              </div>
            </div>
            <div className="worker-gets">
              <div className="worker-gets-content">
                <span className="worker-emoji">👤</span>
                <span className="worker-text">Worker receives: </span>
                <span className="worker-amount">{workerGets.toFixed(2)} AED</span>
              </div>
            </div>
          </section>
        )}

        {/* Send Button */}
        <button
          className={`send-btn ${!numAmount || numAmount < 1 ? 'send-btn-disabled' : ''}`}
          onClick={handleTip}
          disabled={loading || !numAmount || numAmount < 1}
        >
          <span className="btn-content">
            {loading ? (
              <>
                <span className="spinner"></span>
                <span className="btn-text">Sending...</span>
              </>
            ) : (
              <>
                <span className="btn-emoji">🚀</span>
                <span className="btn-text">Send Tip</span>
              </>
            )}
          </span>
          <div className="btn-sparkle"></div>
        </button>

        {/* Success/Error Messages */}
        {message && (
          <div className="message-container">
            <div className={`message ${message.startsWith('✅') ? 'message-success' : 'message-error'}`}>
              {message}
            </div>
          </div>
        )}
      </div>

      {/* Floating Success Animation */}
      {showSuccess && (
        <div className="success-overlay success-overlay-show">
          <div className="success-content">
            <div className="success-emoji">🎉</div>
            <div className="success-text">Tip Sent Successfully!</div>
            <div className="success-subtext">{worker.name} will receive your generous tip</div>
            <div className="success-confetti">
              {[...Array(12)].map((_, i) => (
                <div key={i} className={`confetti confetti-${i + 1}`}>🎊</div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .wrapper {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        /* Animated Background */
        .bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.3;
          animation: float 8s ease-in-out infinite;
        }

        .orb-1 {
          width: 300px;
          height: 300px;
          background: linear-gradient(45deg, #ff6b6b, #feca57);
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 200px;
          height: 200px;
          background: linear-gradient(45deg, #48cae4, #023e8a);
          top: 60%;
          right: 15%;
          animation-delay: -3s;
        }

        .orb-3 {
          width: 250px;
          height: 250px;
          background: linear-gradient(45deg, #06ffa5, #7209b7);
          bottom: 20%;
          left: 20%;
          animation-delay: -6s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.1); }
        }

        .bg-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation: twinkle 3s ease-in-out infinite;
        }

        .particle-1 { top: 20%; left: 10%; animation-delay: 0s; }
        .particle-2 { top: 40%; right: 20%; animation-delay: 1s; }
        .particle-3 { bottom: 30%; left: 30%; animation-delay: 2s; }
        .particle-4 { top: 70%; right: 10%; animation-delay: 0.5s; }
        .particle-5 { bottom: 10%; right: 40%; animation-delay: 1.5s; }
        .particle-6 { top: 30%; left: 60%; animation-delay: 2.5s; }
        .particle-7 { bottom: 50%; left: 10%; animation-delay: 0.8s; }
        .particle-8 { top: 80%; left: 80%; animation-delay: 1.8s; }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        /* Main Card */
        .card {
          position: relative;
          width: 100%;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 2.5rem;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.2);
          animation: cardEntry 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .card-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 180deg, transparent, rgba(120, 119, 198, 0.3), transparent);
          animation: rotate 4s linear infinite;
          pointer-events: none;
        }

        @keyframes cardEntry {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes rotate {
          to { transform: rotate(360deg); }
        }

        /* Header */
        .header {
          text-align: center;
          margin-bottom: 2rem;
          position: relative;
          z-index: 2;
        }

        .emoji-container {
          position: relative;
          margin-bottom: 1rem;
        }

        .main-emoji {
          font-size: 4rem;
          animation: bounce 2s ease-in-out infinite;
          display: inline-block;
        }

        .emoji-sparkles {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .sparkle {
          position: absolute;
          font-size: 1.5rem;
          animation: sparkle 2s ease-in-out infinite;
        }

        .sparkle-1 { top: -40px; left: -40px; animation-delay: 0s; }
        .sparkle-2 { top: -40px; right: -40px; animation-delay: 0.5s; }
        .sparkle-3 { bottom: -40px; left: -40px; animation-delay: 1s; }
        .sparkle-4 { bottom: -40px; right: -40px; animation-delay: 1.5s; }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.5) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }

        .title {
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .title-word {
          display: inline-block;
          animation: titleWave 2s ease-in-out infinite;
        }

        .title-word:nth-child(1) { animation-delay: 0s; }
        .title-word:nth-child(2) { animation-delay: 0.2s; }
        .title-word:nth-child(3) { animation-delay: 0.4s; }

        @keyframes titleWave {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-8px); }
        }

        .subtitle {
          font-size: 1.1rem;
          color: #666;
          font-weight: 500;
        }

        /* Guarantee Badge */
        .guarantee-badge {
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #00b894, #00a085);
          color: white;
          padding: 1rem;
          border-radius: 16px;
          margin-bottom: 2rem;
          animation: guaranteeGlow 3s ease-in-out infinite;
          position: relative;
          overflow: hidden;
        }

        .guarantee-badge::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 2s infinite;
        }

        @keyframes guaranteeGlow {
          0%, 100% { box-shadow: 0 4px 20px rgba(0, 184, 148, 0.3); }
          50% { box-shadow: 0 8px 30px rgba(0, 184, 148, 0.5); }
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .guarantee-icon {
          font-size: 2rem;
          margin-right: 1rem;
          animation: protectionPulse 2s ease-in-out infinite;
        }

        @keyframes protectionPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .guarantee-title {
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 0.2rem;
        }

        .guarantee-subtitle {
          font-size: 0.85rem;
          opacity: 0.9;
        }

        /* Form Group */
        .form-group {
          margin-bottom: 2rem;
          position: relative;
          z-index: 2;
        }

        .label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          font-weight: 600;
          color: #333;
        }

        .label-text {
          font-size: 1rem;
        }

        .label-emoji {
          font-size: 1.2rem;
          animation: coinFlip 3s ease-in-out infinite;
        }

        @keyframes coinFlip {
          0%, 100% { transform: rotateY(0deg); }
          50% { transform: rotateY(180deg); }
        }

        .input-container {
          position: relative;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .currency-symbol {
          position: absolute;
          left: 1rem;
          font-weight: 600;
          color: #667eea;
          font-size: 1.1rem;
          z-index: 1;
        }

        .input {
          width: 100%;
          padding: 1rem 1rem 1rem 4rem;
          border: 3px solid transparent;
          border-radius: 16px;
          font-size: 1.2rem;
          font-weight: 600;
          background: linear-gradient(white, white) padding-box,
                      linear-gradient(135deg, #667eea, #764ba2) border-box;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 1;
        }

        .input::placeholder {
          color: #999;
          font-weight: 400;
        }

        .input:focus {
          outline: none;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .input-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 16px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }

        .input:focus + .input-glow {
          opacity: 0.1;
          animation: inputGlow 1s ease-in-out infinite alternate;
        }

        @keyframes inputGlow {
          from { opacity: 0.1; }
          to { opacity: 0.2; }
        }

        /* Fees Section */
        .fees {
          background: linear-gradient(135deg, #f8f9ff, #e8ecff);
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          border: 2px solid rgba(102, 126, 234, 0.1);
          position: relative;
          z-index: 2;
        }

        .fees-enter {
          animation: feesEntry 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes feesEntry {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .fees-header {
          margin-bottom: 1rem;
        }

        .fees-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
        }

        .fee-rows {
          margin-bottom: 1rem;
        }

        .fee-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          animation: fadeInUp 0.5s ease-out;
        }

        .fee-row-1 { animation-delay: 0.1s; }
        .fee-row-2 { animation-delay: 0.2s; }
        .fee-row-3 { animation-delay: 0.3s; }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fee-label {
          display: flex;
          align-items: center;
          font-weight: 500;
          color: #555;
        }

        .fee-emoji {
          margin-right: 0.5rem;
          font-size: 1rem;
        }

        .fee-value {
          font-weight: 600;
          color: #333;
        }

        .service-fee-value {
          color: #e17055;
        }

        .total-row {
          border-top: 2px solid rgba(102, 126, 234, 0.2);
          padding-top: 1rem;
          margin-top: 0.5rem;
        }

        .total-value {
          font-size: 1.1rem;
          color: #667eea;
          font-weight: 700;
        }

        .worker-gets {
          background: linear-gradient(135deg, #00b894, #00a085);
          border-radius: 12px;
          padding: 1rem;
          margin-top: 1rem;
        }

        .worker-gets-content {
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
        }

        .worker-emoji {
          font-size: 1.5rem;
          margin-right: 0.5rem;
          animation: workerPulse 2s ease-in-out infinite;
        }

        @keyframes workerPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .worker-amount {
          font-size: 1.1rem;
          font-weight: 700;
        }

        /* Send Button */
        .send-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          margin-bottom: 1rem;
          z-index: 2;
        }

        .send-btn:not(.send-btn-disabled):hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
        }

        .send-btn:not(.send-btn-disabled):active {
          transform: translateY(-1px);
        }

        .send-btn-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-content {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        .btn-emoji {
          font-size: 1.3rem;
          margin-right: 0.5rem;
          animation: rocket 2s ease-in-out infinite;
        }

        @keyframes rocket {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-3px) rotate(-5deg); }
          75% { transform: translateY(-1px) rotate(5deg); }
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: 0.5rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .btn-sparkle {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }

        .send-btn:not(.send-btn-disabled):hover .btn-sparkle {
          left: 100%;
        }

        /* Message Container */
        .message-container {
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .message {
          padding: 1rem;
          border-radius: 12px;
          font-weight: 600;
          text-align: center;
          animation: messageEntry 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .message-success {
          background: linear-gradient(135deg, #00b894, #00a085);
          color: white;
        }

        .message-error {
          background: linear-gradient(135deg, #e17055, #d63031);
          color: white;
        }

        @keyframes messageEntry {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Success Overlay */
        .success-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .success-overlay-show {
          opacity: 1;
          visibility: visible;
        }

        .success-content {
          background: white;
          padding: 3rem 2rem;
          border-radius: 24px;
          text-align: center;
          animation: successEntry 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          max-width: 400px;
          margin: 2rem;
          position: relative;
          overflow: hidden;
        }

        @keyframes successEntry {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .success-emoji {
          font-size: 4rem;
          margin-bottom: 1rem;
          animation: celebrate 1s ease-in-out infinite;
        }

        @keyframes celebrate {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(-5deg); }
          75% { transform: scale(1.1) rotate(5deg); }
        }

        .success-text {
          font-size: 1.5rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .success-subtext {
          font-size: 1rem;
          color: #666;
        }

        .success-confetti {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .confetti {
          position: absolute;
          font-size: 1.5rem;
          animation: confettiFall 3s ease-out infinite;
        }

        .confetti-1 { left: 10%; animation-delay: 0s; }
        .confetti-2 { left: 20%; animation-delay: 0.2s; }
        .confetti-3 { left: 30%; animation-delay: 0.4s; }
        .confetti-4 { left: 40%; animation-delay: 0.6s; }
        .confetti-5 { left: 50%; animation-delay: 0.8s; }
        .confetti-6 { left: 60%; animation-delay: 1s; }
        .confetti-7 { left: 70%; animation-delay: 0.3s; }
        .confetti-8 { left: 80%; animation-delay: 0.5s; }
        .confetti-9 { left: 90%; animation-delay: 0.7s; }
        .confetti-10 { left: 15%; animation-delay: 0.9s; }
        .confetti-11 { left: 75%; animation-delay: 0.1s; }
        .confetti-12 { left: 85%; animation-delay: 1.1s; }

        @keyframes confettiFall {
          0% {
            top: -10%;
            transform: rotate(0deg) scale(0.5);
            opacity: 1;
          }
          100% {
            top: 110%;
            transform: rotate(720deg) scale(1);
            opacity: 0;
          }
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .wrapper {
            padding: 1rem;
          }

          .card {
            padding: 2rem;
            max-width: 100%;
          }

          .title {
            font-size: 1.75rem;
          }

          .main-emoji {
            font-size: 3rem;
          }

          .sparkle {
            font-size: 1.2rem;
          }

          .sparkle-1 { top: -30px; left: -30px; }
          .sparkle-2 { top: -30px; right: -30px; }
          .sparkle-3 { bottom: -30px; left: -30px; }
          .sparkle-4 { bottom: -30px; right: -30px; }

          .guarantee-badge {
            padding: 0.875rem;
          }

          .guarantee-icon {
            font-size: 1.5rem;
          }

          .input {
            font-size: 1.1rem;
            padding: 0.875rem 0.875rem 0.875rem 3.5rem;
          }

          .currency-symbol {
            left: 0.875rem;
            font-size: 1rem;
          }

          .fees {
            padding: 1.25rem;
          }

          .success-content {
            padding: 2rem 1.5rem;
            margin: 1rem;
          }

          .success-emoji {
            font-size: 3rem;
          }

          .success-text {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 360px) {
          .card {
            padding: 1.5rem;
          }

          .title {
            font-size: 1.5rem;
          }

          .guarantee-badge {
            flex-direction: column;
            text-align: center;
          }

          .guarantee-icon {
            margin-right: 0;
            margin-bottom: 0.5rem;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .card {
            border: 2px solid #000;
          }

          .input {
            border: 2px solid #000;
          }

          .send-btn {
            border: 2px solid #000;
          }
        }
      `}</style>
    </div>
  );
}