// pages/api/workers.js
import dbConnect from '../../lib/mongoose'
import Worker    from '../../models/Worker'

export default async function handler(req, res) {
  console.log('🔄 [workers] API hit')
  try {
    console.log('📡 Connecting to Mongo…')
    await dbConnect()

    console.log('🔍 Querying Worker.find()…')
    const docs = await Worker.find({})
    console.log(`✅ Fetched ${docs.length} docs`)

    return res.status(200).json(
      docs.map(w => ({ name: w.name, workerId: w.workerId }))
    )
  } catch (err) {
    console.error('⚠️ [workers] ERROR:', err)
    return res.status(500).json({ error: err.message })
  }
}
