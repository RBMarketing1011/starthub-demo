import 'server-only'

import mongoose from 'mongoose'

if (!process.env.MONGODB_URI) {
	throw new Error('Please add MONGODB_URI to .env file')
}

const MONGODB_URI = process.env.MONGODB_URI

declare global {
	// eslint-disable-next-line no-var
	var mongooseCache:
		| {
				conn: typeof mongoose | null
				promise: Promise<typeof mongoose> | null
		  }
		| undefined
}

const cached = global.mongooseCache ?? { conn: null, promise: null }

if (!global.mongooseCache) {
	global.mongooseCache = cached
}

/**
 * Connect to MongoDB using Mongoose
 * Caches the connection in development to prevent multiple connections during HMR
 */
export async function connectDB(): Promise<typeof mongoose> {
	if (cached.conn) {
		return cached.conn
	}

	if (!cached.promise) {
		cached.promise = mongoose.connect(MONGODB_URI)
	}

	cached.conn = await cached.promise
	return cached.conn
}
