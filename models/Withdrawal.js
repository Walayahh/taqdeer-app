// /models/Withdrawal.js
import mongoose from 'mongoose';

const WithdrawalSchema = new mongoose.Schema({
  workerId:   { type: String, required: true },
  amount:     { type: Number, required: true },
  method:     { type: String, enum: ['IBAN','Ansari'], required: true },
  details:    { type: Object, required: true },  // e.g. { iban: '...', name:'...' } or { branch:'Dubai Mall' }
  createdAt:  { type: Date, default: Date.now }
});

export default mongoose.models.Withdrawal
  || mongoose.model('Withdrawal', WithdrawalSchema);
