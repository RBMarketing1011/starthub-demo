import type { Course } from '@/lib/types/course'
import { generateCourseListJsonLd } from '@/lib/utils/jsonld'

interface CourseListJsonLdProps {
	courses: Course[]
}

/**
 * Renders JSON-LD structured data for course listing page
 * Uses ItemList schema
 */
export function CourseListJsonLd({ courses }: CourseListJsonLdProps) {
	const jsonLd = generateCourseListJsonLd(courses)

	return (
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	)
}
