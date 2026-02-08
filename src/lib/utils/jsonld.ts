import type { Course } from '@/lib/types/course'
import {
	SITE_CONFIG,
	PUBLISHER_JSONLD,
	WEBSITE_JSONLD,
	ORGANIZATION_JSONLD,
} from '@/lib/data/site.config'

/**
 * Generate JSON-LD for the home page
 * Includes WebSite and Organization schemas
 */
export function generateHomeJsonLd() {
	return [
		WEBSITE_JSONLD,
		{
			...ORGANIZATION_JSONLD,
			'@context': 'https://schema.org',
		},
	]
}

/**
 * Generate JSON-LD for course listing page
 * Uses ItemList schema for better SEO
 */
export function generateCourseListJsonLd(courses: Course[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		'@id': `${SITE_CONFIG.url}/courses#itemlist`,
		name: 'All Courses',
		description:
			'Browse our collection of professional web development courses',
		numberOfItems: courses.length,
		itemListElement: courses.map((course, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			url: `${SITE_CONFIG.url}/courses/${course.slug}`,
			name: course.title,
		})),
	}
}

/**
 * Generate JSON-LD structured data for a course
 * Following schema.org/Course specification
 * @see https://schema.org/Course
 */
export function generateCourseJsonLd(course: Course) {
	const courseUrl = `${SITE_CONFIG.url}/courses/${course.slug}`

	// Build absolute image URL from database path
	const imageUrl = (course.heroImage || course.imageUrl).startsWith('http')
		? course.heroImage || course.imageUrl
		: `${SITE_CONFIG.url}${course.heroImage || course.imageUrl}`

	// Build video URL if available
	const videoUrl = course.videoUrl
		? course.videoUrl.startsWith('http')
			? course.videoUrl
			: `${SITE_CONFIG.url}${course.videoUrl}`
		: undefined

	const jsonLd: Record<string, unknown> = {
		'@context': 'https://schema.org',
		'@type': 'Course',
		'@id': `${courseUrl}#course`,
		url: courseUrl,
		name: course.title,
		description: course.description,
		image: imageUrl,
		provider: {
			'@type': 'Organization',
			name: course.provider.name,
			sameAs: course.provider.url,
		},
		publisher: PUBLISHER_JSONLD,
		instructor: {
			'@type': 'Person',
			name: course.instructor.name,
			jobTitle: course.instructor.title,
		},
		inLanguage: course.language,
		timeRequired: `PT${course.duration.replace(' hours', 'H').replace(' hour', 'H')}`,
		educationalLevel: course.level,
		offers: {
			'@type': 'Offer',
			url: courseUrl,
			price: course.price,
			priceCurrency: course.currency,
			availability: 'https://schema.org/InStock',
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: course.rating,
			reviewCount: course.reviewCount,
			bestRating: 5,
			worstRating: 1,
		},
		dateModified: course.lastUpdated,
		datePublished: course.createdAt,
	}

	// Add video if available
	if (videoUrl) {
		jsonLd.video = {
			'@type': 'VideoObject',
			name: `${course.title} - Course Introduction`,
			description: course.shortDescription,
			thumbnailUrl: imageUrl,
			contentUrl: videoUrl,
			uploadDate: course.createdAt,
		}
	}

	return jsonLd
}
