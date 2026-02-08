import type { Course } from '@/lib/types/course'
import { generateCourseJsonLd } from '@/lib/utils/jsonld'

interface CourseJsonLdProps {
	course: Course
}

/**
 * Renders JSON-LD structured data for SEO
 * This component outputs a script tag with the Course schema
 */
export function CourseJsonLd({ course }: CourseJsonLdProps) {
	const jsonLd = generateCourseJsonLd(course)

	return (
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	)
}
