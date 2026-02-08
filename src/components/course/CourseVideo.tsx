import type { Course } from '@/lib/types/course'

interface CourseVideoProps {
	course: Course
}

export function CourseVideo({ course }: CourseVideoProps) {
	if (!course.videoUrl) return null

	return (
		<section className='space-y-4'>
			<h2 className='text-2xl font-bold'>Course Preview</h2>
			<div className='relative aspect-video w-full overflow-hidden rounded-xl bg-muted'>
				<video
					src={course.videoUrl}
					controls
					className='h-full w-full object-cover'
					poster={course.heroImage}
					preload='metadata'>
					<track kind='captions' />
					Your browser does not support the video tag.
				</video>
			</div>
		</section>
	)
}
