// pages/api/workers.js
import dbConnect from '../../lib/mongoose';
import Worker     from '../../models/Worker';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'GET') {
    const docs = await Worker.find({}, 'name workerId').lean();
    const workers = docs.map(d => ({ name: d.name, workerId: d.workerId }));
    return res.status(200).json({ workers });
  }
  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
