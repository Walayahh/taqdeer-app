import React, { useState, useEffect } from 'react';


export default function AnimatedTipPage() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFees, setShowFees] = useState(false);

  // Static worker info for demo
  const worker = { name: 'Ahmed Hassan', id: '123' };

  // Fees calculation
  const numAmount = parseFloat(amount) || 0;
  const serviceFee = numAmount > 0 ? numAmount * 0.0225 + 0.25 : 0;
  const totalPay = numAmount + serviceFee;
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
    <>
      {/* Animated Background */}
      <div className="animated-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="floating-particles">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="main-container">
        <div className="glass-container">
          {/* Logo Section */}
          <div className="logo-section">
          <div className="logo-container">
            <img src="/taqdeer.png" alt="Taqdeer" className="logo-image" />
          </div>

          </div>

          {/* Worker Card */}
          <div className="worker-card">
            <div className="worker-card-shine"></div>
            <div className="worker-avatar">
              <span className="avatar-text">
                {worker.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <h1 className="worker-name">{worker.name}</h1>
            <p className="worker-subtitle">Service Professional</p>
          </div>

          {/* Tip Section */}
          <div className="tip-section">
            <h2 className="section-title">Send a Tip</h2>
            
            {/* Amount Input */}
            <div className="amount-input-container">
              <div className="currency-symbol">AED</div>
              <input
                type="number"
                min="1"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={loading}
                className="amount-input"
              />
            </div>

            {/* Fees Breakdown */}
            {showFees && (
              <div className="fees-breakdown">
                <div className="fee-row">
                  <span>Tip Amount</span>
                  <span>{numAmount.toFixed(2)} AED</span>
                </div>
                <div className="fee-row">
                  <span>Service Fee</span>
                  <span>{serviceFee.toFixed(2)} AED</span>
                </div>
                <div className="fee-divider"></div>
                <div className="fee-row total-row">
                  <span>Total Payment</span>
                  <span>{totalPay.toFixed(2)} AED</span>
                </div>
                <div className="worker-receives">
                  <span className="receives-text">
                    ✨ {worker.name} receives {workerGets.toFixed(2) - 1} AED
                  </span>
                </div>
              </div>
            )}

            {/* Send Button */}
            <button
              className={`send-button ${loading ? 'loading' : ''}`}
              onClick={handleTip}
              disabled={loading || numAmount < 1}
            >
              <span className="button-text">
                {loading ? 'Sending...' : 'Send Tip'}
              </span>
              <div className="button-shine"></div>
            </button>

            {/* Message Display */}
            {message && (
              <div className="message-display">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Overlay */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-content">
            <div className="success-icon">🎉</div>
            <h2 className="success-title">Tip Sent Successfully!</h2>
            <p className="success-message">
              Your generous tip is on its way to <strong>{worker.name}</strong>
            </p>
            <div className="success-checkmark">✓</div>
          </div>
        </div>
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        .logo-placeholder {
        display: inline-block;
        padding: 1rem 2.5rem;
        background: linear-gradient(135deg, #4F7042, #6E9F6D);
        border-radius: 24px;
        box-shadow: 0 8px 24px rgba(79, 112, 66, 0.4);
        transform: perspective(1000px) rotateX(5deg);
      }

      .logo-text {
        color: #F5ECD9;
        font-weight: 900;
        font-size: 1.4rem;
        letter-spacing: 3px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }
        
            .logo-container {
        display: inline-block;
        padding: 1rem;
        background: linear-gradient(135deg, #4F7042, #6E9F6D);
        border-radius: 24px;
        box-shadow: 0 8px 24px rgba(79, 112, 66, 0.4);
        transform: perspective(1000px) rotateX(5deg);
      }

      .logo-image {
        width: 120px;
        height: auto;
        border-radius: 16px;
        display: block;
      }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :global(body) {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          overflow-x: hidden;
          background: #2d4a33;
        }

        .animated-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #2d4a33 0%, #4F7042 50%, #3a5d40 100%);
          z-index: -2;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.4;
          animation: float 8s ease-in-out infinite;
        }

        .orb-1 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, #6E9F6D 0%, transparent 70%);
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, #A5C3A1 0%, transparent 70%);
          top: 50%;
          right: 10%;
          animation-delay: 2s;
        }

        .orb-3 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #8BB48A 0%, transparent 70%);
          bottom: 15%;
          left: 25%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          33% { transform: translateY(-40px) rotate(120deg) scale(1.1); }
          66% { transform: translateY(25px) rotate(240deg) scale(0.9); }
        }

        .floating-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(245, 236, 217, 0.7);
          border-radius: 50%;
          animation: particleFloat 20s linear infinite;
          box-shadow: 0 0 6px rgba(245, 236, 217, 0.5);
        }

        .particle-1 { left: 8%; animation-delay: 0s; }
        .particle-2 { left: 18%; animation-delay: 3s; }
        .particle-3 { left: 28%; animation-delay: 6s; }
        .particle-4 { left: 38%; animation-delay: 9s; }
        .particle-5 { left: 48%; animation-delay: 12s; }
        .particle-6 { left: 58%; animation-delay: 15s; }
        .particle-7 { left: 68%; animation-delay: 2s; }
        .particle-8 { left: 78%; animation-delay: 5s; }
        .particle-9 { left: 88%; animation-delay: 8s; }
        .particle-10 { left: 13%; animation-delay: 11s; }
        .particle-11 { left: 73%; animation-delay: 14s; }
        .particle-12 { left: 33%; animation-delay: 17s; }

        @keyframes particleFloat {
          0% { 
            transform: translateY(110vh) translateX(0) scale(0); 
            opacity: 0; 
          }
          10% { 
            opacity: 1; 
            transform: translateY(100vh) translateX(10px) scale(1); 
          }
          90% { 
            opacity: 1; 
            transform: translateY(-10vh) translateX(-10px) scale(1); 
          }
          100% { 
            transform: translateY(-20vh) translateX(0) scale(0); 
            opacity: 0; 
          }
        }

        .main-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          z-index: 1;
        }

        .glass-container {
          width: 100%;
          max-width: 500px;
          background: rgba(245, 236, 217, 0.95);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(245, 236, 217, 0.3);
          border-radius: 36px;
          padding: 3.5rem;
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          animation: slideUp 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
        }

        .glass-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          border-radius: 36px 36px 0 0;
        }

        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(60px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }

        .logo-section {
          text-align: center;
          margin-bottom: 3rem;
        }

        .logo-placeholder {
          display: inline-block;
          padding: 1rem 2.5rem;
          background: linear-gradient(135deg, #4F7042, #6E9F6D);
          border-radius: 24px;
          box-shadow: 0 8px 24px rgba(79, 112, 66, 0.4);
          transform: perspective(1000px) rotateX(5deg);
        }

        .logo-text {
          color: #F5ECD9;
          font-weight: 900;
          font-size: 1.4rem;
          letter-spacing: 3px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .worker-card {
          background: linear-gradient(135deg, #4F7042 0%, #6E9F6D 100%);
          border-radius: 28px;
          padding: 2.5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          margin-bottom: 3rem;
          box-shadow: 
            0 20px 40px rgba(79, 112, 66, 0.5),
            inset 0 1px 0 rgba(255,255,255,0.1);
        }

        .worker-card-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          animation: shine 4s ease-in-out infinite;
          transform: skewX(-25deg);
        }

        @keyframes shine {
          0% { left: -100%; }
          50% { left: -100%; }
          100% { left: 100%; }
        }

        .worker-avatar {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: rgba(245, 236, 217, 0.25);
          border: 3px solid rgba(245, 236, 217, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          backdrop-filter: blur(15px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
          position: relative;
          z-index: 2;
        }

        .avatar-text {
          color: #F5ECD9;
          font-size: 1.8rem;
          font-weight: 800;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .worker-name {
          color: #F5ECD9;
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 0.75rem;
          text-shadow: 0 4px 8px rgba(0,0,0,0.2);
          position: relative;
          z-index: 2;
          letter-spacing: -0.5px;
        }

        .worker-subtitle {
          color: rgba(245, 236, 217, 0.85);
          font-size: 1.1rem;
          font-weight: 600;
          position: relative;
          z-index: 2;
        }

        .tip-section {
          text-align: center;
        }

        .section-title {
          color: #4F7042;
          font-size: 1.75rem;
          font-weight: 800;
          margin-bottom: 2.5rem;
          position: relative;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #6E9F6D, #4F7042);
          border-radius: 2px;
        }

        .amount-input-container {
          position: relative;
          margin-bottom: 2.5rem;
        }

        .currency-symbol {
          position: absolute;
          left: 2rem;
          top: 50%;
          transform: translateY(-50%);
          color: #6E9F6D;
          font-weight: 800;
          font-size: 1.5rem;
          z-index: 2;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .amount-input {
          width: 100%;
          padding: 2rem 2rem 2rem 5rem;
          border: 3px solid rgba(79, 112, 66, 0.2);
          border-radius: 24px;
          font-size: 2.5rem;
          font-weight: 800;
          color: #4F7042;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(15px);
          outline: none;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 
            0 8px 32px rgba(79, 112, 66, 0.1),
            inset 0 1px 0 rgba(255,255,255,0.8);
        }

        .amount-input:focus {
          border-color: #6E9F6D;
          box-shadow: 
            0 0 0 6px rgba(110, 159, 109, 0.15),
            0 12px 40px rgba(79, 112, 66, 0.2);
          transform: translateY(-3px) scale(1.02);
        }

        .amount-input:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .fees-breakdown {
          background: rgba(79, 112, 66, 0.08);
          border-radius: 24px;
          padding: 2rem;
          margin-bottom: 2.5rem;
          backdrop-filter: blur(15px);
          border: 2px solid rgba(79, 112, 66, 0.12);
          animation: fadeInUp 0.6s ease-out;
          box-shadow: 0 8px 32px rgba(79, 112, 66, 0.1);
        }

        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        .fee-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          color: #4F7042;
          font-weight: 600;
          font-size: 1.05rem;
        }

        .fee-divider {
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(79, 112, 66, 0.3), transparent);
          margin: 1.5rem 0;
          border-radius: 1px;
        }

        .total-row {
          font-weight: 800;
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          color: #2d4a33;
        }

        .worker-receives {
          text-align: center;
          padding: 1.5rem;
          background: rgba(110, 159, 109, 0.15);
          border-radius: 16px;
          border: 2px solid rgba(110, 159, 109, 0.25);
          box-shadow: 0 4px 16px rgba(79, 112, 66, 0.1);
        }

        .receives-text {
          color: #4F7042;
          font-weight: 700;
          font-size: 1.05rem;
        }

        .send-button {
          width: 100%;
          padding: 2rem;
          border: none;
          border-radius: 24px;
          background: linear-gradient(135deg, #6E9F6D 0%, #4F7042 100%);
          color: #F5ECD9;
          font-size: 1.4rem;
          font-weight: 800;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 
            0 12px 32px rgba(79, 112, 66, 0.4),
            inset 0 1px 0 rgba(255,255,255,0.1);
        }

        .send-button:not(:disabled):hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 
            0 20px 40px rgba(79, 112, 66, 0.5),
            inset 0 1px 0 rgba(255,255,255,0.2);
        }

        .send-button:not(:disabled):active {
          transform: translateY(-1px) scale(0.98);
        }

        .send-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .send-button.loading {
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.02); }
        }

        .button-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transition: left 0.6s ease;
          transform: skewX(-25deg);
        }

        .send-button:not(:disabled):hover .button-shine {
          left: 100%;
        }

        .message-display {
          margin-top: 2rem;
          padding: 1.5rem;
          border-radius: 16px;
          background: rgba(110, 159, 109, 0.12);
          color: #4F7042;
          font-weight: 600;
          font-size: 1.05rem;
          animation: slideDown 0.4s ease-out;
          border: 2px solid rgba(110, 159, 109, 0.2);
        }

        @keyframes slideDown {
          from { 
            opacity: 0; 
            transform: translateY(-15px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        .success-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(15px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .success-content {
          background: linear-gradient(135deg, #F5ECD9 0%, rgba(245, 236, 217, 0.98) 100%);
          border-radius: 36px;
          padding: 4rem 3rem;
          text-align: center;
          max-width: 450px;
          margin: 2rem;
          position: relative;
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255,255,255,0.3);
          animation: successPop 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes successPop {
          0% { 
            opacity: 0; 
            transform: scale(0.4) rotate(-15deg); 
          }
          100% { 
            opacity: 1; 
            transform: scale(1) rotate(0deg); 
          }
        }

        .success-icon {
          font-size: 5rem;
          margin-bottom: 1.5rem;
          animation: bounce 1.5s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.1); }
        }

        .success-title {
          color: #4F7042;
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 1.5rem;
          letter-spacing: -0.5px;
        }

        .success-message {
          color: #6E9F6D;
          font-size: 1.2rem;
          line-height: 1.7;
          margin-bottom: 2.5rem;
          font-weight: 500;
        }

        .success-checkmark {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6E9F6D, #4F7042);
          color: #F5ECD9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: 900;
          margin: 0 auto;
          animation: checkmarkPop 0.8s ease-out 0.6s both;
          box-shadow: 0 8px 32px rgba(79, 112, 66, 0.4);
        }

        @keyframes checkmarkPop {
          0% { 
            opacity: 0; 
            transform: scale(0) rotate(180deg); 
          }
          100% { 
            opacity: 1; 
            transform: scale(1) rotate(0deg); 
          }
        }

        /* Responsive Design */
        @media (max-width: 640px) {
          .main-container {
            padding: 1.5rem;
          }
          
          .glass-container {
            padding: 2.5rem;
          }

          .worker-name {
            font-size: 2rem;
          }

          .amount-input {
            font-size: 2rem;
            padding: 1.75rem 1.75rem 1.75rem 4.5rem;
          }

          .currency-symbol {
            font-size: 1.25rem;
            left: 1.5rem;
          }

          .success-content {
            margin: 1.5rem;
            padding: 3rem 2rem;
          }

          .success-title {
            font-size: 1.75rem;
          }

          .success-message {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .glass-container {
            padding: 2rem;
          }

          .worker-name {
            font-size: 1.75rem;
          }

          .amount-input {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </>
  );
}