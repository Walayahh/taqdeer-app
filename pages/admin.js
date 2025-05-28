// pages/admin.js
import { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { useRouter } from 'next/router';

export default function AdminPage() {
  const [name, setName]     = useState('');
  const [id,   setId]       = useState('');
  const [err,  setErr]      = useState('');
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // fetch workers on mount
  useEffect(() => {
    fetch('/api/workers')
      .then(r => r.json())
      .then(data => {
        setWorkers(data.workers);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setErr('Failed to load workers');
        setLoading(false);
      });
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setErr('');
    if (!name.trim() || !id.trim()) {
      return setErr('Name & ID required');
    }
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), id: id.trim() })
    });
    if (res.ok) {
      setName(''); setId('');
      // re-fetch worker list
      router.replace(router.asPath);
    } else {
      const { error } = await res.json();
      setErr(error || 'Failed to create');
    }
  }

  if (loading) return <p>Loading…</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: 900, margin: 'auto' }}>
      <h1>🛠️ Admin Panel</h1>

      <form onSubmit={handleCreate} style={{ margin: '1.5rem 0', display: 'flex', gap: '.5rem' }}>
        <input
          placeholder="Worker Name" value={name}
          onChange={e => setName(e.target.value)}
          style={{ flex: 1, padding: '.5rem' }}
        />
        <input
          placeholder="Worker ID" value={id}
          onChange={e => setId(e.target.value)}
          style={{ flex: 1, padding: '.5rem' }}
        />
        <button type="submit" style={{ padding: '.6rem 1.2rem', background: '#4F7042', color: 'white', border: 'none', borderRadius: 4 }}>
          Create
        </button>
      </form>
      {err && <p style={{ color: 'red' }}>{err}</p>}

      <h2>All Workers</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))',
        gap: '1rem'
      }}>
        {workers.map(w => {
          const tipPath = `/tip/${encodeURIComponent(w.workerId)}`;
          const fullUrl = `https://${process.env.NEXT_PUBLIC_BASE_URL}${tipPath}`;
          return (
            <div key={w.workerId} style={{ border: '1px solid #ccc', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
              <strong>{w.name}</strong><br/>
              <small>ID: {w.workerId}</small>
              <div style={{ margin: '1rem 0' }}>
                <QRCode value={fullUrl} size={128} level="H" />
              </div>
              <a href={fullUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#0070f3', textDecoration: 'underline' }}>
                {tipPath}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
