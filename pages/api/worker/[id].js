// pages/api/worker/[workerId].js
import dbConnect from '../../../lib/mongoose'
import Worker    from '../../../models/Worker'

export default async function handler(req, res) {
  const { workerId } = req.query
  await dbConnect()

  if (req.method === 'GET') {
    const worker = await Worker.findOne({ workerId }).lean()
    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' })
    }
    return res.status(200).json({
      name:     worker.name,
      workerId: worker.workerId,
      balance:  worker.balance
    })
  }

  res.setHeader('Allow', ['GET'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
