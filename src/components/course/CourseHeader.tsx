import type { Course } from '@/lib/types/course'
import { Badge } from '@/components/ui/badge'
import { Star, Clock, Users, Globe } from 'lucide-react'
import Image from 'next/image'

interface CourseHeaderProps {
	course: Course
}

export function CourseHeader({ course }: CourseHeaderProps) {
	return (
		<header className='relative w-full overflow-hidden'>
			{/* Hero Background Image - Discoverable for LCP */}
			{course.heroImage && (
				<Image
					src={course.heroImage}
					alt=''
					fill
					priority
					fetchPriority='high'
					className='object-cover'
					sizes='(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1280px'
					quality={75}
				/>
			)}

			{/* Dark overlay for text readability */}
			<div className='absolute inset-0 bg-black/70' />

			{/* Content */}
			<div className='relative container mx-auto px-4 py-12 md:py-16 max-w-6xl'>
				<div className='space-y-4 text-white'>
					{/* Breadcrumb for SEO */}
					<nav aria-label='Breadcrumb' className='text-sm text-white/70'>
						<ol className='flex items-center gap-2'>
							<li>
								<a href='/' className='hover:text-white transition-colors'>
									Home
								</a>
							</li>
							<li aria-hidden='true'>/</li>
							<li>
								<a
									href='/courses'
									className='hover:text-white transition-colors'>
									Courses
								</a>
							</li>
							<li aria-hidden='true'>/</li>
							<li
								aria-current='page'
								className='text-white font-medium truncate max-w-50'>
								{course.title}
							</li>
						</ol>
					</nav>

					{/* Level Badge */}
					<div className='flex items-center gap-2'>
						<Badge
							variant={getLevelVariant(course.level)}
							className='bg-white/20 text-white border-white/30 hover:bg-white/30'>
							{course.level}
						</Badge>
						<Badge
							variant='outline'
							className='bg-white/20 text-white border-white/30 hover:bg-white/30'>
							{course.language}
						</Badge>
					</div>

					{/* Title - H1 for SEO */}
					<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight'>
						{course.title}
					</h1>

					{/* Short Description */}
					<p className='text-lg text-white/80 max-w-3xl'>
						{course.shortDescription}
					</p>

					{/* Meta Info Row */}
					<div className='flex flex-wrap items-center gap-4 text-sm'>
						{/* Rating */}
						<div className='flex items-center gap-1'>
							<Star
								className='h-4 w-4 fill-yellow-400 text-yellow-400'
								aria-hidden='true'
							/>
							<span className='font-medium'>{course.rating}</span>
							<span className='text-white/70'>
								({course.reviewCount.toLocaleString()} reviews)
							</span>
						</div>

						{/* Duration */}
						<div className='flex items-center gap-1 text-white/70'>
							<Clock className='h-4 w-4' aria-hidden='true' />
							<span>{course.duration}</span>
						</div>

						{/* Enrollments */}
						<div className='flex items-center gap-1 text-white/70'>
							<Users className='h-4 w-4' aria-hidden='true' />
							<span>{course.enrollmentCount.toLocaleString()} enrolled</span>
						</div>

						{/* Language */}
						<div className='flex items-center gap-1 text-white/70'>
							<Globe className='h-4 w-4' aria-hidden='true' />
							<span>{course.language}</span>
						</div>
					</div>

					{/* Instructor */}
					<div className='flex items-center gap-3 pt-2'>
						<div className='h-10 w-10 rounded-full bg-white/20 flex items-center justify-center'>
							<span className='text-sm font-medium text-white'>
								{course.instructor.name
									.split(' ')
									.map((n) => n[0])
									.join('')}
							</span>
						</div>
						<div>
							<p className='font-medium'>{course.instructor.name}</p>
							<p className='text-sm text-white/70'>{course.instructor.title}</p>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

function getLevelVariant(level: Course['level']) {
	switch (level) {
		case 'Beginner':
			return 'default' as const
		case 'Intermediate':
			return 'secondary' as const
		case 'Advanced':
			return 'destructive' as const
		default:
			return 'default' as const
	}
}
