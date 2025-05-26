// pages/admin.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import QRCode         from 'qrcode.react'
import dbConnect      from '../lib/mongoose'
import Worker         from '../models/Worker'

export default function AdminPage({ initialWorkers }) {
  const [workers, setWorkers] = useState(initialWorkers)
  const [name,    setName]    = useState('')
  const [id,      setId]      = useState('')
  const [busy,    setBusy]    = useState(false)
  const [error,   setError]   = useState('')
  const router               = useRouter()

  async function handleCreate(e) {
    e.preventDefault()
    setError('')
    if (!name.trim() || !id.trim()) {
      setError('Name & ID required')
      return
    }
    setBusy(true)
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ name: name.trim(), id: id.trim() })
    })
    const j = await res.json()
    if (!res.ok) {
      setError(j.error || 'Failed to create')
    } else {
      // clear form and reload to get fresh data
      setName(''); setId('')
      router.replace(router.asPath)
    }
    setBusy(false)
  }

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

      {error && <p style={{ color:'red' }}>{error}</p>}

      <h2>All Workers</h2>
      <div style={{
        display:'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap:'1rem'
      }}>
        {workers.map(w => {
          const tipPath = `/tip/${encodeURIComponent(w.workerId)}`
          // for QR, use absolute URL if you have NEXT_PUBLIC_BASE_URL
          const fullUrl = (process.env.NEXT_PUBLIC_BASE_URL || '') + tipPath

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
                href={tipPath}
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

// This runs ON THE SERVER at each request:
export async function getServerSideProps() {
  // 1) Connect to Mongo
  await dbConnect()

  // 2) Fetch all workers
  const docs = await Worker.find({}, 'name workerId').lean()

  // 3) Serialize for JSON
  const initialWorkers = docs.map(d => ({
    name: d.name,
    workerId: d.workerId
  }))

  // 4) Pass to the page via props
  return { props: { initialWorkers } }
}
