import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllCourses } from '@/lib/db/server/courses.db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Clock } from 'lucide-react'
import { CourseListJsonLd } from '@/components/seo'

export const metadata: Metadata = {
	title: 'All Courses',
	description:
		'Browse our collection of high-quality courses on web development, React, Next.js, TypeScript, and more.',
	openGraph: {
		title: 'All Courses | StartHub Academy',
		description:
			'Browse our collection of high-quality courses on web development, React, Next.js, TypeScript, and more.',
		type: 'website',
	},
}

export default async function CoursesPage() {
	const courses = await getAllCourses()

	return (
		<>
			<CourseListJsonLd courses={courses} />
			<main className='container mx-auto px-4 py-8 max-w-6xl'>
				<header className='mb-8'>
					<h1 className='text-3xl md:text-4xl font-bold tracking-tight mb-2'>
						All Courses
					</h1>
					<p className='text-lg text-muted-foreground'>
						Explore our collection of {courses.length} professional courses
					</p>
				</header>

				<section aria-label='Course listing'>
					<ul className='grid gap-6 md:grid-cols-2'>
						{courses.map((course) => (
							<li key={course.id}>
								<Link href={`/courses/${course.slug}`} className='block h-full'>
									<Card className='h-full hover:shadow-lg transition-shadow'>
										<CardHeader>
											<div className='flex items-center gap-2 mb-2'>
												<Badge variant='secondary'>{course.level}</Badge>
												<Badge variant='outline'>{course.duration}</Badge>
											</div>
											<CardTitle className='line-clamp-2'>
												{course.title}
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p className='text-muted-foreground line-clamp-2 mb-4'>
												{course.shortDescription}
											</p>
											<div className='flex items-center justify-between'>
												<div className='flex items-center gap-1'>
													<Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
													<span className='font-medium'>{course.rating}</span>
													<span className='text-sm text-muted-foreground'>
														({course.reviewCount.toLocaleString()})
													</span>
												</div>
												<div className='flex items-center gap-1 text-muted-foreground'>
													<Clock className='h-4 w-4' />
													<span className='text-sm'>{course.duration}</span>
												</div>
											</div>
											<div className='mt-4 flex items-baseline gap-1'>
												<span className='text-2xl font-bold'>
													${course.price.toFixed(2)}
												</span>
												<span className='text-sm text-muted-foreground'>
													{course.currency}
												</span>
											</div>
										</CardContent>
									</Card>
								</Link>
							</li>
						))}
					</ul>
				</section>
			</main>
		</>
	)
}
