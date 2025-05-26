// pages/api/generate.js
import dbConnect from '../../lib/mongoose'
import Worker     from '../../models/Worker'

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const { name, id } = req.body
  if (!name || !id) {
    return res.status(400).json({ error: 'Missing name or id' })
  }

  try {
    // 1) connect to Mongo
    await dbConnect()

    // 2) prevent duplicate workerId
    const exists = await Worker.findOne({ workerId: id })
    if (exists) {
      return res.status(409).json({ error: 'That ID already exists' })
    }

    // 3) create the new worker
    await Worker.create({ name, workerId: id })

    // 4) success
    return res.status(201).json({ success: true })
  } catch (err) {
    console.error('[/api/generate] error:', err)
    return res.status(500).json({ error: err.message })
  }
}
