import React, { useState, useEffect } from 'react';

export default function AnimatedTipPage() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFees, setShowFees] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  const FloatingParticles = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 bg-cream/60 rounded-full animate-float-${i % 4}`}
          style={{
            left: `${10 + (i * 8)}%`,
            animationDelay: `${i * 1.2}s`,
            animationDuration: `${15 + (i % 5)}s`
          }}
        />
      ))}
    </div>
  );

  const AnimatedBackground = () => (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-olive-dark via-olive to-olive-light"></div>
      
      {/* Animated orbs */}
      <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-gradient-radial from-olive-light/30 to-transparent rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute top-[60%] right-[10%] w-96 h-96 bg-gradient-radial from-sage/30 to-transparent rounded-full blur-3xl animate-float-slow-delayed"></div>
      <div className="absolute bottom-[20%] left-[30%] w-60 h-60 bg-gradient-radial from-mint/30 to-transparent rounded-full blur-3xl animate-float-medium"></div>
      
      <FloatingParticles />
    </div>
  );

  const WorkerCard = ({ worker }) => (
    <div className="relative bg-gradient-to-br from-olive to-olive-light rounded-3xl p-8 text-center overflow-hidden shadow-2xl mb-8">
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shine"></div>
      
      <div className="relative z-10">
        <div className="w-20 h-20 mx-auto mb-6 bg-cream/20 backdrop-blur-sm border-2 border-cream/30 rounded-full flex items-center justify-center">
          <span className="text-cream text-2xl font-bold">
            {worker.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        
        <h1 className="text-cream text-4xl font-black mb-2 drop-shadow-sm">
          {worker.name}
        </h1>
        <p className="text-cream/80 text-lg font-medium">
          Service Professional
        </p>
      </div>
    </div>
  );

  const AmountInput = ({ amount, setAmount, loading }) => (
    <div className="relative mb-8">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-olive-light font-bold text-xl z-10">
        AED
      </div>
      <input
        type="number"
        min="1"
        step="0.01"
        placeholder="0.00"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={loading}
        className="w-full pl-20 pr-6 py-6 text-3xl font-bold text-olive bg-white/80 backdrop-blur-sm border-2 border-olive/20 rounded-2xl text-center outline-none transition-all duration-300 focus:border-olive-light focus:shadow-lg focus:shadow-olive/10 focus:-translate-y-1 disabled:opacity-60"
      />
    </div>
  );

  const FeesBreakdown = ({ numAmount, serviceFee, totalPay, workerGets, worker }) => (
    <div className="bg-olive/5 backdrop-blur-sm border border-olive/10 rounded-2xl p-6 mb-8 animate-fade-in-up">
      <div className="space-y-3">
        <div className="flex justify-between text-olive font-medium">
          <span>Tip Amount</span>
          <span>{numAmount.toFixed(2)} AED</span>
        </div>
        <div className="flex justify-between text-olive font-medium">
          <span>Service Fee</span>
          <span>{serviceFee.toFixed(2)} AED</span>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-olive/30 to-transparent my-4"></div>
        <div className="flex justify-between text-olive font-bold text-lg">
          <span>Total Payment</span>
          <span>{totalPay.toFixed(2)} AED</span>
        </div>
        <div className="mt-4 p-4 bg-olive-light/10 border border-olive-light/20 rounded-xl text-center">
          <span className="text-olive font-semibold">
            ✨ {worker.name} receives {workerGets.toFixed(2)} AED
          </span>
        </div>
      </div>
    </div>
  );

  const SendButton = ({ onClick, loading, disabled }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative w-full py-6 px-8 bg-gradient-to-r from-olive-light to-olive text-cream text-xl font-bold rounded-2xl overflow-hidden transition-all duration-300 shadow-lg shadow-olive/30 ${
        !disabled ? 'hover:-translate-y-1 hover:shadow-xl hover:shadow-olive/40' : 'opacity-60 cursor-not-allowed'
      } ${loading ? 'animate-pulse' : ''}`}
    >
      <span className="relative z-10">
        {loading ? 'Sending...' : 'Send Tip'}
      </span>
      
      {/* Button shine effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-500 ${!disabled ? 'hover:translate-x-full' : ''}`}></div>
    </button>
  );

  const SuccessOverlay = ({ show, worker }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
        <div className="bg-gradient-to-br from-cream to-cream/95 rounded-3xl p-12 text-center max-w-md mx-4 shadow-2xl animate-success-pop">
          <div className="text-6xl mb-6 animate-bounce">🎉</div>
          <h2 className="text-olive text-2xl font-black mb-4">
            Tip Sent Successfully!
          </h2>
          <p className="text-olive-light text-lg leading-relaxed mb-8">
            Your generous tip is on its way to <strong>{worker.name}</strong>
          </p>
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-olive-light to-olive rounded-full flex items-center justify-center text-cream text-3xl font-bold animate-checkmark-pop">
            ✓
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <AnimatedBackground />
      
      <div className="min-h-screen flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-lg bg-cream/95 backdrop-blur-2xl border border-cream/20 rounded-3xl p-12 shadow-2xl animate-slide-up">
          {/* Logo section */}
          <div className="text-center mb-8">
            <div className="inline-block px-8 py-3 bg-gradient-to-r from-olive to-olive-light rounded-2xl shadow-lg">
              <span className="text-cream font-black text-xl tracking-wider">
                TAQDEER
              </span>
            </div>
          </div>

          {/* Worker card */}
          <WorkerCard worker={worker} />

          {/* Tip section */}
          <div className="text-center">
            <h2 className="text-olive text-2xl font-bold mb-8">Send a Tip</h2>
            
            <AmountInput 
              amount={amount} 
              setAmount={setAmount} 
              loading={loading} 
            />

            {showFees && (
              <FeesBreakdown
                numAmount={numAmount}
                serviceFee={serviceFee}
                totalPay={totalPay}
                workerGets={workerGets}
                worker={worker}
              />
            )}

            <SendButton
              onClick={handleTip}
              loading={loading}
              disabled={loading || numAmount < 1}
            />

            {message && (
              <div className="mt-6 p-4 bg-olive-light/10 text-olive font-medium rounded-xl animate-slide-down">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>

      <SuccessOverlay show={showSuccess} worker={worker} />

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        :global(body) {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        :global(.bg-olive-dark) { background-color: #2d4a33; }
        :global(.bg-olive) { background-color: #4F7042; }
        :global(.bg-olive-light) { background-color: #6E9F6D; }
        :global(.bg-sage) { background-color: #A5C3A1; }
        :global(.bg-mint) { background-color: #8BB48A; }
        :global(.bg-cream) { background-color: #F5ECD9; }
        :global(.text-olive-dark) { color: #2d4a33; }
        :global(.text-olive) { color: #4F7042; }
        :global(.text-olive-light) { color: #6E9F6D; }
        :global(.text-cream) { color: #F5ECD9; }

        :global(.animate-float-slow) {
          animation: float 8s ease-in-out infinite;
        }
        :global(.animate-float-slow-delayed) {
          animation: float 8s ease-in-out infinite 2s;
        }
        :global(.animate-float-medium) {
          animation: float 8s ease-in-out infinite 4s;
        }
        :global(.animate-float-0) {
          animation: particleFloat 15s linear infinite;
        }
        :global(.animate-float-1) {
          animation: particleFloat 18s linear infinite;
        }
        :global(.animate-float-2) {
          animation: particleFloat 20s linear infinite;
        }
        :global(.animate-float-3) {
          animation: particleFloat 16s linear infinite;
        }
        :global(.animate-shine) {
          animation: shine 3s ease-in-out infinite;
        }
        :global(.animate-fade-in) {
          animation: fadeIn 0.5s ease-out;
        }
        :global(.animate-fade-in-up) {
          animation: fadeInUp 0.5s ease-out;
        }
        :global(.animate-slide-up) {
          animation: slideUp 0.8s ease-out;
        }
        :global(.animate-slide-down) {
          animation: slideDown 0.3s ease-out;
        }
        :global(.animate-success-pop) {
          animation: successPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        :global(.animate-checkmark-pop) {
          animation: checkmarkPop 0.8s ease-out 0.5s both;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(120deg); }
          66% { transform: translateY(20px) rotate(240deg); }
        }

        @keyframes particleFloat {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-10vh) scale(1); opacity: 0; }
        }

        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes successPop {
          0% { opacity: 0; transform: scale(0.5) rotate(-10deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        @keyframes checkmarkPop {
          0% { opacity: 0; transform: scale(0); }
          100% { opacity: 1; transform: scale(1); }
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </>
  );
}