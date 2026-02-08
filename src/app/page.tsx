import Link from 'next/link'
import { HomeJsonLd } from '@/components/seo'
import { SeedButton } from '@/components/SeedButton'

export default function Home() {
	return (
		<>
			<HomeJsonLd />
			<main className='container mx-auto px-4 py-16 max-w-4xl'>
				<header className='text-center mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold tracking-tight mb-4'>
						StartHub Academy
					</h1>
					<p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
						Learn modern web development with our expert-crafted courses on
						Next.js, React, TypeScript, and more.
					</p>
				</header>

				<section className='text-center'>
					<Link
						href='/courses'
						className='inline-flex items-center justify-center bg-primary text-primary-foreground font-medium py-3 px-8 rounded-md hover:bg-primary/90 transition-colors text-lg'>
						Browse All Courses
					</Link>
				</section>

				<section className='mt-16 grid gap-8 md:grid-cols-3 text-center'>
					<div>
						<div className='text-4xl font-bold text-primary mb-2'>4+</div>
						<p className='text-muted-foreground'>Expert Courses</p>
					</div>
					<div>
						<div className='text-4xl font-bold text-primary mb-2'>54k+</div>
						<p className='text-muted-foreground'>Students Enrolled</p>
					</div>
					<div>
						<div className='text-4xl font-bold text-primary mb-2'>4.8</div>
						<p className='text-muted-foreground'>Average Rating</p>
					</div>
				</section>

				<section className='mt-16 border-t pt-8 text-center'>
					<p className='text-sm text-muted-foreground mb-4'>
						First time? Seed the database with sample courses:
					</p>
					<SeedButton />
				</section>
			</main>
		</>
	)
}
