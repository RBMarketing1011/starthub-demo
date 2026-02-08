import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongodb'
import { Course } from '@/lib/db/models/Course'

const SEED_COURSES = [
	{
		slug: 'nextjs-fundamentals',
		title: 'Next.js 15 Fundamentals: Build Modern Web Applications',
		description:
			'Master Next.js 15 from the ground up. Learn Server Components, App Router, SSR, SSG, and build production-ready applications with the latest React framework. This comprehensive course covers everything from project setup to deployment, including data fetching patterns, authentication, and performance optimization techniques used by industry professionals.',
		shortDescription:
			'Learn Next.js 15 with App Router, Server Components, and modern React patterns for production apps.',
		imageUrl: 'https://pvlvuqg54cpvg3px.public.blob.vercel-storage.com/image-1.jpg',
		heroImage: 'https://pvlvuqg54cpvg3px.public.blob.vercel-storage.com/image-1.jpg',
		videoUrl: 'https://pvlvuqg54cpvg3px.public.blob.vercel-storage.com/video-1.mp4',
		provider: {
			name: 'StartHub Academy',
			url: 'https://starthub.academy',
		},
		instructor: {
			name: 'Sarah Chen',
			title: 'Senior Software Engineer',
			avatar: '/images/instructors/sarah-chen.jpg',
		},
		duration: '12 hours',
		level: 'Intermediate',
		topics: [
			'Next.js App Router',
			'React Server Components',
			'SSR & SSG',
			'Data Fetching',
			'API Routes',
			'Authentication',
			'Deployment',
		],
		price: 79.99,
		currency: 'USD',
		rating: 4.8,
		reviewCount: 1247,
		enrollmentCount: 15420,
		language: 'English',
		lastUpdated: '2026-01-15',
		createdAt: '2025-06-01',
	},
	{
		slug: 'react-design-patterns',
		title: 'Advanced React Design Patterns & Best Practices',
		description:
			'Take your React skills to the next level with advanced design patterns and architectural best practices. Learn compound components, render props, custom hooks, state machines, and how to build scalable, maintainable React applications. This course is designed for developers who want to write cleaner, more efficient React code.',
		shortDescription:
			'Master advanced React patterns including compound components, custom hooks, and scalable architecture.',
		imageUrl: 'https://pvlvuqg54cpvg3px.public.blob.vercel-storage.com/image-2.jpg',
		heroImage: 'https://pvlvuqg54cpvg3px.public.blob.vercel-storage.com/image-2.jpg',
		videoUrl: 'https://pvlvuqg54cpvg3px.public.blob.vercel-storage.com/video-2.mp4',
		provider: {
			name: 'StartHub Academy',
			url: 'https://starthub.academy',
		},
		instructor: {
			name: 'Marcus Johnson',
			title: 'Principal Frontend Architect',
			avatar: '/images/instructors/marcus-johnson.jpg',
		},
		duration: '8 hours',
		level: 'Advanced',
		topics: [
			'Compound Components',
			'Render Props',
			'Custom Hooks',
			'State Machines',
			'Performance Patterns',
			'Testing Strategies',
		],
		price: 99.99,
		currency: 'USD',
		rating: 4.9,
		reviewCount: 892,
		enrollmentCount: 8340,
		language: 'English',
		lastUpdated: '2026-01-20',
		createdAt: '2025-03-15',
	},
	{
		slug: 'typescript-for-react',
		title: 'TypeScript for React Developers: Complete Guide',
		description:
			'Learn how to use TypeScript effectively in React applications. From basic types to advanced generics, this course covers everything you need to write type-safe React code. Includes practical examples with hooks, context, Redux, and form libraries. Build confidence with compile-time error checking and improved developer experience.',
		shortDescription:
			'Complete TypeScript guide for React developers - from basics to advanced generics and type-safe patterns.',
		imageUrl: 'https://pvlvuqg54cpvg3px.public.blob.vercel-storage.com/image-3.jpg',
		heroImage: 'https://pvlvuqg54cpvg3px.public.blob.vercel-storage.com/image-3.jpg',
		videoUrl: 'https://pvlvuqg54cpvg3px.public.blob.vercel-storage.com/video-3.mp4',
		provider: {
			name: 'StartHub Academy',
			url: 'https://starthub.academy',
		},
		instructor: {
			name: 'Elena Rodriguez',
			title: 'Full-Stack Developer',
			avatar: '/images/instructors/elena-rodriguez.jpg',
		},
		duration: '10 hours',
		level: 'Intermediate',
		topics: [
			'TypeScript Basics',
			'React Component Types',
			'Generic Components',
			'Type-Safe Hooks',
			'Context & Redux Types',
			'Form Library Integration',
		],
		price: 69.99,
		currency: 'USD',
		rating: 4.7,
		reviewCount: 1583,
		enrollmentCount: 21050,
		language: 'English',
		lastUpdated: '2026-02-01',
		createdAt: '2025-01-10',
	},
	{
		slug: 'web-accessibility-fundamentals',
		title: 'Web Accessibility (A11y): Building Inclusive Websites',
		description:
			'Create websites that everyone can use. This course teaches WCAG guidelines, semantic HTML, ARIA attributes, keyboard navigation, and screen reader compatibility. Learn to audit existing sites for accessibility issues and implement fixes. Essential knowledge for building compliant, user-friendly web applications.',
		shortDescription:
			'Learn WCAG guidelines, semantic HTML, ARIA, and techniques to build accessible websites for all users.',
		imageUrl: 'https://pvlvuqg54cpvg3px.public.blob.vercel-storage.com/image-4.jpg',
		heroImage: 'https://pvlvuqg54cpvg3px.public.blob.vercel-storage.com/image-4.jpg',
		videoUrl: 'https://pvlvuqg54cpvg3px.public.blob.vercel-storage.com/video-4.mp4',
		provider: {
			name: 'StartHub Academy',
			url: 'https://starthub.academy',
		},
		instructor: {
			name: 'David Park',
			title: 'Accessibility Specialist',
			avatar: '/images/instructors/david-park.jpg',
		},
		duration: '6 hours',
		level: 'Beginner',
		topics: [
			'WCAG Guidelines',
			'Semantic HTML',
			'ARIA Attributes',
			'Keyboard Navigation',
			'Screen Readers',
			'Accessibility Auditing',
		],
		price: 49.99,
		currency: 'USD',
		rating: 4.9,
		reviewCount: 723,
		enrollmentCount: 9870,
		language: 'English',
		lastUpdated: '2025-12-10',
		createdAt: '2025-04-20',
	},
]

/**
 * POST /api/seed
 * Seeds the database with initial course data
 * Only works in development mode
 */
export async function POST() {
	// Only allow in development
	if (process.env.NODE_ENV === 'production') {
		return NextResponse.json(
			{ error: 'Seeding is not allowed in production' },
			{ status: 403 },
		)
	}

	try {
		await connectDB()

		// Clear existing courses
		await Course.deleteMany({})

		// Insert seed data
		const result = await Course.insertMany(SEED_COURSES)

		return NextResponse.json({
			success: true,
			message: `Seeded ${result.length} courses`,
			courses: result.map((c) => ({ slug: c.slug, title: c.title })),
		})
	} catch (error) {
		console.error('Seed error:', error)
		return NextResponse.json(
			{ error: 'Failed to seed database', details: String(error) },
			{ status: 500 },
		)
	}
}

/**
 * GET /api/seed
 * Returns info about the seed endpoint
 */
export async function GET() {
	return NextResponse.json({
		message: 'POST to this endpoint to seed the database',
		warning: 'This will delete all existing courses and insert seed data',
		allowedIn: 'development only',
	})
}
