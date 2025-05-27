// /pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [workerId, setWorkerId] = useState('');
  const router = useRouter();

  const onSubmit = e => {
    e.preventDefault();
    if (!workerId.trim()) return;
    router.push(`/dashboard/${encodeURIComponent(workerId.trim())}`);
  };

  return (
    <div className="wrapper">
      <div className="card">
        <img src="/taqdeer.png" alt="Taqdeer Logo" className="logo" />
        <h1>Worker Login</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Enter your Worker ID"
            value={workerId}
            onChange={e => setWorkerId(e.target.value)}
          />
          <button type="submit">Go to Dashboard</button>
        </form>
      </div>
      <style jsx>{`
        .wrapper {
          min-height:100vh;
          display:flex; align-items:center; justify-content:center;
          background: linear-gradient(135deg,#FBEAD2,#E8D5B7);
          font-family:'Inter',sans-serif;
        }
        .card {
          background:rgba(255,255,255,0.9);
          padding:2rem; border-radius:12px;
          box-shadow:0 10px 30px rgba(0,0,0,0.1);
          text-align:center; max-width:360px; width:90vw;
        }
        .logo {
          max-width:100px;
          margin-bottom:1rem;
        }
        h1 {
          margin-bottom:1.5rem;
          color:#2D5233;
        }
        input {
          width:100%; padding:.75rem;
          margin-bottom:1rem;
          border:2px solid #E1E8DD;
          border-radius:8px;
          font-size:1rem;
          outline:none;
        }
        button {
          width:100%; padding:.75rem;
          background:#4F7042; color:#fff;
          border:none; border-radius:8px;
          font-weight:600; cursor:pointer;
        }
      `}</style>
    </div>
  );
}
