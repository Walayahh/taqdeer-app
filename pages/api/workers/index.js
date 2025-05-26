// pages/api/workers/index.js
import dbConnect from '../../../lib/mongoose';
import Worker    from '../../../models/Worker';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const workers = await Worker.find({}, 'name workerId').lean();
      return res.status(200).json(workers);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'DB error' });
    }
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
