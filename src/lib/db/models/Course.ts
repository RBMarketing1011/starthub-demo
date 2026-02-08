import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICourseProvider {
	name: string
	url: string
}

export interface ICourseInstructor {
	name: string
	title: string
	avatar?: string
}

export interface ICourse extends Document {
	slug: string
	title: string
	description: string
	shortDescription: string
	imageUrl: string
	heroImage?: string
	videoUrl?: string
	provider: ICourseProvider
	instructor: ICourseInstructor
	duration: string
	level: 'Beginner' | 'Intermediate' | 'Advanced'
	topics: string[]
	price: number
	currency: string
	rating: number
	reviewCount: number
	enrollmentCount: number
	language: string
	lastUpdated: string
	createdAt: string
}

const CourseProviderSchema = new Schema<ICourseProvider>(
	{
		name: { type: String, required: true },
		url: { type: String, required: true },
	},
	{ _id: false },
)

const CourseInstructorSchema = new Schema<ICourseInstructor>(
	{
		name: { type: String, required: true },
		title: { type: String, required: true },
		avatar: { type: String },
	},
	{ _id: false },
)

const CourseSchema = new Schema<ICourse>(
	{
		slug: { type: String, required: true, unique: true, index: true },
		title: { type: String, required: true },
		description: { type: String, required: true },
		shortDescription: { type: String, required: true },
		imageUrl: { type: String, required: true },
		heroImage: { type: String },
		videoUrl: { type: String },
		provider: { type: CourseProviderSchema, required: true },
		instructor: { type: CourseInstructorSchema, required: true },
		duration: { type: String, required: true },
		level: {
			type: String,
			enum: ['Beginner', 'Intermediate', 'Advanced'],
			required: true,
		},
		topics: { type: [String], required: true },
		price: { type: Number, required: true },
		currency: { type: String, required: true, default: 'USD' },
		rating: { type: Number, required: true, min: 0, max: 5 },
		reviewCount: { type: Number, required: true, default: 0 },
		enrollmentCount: { type: Number, required: true, default: 0 },
		language: { type: String, required: true, default: 'English' },
		lastUpdated: { type: String, required: true },
		createdAt: { type: String, required: true },
	},
	{
		timestamps: false,
	},
)

// Prevent model recompilation in development
export const Course: Model<ICourse> =
	mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema)
