// pages/api/workers.js
import dbConnect from '../lib/mongoose'
import Worker    from '../models/Worker'

export default async function handler(req, res) {
  try {
    await dbConnect()
    const docs = await Worker.find({})
    // return only the fields you want
    res.status(200).json(
      docs.map(w => ({ name: w.name, workerId: w.workerId }))
    )
  } catch (e) {
    console.error('API /workers failed:', e)
    res.status(500).json({ error: 'Database error' })
  }
}
