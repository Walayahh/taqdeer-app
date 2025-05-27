// /pages/api/tips/[id].js
import dbConnect from '../../../lib/mongoose';
import Tip       from '../../../models/Tip';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  if (req.method === 'GET') {
    const tips = await Tip.find({ workerId: id })
                          .sort({ createdAt: -1 })
                          .lean();
    return res.status(200).json({ success: true, tips });
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
