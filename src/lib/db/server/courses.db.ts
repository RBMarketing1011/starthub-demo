import 'server-only'

import type { Course as CourseType } from '@/lib/types/course'
import { connectDB } from '@/lib/db/mongodb'
import { Course } from '@/lib/db/models/Course'

/**
 * Transform Mongoose document to Course type
 */
function toCourse(doc: InstanceType<typeof Course>): CourseType {
	return {
		id: doc._id.toString(),
		slug: doc.slug,
		title: doc.title,
		description: doc.description,
		shortDescription: doc.shortDescription,
		imageUrl: doc.imageUrl,
		provider: doc.provider,
		instructor: doc.instructor,
		duration: doc.duration,
		level: doc.level,
		topics: doc.topics,
		price: doc.price,
		currency: doc.currency,
		rating: doc.rating,
		reviewCount: doc.reviewCount,
		enrollmentCount: doc.enrollmentCount,
		language: doc.language,
		lastUpdated: doc.lastUpdated,
		createdAt: doc.createdAt,
	}
}

/**
 * Get a course by its slug
 * @param slug - The unique slug identifier for the course
 * @returns The course object or null if not found
 */
export async function getCourseBySlug(
	slug: string,
): Promise<CourseType | null> {
	await connectDB()
	const doc = await Course.findOne({ slug }).lean()

	if (!doc) return null
	return {
		id: doc._id.toString(),
		slug: doc.slug,
		title: doc.title,
		description: doc.description,
		shortDescription: doc.shortDescription,
		imageUrl: doc.imageUrl,
		heroImage: doc.heroImage,
		videoUrl: doc.videoUrl,
		provider: doc.provider,
		instructor: doc.instructor,
		duration: doc.duration,
		level: doc.level,
		topics: doc.topics,
		price: doc.price,
		currency: doc.currency,
		rating: doc.rating,
		reviewCount: doc.reviewCount,
		enrollmentCount: doc.enrollmentCount,
		language: doc.language,
		lastUpdated: doc.lastUpdated,
		createdAt: doc.createdAt,
	}
}

/**
 * Get all courses
 * @returns Array of all courses
 */
export async function getAllCourses(): Promise<CourseType[]> {
	await connectDB()
	const docs = await Course.find({}).lean()

	return docs.map((doc) => ({
		id: doc._id.toString(),
		slug: doc.slug,
		title: doc.title,
		description: doc.description,
		shortDescription: doc.shortDescription,
		imageUrl: doc.imageUrl,
		heroImage: doc.heroImage,
		videoUrl: doc.videoUrl,
		provider: doc.provider,
		instructor: doc.instructor,
		duration: doc.duration,
		level: doc.level,
		topics: doc.topics,
		price: doc.price,
		currency: doc.currency,
		rating: doc.rating,
		reviewCount: doc.reviewCount,
		enrollmentCount: doc.enrollmentCount,
		language: doc.language,
		lastUpdated: doc.lastUpdated,
		createdAt: doc.createdAt,
	}))
}

/**
 * Get courses by level
 * @param level - The difficulty level to filter by
 * @returns Array of courses matching the level
 */
export async function getCoursesByLevel(
	level: CourseType['level'],
): Promise<CourseType[]> {
	await connectDB()
	const docs = await Course.find({ level }).lean()

	return docs.map((doc) => ({
		id: doc._id.toString(),
		slug: doc.slug,
		title: doc.title,
		description: doc.description,
		shortDescription: doc.shortDescription,
		imageUrl: doc.imageUrl,
		heroImage: doc.heroImage,
		videoUrl: doc.videoUrl,
		provider: doc.provider,
		instructor: doc.instructor,
		duration: doc.duration,
		level: doc.level,
		topics: doc.topics,
		price: doc.price,
		currency: doc.currency,
		rating: doc.rating,
		reviewCount: doc.reviewCount,
		enrollmentCount: doc.enrollmentCount,
		language: doc.language,
		lastUpdated: doc.lastUpdated,
		createdAt: doc.createdAt,
	}))
}

/**
 * Get all course slugs for static generation
 * @returns Array of slug strings
 */
export async function getAllCourseSlugs(): Promise<string[]> {
	await connectDB()
	const docs = await Course.find({}).select('slug').lean()

	return docs.map((doc) => doc.slug)
}
