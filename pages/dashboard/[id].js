// /pages/dashboard/[id].js
import { useRouter }     from 'next/router';
import useSWR            from 'swr';
import { useState }      from 'react';
const fetcher = url => fetch(url).then(r=>r.json());

export default function Dashboard() {
  const { query } = useRouter();
  const id = query.id;
  // fetch tips + withdrawals in parallel
  const { data: T, error: e1 } = useSWR(id ? `/api/tips/${id}` : null, fetcher);
  const { data: W, error: e2 } = useSWR(id ? `/api/withdrawals/${id}` : null, fetcher);
  const [method, setMethod] = useState('IBAN');
  const [form, setForm]     = useState({});
  const [amt, setAmt]       = useState('');
  const [busy, setBusy]     = useState(false);
  const refreshTips = () => { T.mutate?.(); W.mutate?.(); };

  if (e1||e2) return <p className="status">Failed to load data.</p>;
  if (!T||!W) return <p className="status">Loading…</p>;

  const tips        = T.tips;
  const withdraws   = W.withdrawals;
  const totalTips   = tips.reduce((s,t)=>s+t.amount,0);
  const totalWith   = withdraws.reduce((s,w)=>s+w.amount,0);
  const balance     = totalTips - totalWith;

  async function onWithdraw(e){
    e.preventDefault();
    const numeric = parseFloat(amt);
    if (!numeric || numeric > balance) return;

    setBusy(true);
    // service fee: 1% flat or 1 AED min?
    const fee = Math.max(1, numeric * 0.01);
    const net = numeric - fee;

    const body = {
      workerId: id,
      amount: numeric,
      method,
      details: form
    };
    await fetch('/api/withdraw',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(body)
    });
    setAmt(''); setForm({});
    refreshTips();
    setBusy(false);
  }

  return (
    <div className="wrapper">
      <div className="card">
        <img src="/taqdeer.png" className="logo" />
        <h1>Welcome, {id}</h1>
        <p className="summary">
          Balance: <strong>AED {balance.toFixed(2)}</strong>
        </p>

        <section className="withdraw-form">
          <h2>Withdraw to:</h2>
          <div className="methods">
            {['IBAN','Ansari'].map(m=>(
              <button
                key={m}
                className={method===m?'sel':''}
                onClick={()=>setMethod(m)}>
                {m}
              </button>
            ))}
          </div>

          {method==='IBAN' ? (
            <div className="fields">
              <input
                placeholder="IBAN"
                value={form.iban||''}
                onChange={e=>setForm({...form,iban:e.target.value})}
                disabled={busy}
              />
              <input
                placeholder="Account Name"
                value={form.name||''}
                onChange={e=>setForm({...form,name:e.target.value})}
                disabled={busy}
              />
            </div>
          ) : (
            <div className="fields">
              <input
                placeholder="Branch Location"
                value={form.branch||''}
                onChange={e=>setForm({...form,branch:e.target.value})}
                disabled={busy}
              />
            </div>
          )}

          <input
            placeholder="Amount AED"
            type="number" step="0.01"
            value={amt}
            onChange={e=>setAmt(e.target.value)}
            disabled={busy}
          />

          <button
            onClick={onWithdraw}
            disabled={busy||!form||!amt||parseFloat(amt)>balance}
          >
            {busy ? 'Processing…':'Withdraw'}
          </button>
        </section>

        <section className="lists">
          <h2>Recent Tips</h2>
          <ul>
            {tips.map((t,i)=>
              <li key={i}>
                <span>{new Date(t.createdAt).toLocaleDateString()}</span>
                <span>AED {t.amount.toFixed(2)}</span>
              </li>
            )}
            {tips.length===0 && <li className="empty">No tips yet</li>}
          </ul>

          <h2>Withdrawals</h2>
          <ul>
            {withdraws.map((w,i)=>
              <li key={i}>
                <span>{new Date(w.createdAt).toLocaleDateString()}</span>
                <span>AED {w.amount.toFixed(2)}</span>
              </li>
            )}
            {withdraws.length===0 && <li className="empty">No withdrawals</li>}
          </ul>
        </section>
      </div>

      <style jsx>{`
      .wrapper {
        min-height:100vh;
        display:flex; align-items:center; justify-content:center;
        background:linear-gradient(135deg,#FBEAD2,#E8D5B7);
        padding:2rem; font-family:Inter,sans-serif;
      }
      .card {
        background:rgba(255,255,255,0.95);
        padding:2rem; border-radius:16px;
        max-width:420px; width:100%;
        box-shadow:0 15px 40px rgba(0,0,0,0.1);
        animation:fadeIn .5s ease-out;
      }
      @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1} }

      .logo { display:block;margin:0 auto 1rem; max-width:80px; }

      h1 { text-align:center; margin-bottom:.5rem; color:#2D5233; }
      .summary { text-align:center; margin-bottom:1.5rem; color:#4F7042; }

      .withdraw-form h2 {
        margin-bottom:.5rem; color:#333;
        font-size:1.1rem;
      }
      .methods { display:flex; gap:.5rem; margin-bottom:1rem; }
      .methods button {
        flex:1; padding:.5rem; border:1px solid #ccc;
        background:#fff; border-radius:4px; cursor:pointer;
        transition:.2s;
      }
      .methods .sel {
        background:#4F7042; color:#fff; border-color:#4F7042;
      }

      .fields input {
        width:100%; padding:.5rem; margin-bottom:.5rem;
        border:2px solid #E1E8DD; border-radius:6px;
      }

      .withdraw-form input[type="number"] {
        margin:1rem 0;
      }

      .withdraw-form button {
        width:100%; padding:.75rem;
        background:#667eea; color:#fff;
        border:none; border-radius:8px; font-weight:600;
        cursor:pointer; transition:.2s;
      }
      .withdraw-form button:disabled {
        opacity:.6; cursor:not-allowed;
      }

      .lists h2 {
        margin-top:2rem; margin-bottom:.5rem;
        color:#2D5233; font-size:1.1rem;
      }
      ul {
        list-style:none; padding:0; margin:0;
        border-top:1px solid #E1E8DD;
      }
      li {
        display:flex; justify-content:space-between;
        padding:.75rem 0; border-bottom:1px solid #E1E8DD;
        font-size:.95rem; color:#2D5233;
      }
      .empty {
        text-align:center; color:#7A9A70; font-style:italic;
      }

      .status { text-align:center; margin-top:2rem; }

      `}</style>
    </div>
  );
}
