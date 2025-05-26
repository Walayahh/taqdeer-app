// pages/admin.js
import { useState }       from 'react'
import { useRouter }      from 'next/router'
import QRCode             from 'qrcode.react'
import dbConnect          from '../lib/mongoose'
import Worker             from '../models/Worker'

export default function AdminPage({ workers }) {
  const [name, setName] = useState('')
  const [id,   setId]   = useState('')
  const [err,  setErr]  = useState('')
  const router = useRouter()

  async function handleCreate(e) {
    e.preventDefault()
    setErr('')
    if (!name.trim() || !id.trim()) {
      setErr('Name & ID required')
      return
    }
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ name: name.trim(), id: id.trim() })
    })
    if (res.ok) {
      setName(''); setId('')
      // reload the page to fetch fresh worker list
      router.replace(router.asPath)
    } else {
      const j = await res.json()
      setErr(j.error || 'Failed to create')
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 900, margin: 'auto' }}>
      <h1>🛠️ Admin Panel</h1>

      {/* create‐worker form */}
      <form onSubmit={handleCreate} style={{ margin: '1.5rem 0', display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder="Worker Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Worker ID"
          value={id}
          onChange={e => setId(e.target.value)}
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button
          type="submit"
          style={{
            padding: '0.6rem 1.2rem',
            background: '#4F7042',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          Create
        </button>
      </form>
      {err && <p style={{ color: 'red' }}>{err}</p>}

      {/* list of all workers with QR codes */}
      <h2>All Workers</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))',
        gap: '1rem'
      }}>
        {workers.map(w => {
          const tipPath = `/tip/${encodeURIComponent(w.workerId)}`
          // NEXT_PUBLIC_BASE_URL should be e.g. "taqdeer-app.vercel.app"
          const fullUrl = `https://${process.env.NEXT_PUBLIC_BASE_URL}${tipPath}`
          return (
            <div key={w.workerId} style={{
              border: '1px solid #ccc',
              borderRadius: 8,
              padding: '1rem',
              textAlign: 'center'
            }}>
              <strong>{w.name}</strong><br/>
              <small>ID: {w.workerId}</small>
              <div style={{ margin: '1rem 0' }}>
                <QRCode value={fullUrl} size={128} level="H" />
              </div>
              <a
                href={fullUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#0070f3', textDecoration: 'underline' }}
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

export async function getServerSideProps() {
  await dbConnect()
  // fetch only the fields we need
  const docs    = await Worker.find({}, 'name workerId').lean()
  const workers = docs.map(d => ({
    name:     d.name,
    workerId: d.workerId
  }))
  return { props: { workers }}
}
