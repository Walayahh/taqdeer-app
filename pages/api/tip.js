// pages/api/tip.js
import dbConnect from '../../lib/mongoose'
import Worker    from '../../models/Worker'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const { workerId, amount } = req.body
  if (!workerId || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid payload' })
  }

  await dbConnect()
  const updated = await Worker.findOneAndUpdate(
    { workerId },
    { $inc: { balance: amount -1 } },
    { new: true }
  )

  if (!updated) {
    return res.status(404).json({ error: 'Worker not found' })
  }

  res.status(200).json({
    name:     updated.name,
    workerId: updated.workerId,
    balance:  updated.balance
  })
}
