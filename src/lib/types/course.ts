export interface CourseProvider {
	name: string
	url: string
}

export interface CourseInstructor {
	name: string
	title: string
	avatar?: string
}

export interface Course {
	id: string
	slug: string
	title: string
	description: string
	shortDescription: string
	imageUrl: string
	heroImage?: string
	videoUrl?: string
	provider: CourseProvider
	instructor: CourseInstructor
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
