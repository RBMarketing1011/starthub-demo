import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCourseBySlug, getAllCourseSlugs } from '@/lib/db/server/courses.db'
import { CourseHeader, CourseContent, CourseJsonLd } from '@/components/course'

interface CoursePageProps {
	params: Promise<{ slug: string }>
}

/**
 * Generate static params for all courses
 * This enables static generation for known course slugs
 */
export async function generateStaticParams() {
	const slugs = await getAllCourseSlugs()
	return slugs.map((slug) => ({ slug }))
}

/**
 * Generate dynamic metadata for SEO
 * This runs on the server and provides title, description, and OG tags
 */
export async function generateMetadata({
	params,
}: CoursePageProps): Promise<Metadata> {
	const { slug } = await params
	const course = await getCourseBySlug(slug)

	if (!course) {
		return {
			title: 'Course Not Found',
			description: 'The requested course could not be found.',
		}
	}

	const title = course.title
	const description = course.shortDescription
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://starthub.academy'

	// Build absolute image URL from database path
	const imageUrl = course.heroImage?.startsWith('http')
		? course.heroImage
		: `${baseUrl}${course.heroImage || course.imageUrl}`

	return {
		title,
		description,
		keywords: course.topics,
		authors: [{ name: course.instructor.name }],
		openGraph: {
			title: `${title} | StartHub Academy`,
			description,
			type: 'website',
			url: `${baseUrl}/courses/${course.slug}`,
			siteName: 'StartHub Academy',
			images: [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt: course.title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: `${title} | StartHub Academy`,
			description,
			images: [imageUrl],
		},
		alternates: {
			canonical: `${baseUrl}/courses/${course.slug}`,
		},
	}
}

/**
 * Course Detail Page - Server Component
 * Fully SSR rendered with SEO optimizations
 */
export default async function CoursePage({ params }: CoursePageProps) {
	const { slug } = await params
	const course = await getCourseBySlug(slug)

	if (!course) {
		notFound()
	}

	return (
		<>
			{/* JSON-LD Structured Data for Google Rich Snippets */}
			<CourseJsonLd course={course} />

			<main>
				{/* Full-width Hero with Background Image */}
				<CourseHeader course={course} />

				{/* Content Section */}
				<div className='container mx-auto px-4 py-8 max-w-6xl'>
					<CourseContent course={course} />
				</div>
			</main>
		</>
	)
}
