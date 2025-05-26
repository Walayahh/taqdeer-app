// lib/mongoose.js
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI)
if (!MONGO_URI) {
  throw new Error('⚠️ MONGO_URI environment variable is not set');
}

let cached = global._mongo;

if (!cached) {
  cached = global._mongo = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// **Make sure this is a default export!**
export default dbConnect;
