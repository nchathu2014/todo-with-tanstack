import mongoose, { mongo } from "mongoose";

// types/global.d.ts — create this file
declare global {
  var mongoose: {
    conn: typeof import("mongoose") | null;
    promise: Promise<typeof import("mongoose")> | null;
  };
}

const MONGODB_URI = process.env.NEXT_MONGODB_URI || "";
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const dbConnect = async () => {
  if (!MONGODB_URI)
    throw new Error("Please define NEXT_MONGODB_URI env variable");
  if (cached.conn) {
    console.log("Already connected to mongodb!");
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
     console.log("Connected to mongodb successfully!");
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};
