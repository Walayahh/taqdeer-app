// pages/api/workers.js
import dbConnect from '../../lib/mongoose'
import Worker    from '../../models/Worker'

export default async function handler(req, res) {
  try {
    console.log('🔄 [workers] API hit')
    await dbConnect()
    console.log('✅ Mongo connected')

    const docs = await Worker.find({})
    console.log(`✅ Found ${docs.length} workers`)

    return res.status(200).json(
      docs.map(w => ({ name: w.name, workerId: w.workerId }))
    )
  } catch (err) {
    console.error('🔥 [workers] ERROR:', err)
    // return the actual error message & stack in JSON
    res.status(500).json({ 
      error: err.message, 
      stack: err.stack?.split('\n').slice(0,5) 
    })
  }
}
