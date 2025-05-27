// /models/Tip.js
import mongoose from 'mongoose';

const TipSchema = new mongoose.Schema({
  workerId:  { type: String, required: true },
  amount:    { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Tip || mongoose.model('Tip', TipSchema);
