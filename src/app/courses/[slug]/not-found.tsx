import Link from 'next/link'

export default function CourseNotFound() {
	return (
		<main className='container mx-auto px-4 py-16 max-w-2xl text-center'>
			<h1 className='text-4xl font-bold mb-4'>Course Not Found</h1>
			<p className='text-muted-foreground mb-8'>
				Sorry, we couldn&apos;t find the course you&apos;re looking for. It may
				have been removed or the URL might be incorrect.
			</p>
			<Link
				href='/courses'
				className='inline-flex items-center justify-center bg-primary text-primary-foreground font-medium py-2 px-4 rounded-md hover:bg-primary/90 transition-colors'>
				Browse All Courses
			</Link>
		</main>
	)
}
