// pages/admin.js
import { useState } from 'react'
import useSWR      from 'swr'
import QRCode      from 'qrcode.react'

const fetcher = url => fetch(url).then(r => r.json())

export default function AdminPage() {
  // fetch all workers
  const { data: workers, error, mutate } = useSWR('/api/workers', fetcher)
  const [name, setName] = useState('')
  const [id, setId]     = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr]   = useState('')

  async function handleCreate(e) {
    e.preventDefault()
    setErr('')
    if (!name.trim() || !id.trim()) {
      setErr('Name & ID required')
      return
    }
    setBusy(true)
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ name: name.trim(), id: id.trim() })
    })
    const j = await res.json()
    if (!res.ok) setErr(j.error || 'Failed to create')
    else {
      setName(''); setId(''); 
      await mutate()  // re-fetch list
    }
    setBusy(false)
  }

  if (error){
      console.log(error);
      return <p>Failed to load workers.</p>
      
  }   
  if (!workers) return <p>Loading…</p>

  return (
    <div style={{ padding: '2rem', maxWidth: 900, margin: 'auto' }}>
      <h1>🛠️ Admin Panel</h1>
      <form onSubmit={handleCreate} style={{ margin: '1.5rem 0' }}>
        <input
          type="text"
          placeholder="Worker Name"
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={busy}
          style={{ padding:'0.5rem', marginRight:'0.5rem' }}
        />
        <input
          type="text"
          placeholder="Worker ID"
          value={id}
          onChange={e => setId(e.target.value)}
          disabled={busy}
          style={{ padding:'0.5rem', marginRight:'0.5rem' }}
        />
        <button
          type="submit"
          disabled={busy}
          style={{
            padding:'0.6rem 1.2rem',
            background:'#4F7042',
            color:'white',
            border:'none',
            borderRadius:4,
            cursor: busy ? 'not-allowed':'pointer'
          }}
        >
          {busy ? 'Creating…' : 'Create Worker'}
        </button>
      </form>
      {err && <p style={{ color:'red' }}>{err}</p>}

      <h2>All Workers</h2>
      <div style={{
        display:'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap:'1rem'
      }}>
        {workers.map(w => {
          const tipPath = `/tip/${encodeURIComponent(w.workerId)}`
          const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${tipPath}`
          return (
            <div key={w.workerId} style={{
              border:'1px solid #ccc',
              borderRadius:8,
              padding:'1rem',
              textAlign:'center'
            }}>
              <strong>{w.name}</strong><br/>
              <small>ID: {w.workerId}</small>

              <div style={{ margin:'1rem 0' }}>
                <QRCode value={fullUrl} size={128} level="H" />
              </div>

              <a
                href={fullUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color:'#0070f3', textDecoration:'underline' }}
              >
                {tipPath}
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}
