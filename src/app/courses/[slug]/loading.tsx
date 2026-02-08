import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * Loading skeleton for the course detail page
 * Shows immediately while SSR data is being fetched
 */
export default function CourseLoading() {
	return (
		<main className='container mx-auto px-4 py-8 max-w-6xl'>
			{/* Breadcrumb skeleton */}
			<div className='flex gap-2 mb-4'>
				<Skeleton className='h-4 w-12' />
				<Skeleton className='h-4 w-4' />
				<Skeleton className='h-4 w-16' />
				<Skeleton className='h-4 w-4' />
				<Skeleton className='h-4 w-32' />
			</div>

			{/* Badges skeleton */}
			<div className='flex gap-2 mb-4'>
				<Skeleton className='h-6 w-24 rounded-full' />
				<Skeleton className='h-6 w-16 rounded-full' />
			</div>

			{/* Title skeleton */}
			<Skeleton className='h-10 w-3/4 mb-4' />

			{/* Short description skeleton */}
			<Skeleton className='h-6 w-2/3 mb-6' />

			{/* Meta info skeleton */}
			<div className='flex gap-4 mb-6'>
				<Skeleton className='h-5 w-24' />
				<Skeleton className='h-5 w-20' />
				<Skeleton className='h-5 w-28' />
			</div>

			{/* Instructor skeleton */}
			<div className='flex items-center gap-3 mb-8'>
				<Skeleton className='h-10 w-10 rounded-full' />
				<div>
					<Skeleton className='h-5 w-32 mb-1' />
					<Skeleton className='h-4 w-40' />
				</div>
			</div>

			{/* Content grid */}
			<div className='grid gap-8 lg:grid-cols-3'>
				{/* Main content */}
				<div className='lg:col-span-2 space-y-8'>
					{/* About section skeleton */}
					<div>
						<Skeleton className='h-7 w-48 mb-4' />
						<div className='space-y-2'>
							<Skeleton className='h-4 w-full' />
							<Skeleton className='h-4 w-full' />
							<Skeleton className='h-4 w-3/4' />
						</div>
					</div>

					<Separator />

					{/* Topics skeleton */}
					<div>
						<Skeleton className='h-7 w-40 mb-4' />
						<div className='grid gap-3 sm:grid-cols-2'>
							{[...Array(6)].map((_, i) => (
								<div key={i} className='flex items-center gap-2'>
									<Skeleton className='h-5 w-5 rounded-full' />
									<Skeleton className='h-4 w-32' />
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Sidebar skeleton */}
				<aside className='lg:col-span-1'>
					<Card>
						<CardHeader>
							<Skeleton className='h-9 w-24' />
						</CardHeader>
						<CardContent className='space-y-4'>
							<Skeleton className='h-12 w-full' />
							<div className='pt-4 border-t'>
								<Skeleton className='h-4 w-20 mb-2' />
								<Skeleton className='h-5 w-32' />
							</div>
							<div className='pt-4 border-t'>
								<Skeleton className='h-4 w-16 mb-2' />
								<div className='flex flex-wrap gap-2'>
									{[...Array(4)].map((_, i) => (
										<Skeleton key={i} className='h-6 w-20 rounded-full' />
									))}
								</div>
							</div>
						</CardContent>
					</Card>
				</aside>
			</div>
		</main>
	)
}
