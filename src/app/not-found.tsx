import Link from 'next/link'

export default function NotFound() {
	return (
		<main className='container mx-auto px-4 py-16 max-w-4xl text-center'>
			<h1 className='text-6xl font-bold mb-4'>404</h1>
			<h2 className='text-2xl font-semibold mb-4'>Page Not Found</h2>
			<p className='text-muted-foreground mb-8 max-w-md mx-auto'>
				The page you&apos;re looking for doesn&apos;t exist or has been moved.
			</p>

			<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-8'>
				<Link
					href='/'
					className='inline-flex items-center justify-center bg-primary text-primary-foreground font-medium py-2 px-6 rounded-md hover:bg-primary/90 transition-colors'>
					Go Home
				</Link>
				<Link
					href='/courses'
					className='inline-flex items-center justify-center bg-secondary text-secondary-foreground font-medium py-2 px-6 rounded-md hover:bg-secondary/80 transition-colors'>
					Browse Courses
				</Link>
			</div>
		</main>
	)
}
