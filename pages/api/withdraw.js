// /pages/api/withdraw.js
import dbConnect from '../../lib/mongoose';
import Withdrawal from '../../models/Withdrawal';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  await dbConnect();
  const { workerId, amount, method, details } = req.body;
  if (!workerId || amount <= 0 || !method || !details) {
    return res.status(400).json({ success:false, error:'Invalid input' });
  }

  // record it
  const w = await Withdrawal.create({ workerId, amount, method, details });
  return res.status(201).json({ success:true, withdrawal: w });
}
