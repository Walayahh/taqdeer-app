// /pages/api/withdrawals/[id].js
import dbConnect from '../../../lib/mongoose';
import Withdrawal from '../../../models/Withdrawal';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();
  if (req.method === 'GET') {
    const items = await Withdrawal.find({ workerId: id })
                                  .sort({ createdAt: -1 })
                                  .lean();
    return res.status(200).json({ success: true, withdrawals: items });
  }
  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
