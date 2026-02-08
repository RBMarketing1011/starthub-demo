import type { Course } from '@/lib/types/course'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle } from 'lucide-react'

interface CourseContentProps {
	course: Course
}

export function CourseContent({ course }: CourseContentProps) {
	return (
		<div className='grid gap-8 lg:grid-cols-3'>
			{/* Main Content */}
			<article className='lg:col-span-2 space-y-8'>
				{/* Description Section */}
				<section aria-labelledby='description-heading'>
					<h2 id='description-heading' className='text-2xl font-semibold mb-4'>
						About This Course
					</h2>
					<p className='text-muted-foreground leading-relaxed'>
						{course.description}
					</p>
				</section>

				<Separator />

				{/* What You'll Learn */}
				<section aria-labelledby='topics-heading'>
					<h2 id='topics-heading' className='text-2xl font-semibold mb-4'>
						What You&apos;ll Learn
					</h2>
					<ul className='grid gap-3 sm:grid-cols-2'>
						{course.topics.map((topic) => (
							<li key={topic} className='flex items-start gap-2'>
								<CheckCircle
									className='h-5 w-5 text-green-500 mt-0.5 shrink-0'
									aria-hidden='true'
								/>
								<span>{topic}</span>
							</li>
						))}
					</ul>
				</section>

				<Separator />

				{/* Course Details */}
				<section aria-labelledby='details-heading'>
					<h2 id='details-heading' className='text-2xl font-semibold mb-4'>
						Course Details
					</h2>
					<dl className='grid gap-4 sm:grid-cols-2'>
						<div>
							<dt className='text-sm text-muted-foreground'>Duration</dt>
							<dd className='font-medium'>{course.duration}</dd>
						</div>
						<div>
							<dt className='text-sm text-muted-foreground'>Level</dt>
							<dd className='font-medium'>{course.level}</dd>
						</div>
						<div>
							<dt className='text-sm text-muted-foreground'>Language</dt>
							<dd className='font-medium'>{course.language}</dd>
						</div>
						<div>
							<dt className='text-sm text-muted-foreground'>Last Updated</dt>
							<dd className='font-medium'>
								{new Date(course.lastUpdated).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</dd>
						</div>
					</dl>
				</section>
			</article>

			{/* Sidebar */}
			<aside className='lg:col-span-1 space-y-6'>
				{/* Course Introduction Video */}
				{course.videoUrl && (
					<div className='overflow-hidden rounded-xl bg-muted'>
						<div className='relative aspect-video'>
							<video
								src={course.videoUrl}
								controls
								className='absolute inset-0 w-full h-full object-cover'
								preload='metadata'>
								<track kind='captions' />
								Your browser does not support the video tag.
							</video>
						</div>
						<div className='p-3 bg-secondary'>
							<p className='text-sm font-medium text-center text-secondary-foreground'>
								Course Introduction
							</p>
						</div>
					</div>
				)}

				{/* Price Card */}
				<Card className='sticky top-8'>
					<CardHeader>
						<CardTitle className='flex items-baseline gap-2'>
							<span className='text-3xl font-bold'>
								${course.price.toFixed(2)}
							</span>
							<span className='text-sm text-muted-foreground font-normal'>
								{course.currency}
							</span>
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						{/* CTA Button */}
						<button
							type='button'
							className='w-full bg-primary text-primary-foreground font-medium py-3 px-4 rounded-md hover:bg-primary/90 transition-colors'>
							Enroll Now
						</button>

						{/* Provider Info */}
						<div className='pt-4 border-t'>
							<p className='text-sm text-muted-foreground mb-1'>Provided by</p>
							<a
								href={course.provider.url}
								className='font-medium hover:underline'
								target='_blank'
								rel='noopener noreferrer'>
								{course.provider.name}
							</a>
						</div>

						{/* Topics as tags */}
						<div className='pt-4 border-t'>
							<p className='text-sm text-muted-foreground mb-2'>Topics</p>
							<div className='flex flex-wrap gap-2'>
								{course.topics.slice(0, 4).map((topic) => (
									<Badge key={topic} variant='outline' className='text-xs'>
										{topic}
									</Badge>
								))}
								{course.topics.length > 4 && (
									<Badge variant='outline' className='text-xs'>
										+{course.topics.length - 4} more
									</Badge>
								)}
							</div>
						</div>
					</CardContent>
				</Card>
			</aside>
		</div>
	)
}
