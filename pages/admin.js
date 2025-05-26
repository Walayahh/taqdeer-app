// pages/admin.js
import dbConnect from '../lib/mongoose';
import Worker from '../models/Worker';  // adjust path to your Mongoose model
import QRCode from 'qrcode.react';

export default function AdminPage({ workers }) {
  return (
    <div style={{ padding: '2rem', maxWidth: 900, margin: 'auto' }}>
      <h1>🛠️ Admin Panel</h1>

      <h2>All Workers</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem'
      }}>
        {workers.map(w => {
          const tipPath = `/tip/${encodeURIComponent(w.workerId)}`;
          const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${tipPath}`;
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
              <a href={fullUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 style={{ color: '#0070f3', textDecoration: 'underline' }}>
                {tipPath}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// This runs on every request and supplies `workers` to the page
export async function getServerSideProps() {
  await dbConnect();
  const docs = await Worker.find({}, 'name workerId').lean();
  const workers = docs.map(d => ({
    name: d.name,
    workerId: d.workerId
  }));

  return { props: { workers } };
}
