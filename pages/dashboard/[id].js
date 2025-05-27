// /pages/dashboard/[id].js
import { useRouter } from 'next/router';
import useSWR        from 'swr';

const fetcher = url => fetch(url).then(r => r.json());

export default function DashboardPage() {
  const { query } = useRouter();
  const id = query.id;
  const { data, error } = useSWR(id ? `/api/tips/${id}` : null, fetcher);

  if (error) return <p className="status">Failed to load tips.</p>;
  if (!data)  return <p className="status">Loading…</p>;

  const tips  = data.tips;
  const total = tips.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="wrapper">
      <div className="card">
        <img src="/taqdeer.png" alt="Taqdeer Logo" className="logo" />
        <h1>Your Dashboard</h1>
        <p className="summary">
          Received <strong>{tips.length}</strong> tip{tips.length!==1?'s':''} — total <strong>AED {total.toFixed(2)}</strong>
        </p>
        <ul className="tip-list">
          {tips.map((t,i) => (
            <li key={i}>
              <span>{new Date(t.createdAt).toLocaleString()}</span>
              <span>AED {t.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .wrapper {
          min-height:100vh;
          display:flex; align-items:center; justify-content:center;
          background: linear-gradient(135deg,#FBEAD2,#E8D5B7);
          font-family:'Inter',sans-serif;
          padding:2rem;
        }
        .card {
          background:rgba(255,255,255,0.95);
          padding:2rem; border-radius:16px;
          box-shadow:0 15px 40px rgba(0,0,0,0.1);
          width:100%; max-width:400px;
        }
        .logo {
          display:block; margin:0 auto 1rem;
          max-width:100px;
        }
        h1 {
          text-align:center; color:#2D5233;
          margin-bottom:.5rem;
        }
        .summary {
          text-align:center;
          color:#4F7042;
          margin-bottom:1.5rem;
          font-weight:500;
        }
        .tip-list {
          list-style:none; padding:0; margin:0;
          border-top:1px solid #E1E8DD;
        }
        .tip-list li {
          display:flex; justify-content:space-between;
          padding:.75rem 0;
          border-bottom:1px solid #E1E8DD;
          font-size:.95rem; color:#2D5233;
        }
        .status {
          text-align:center; color:#7A9A70; font-size:1rem;
        }
      `}</style>
    </div>
  );
}
