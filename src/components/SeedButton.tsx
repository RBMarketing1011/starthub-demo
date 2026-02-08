'use client'

import { useState } from 'react'

export function SeedButton() {
	const [status, setStatus] = useState<
		'idle' | 'loading' | 'success' | 'error'
	>('idle')
	const [message, setMessage] = useState('')

	async function handleSeed() {
		setStatus('loading')
		setMessage('')

		try {
			const response = await fetch('/api/seed', { method: 'POST' })
			const data = await response.json()

			if (response.ok) {
				setStatus('success')
				setMessage(data.message || 'Database seeded successfully!')
			} else {
				setStatus('error')
				setMessage(data.error || 'Failed to seed database')
			}
		} catch {
			setStatus('error')
			setMessage('Failed to connect to seed API')
		}
	}

	const buttonClasses =
		status === 'success'
			? 'bg-green-600 text-white hover:bg-green-700'
			: 'bg-secondary text-secondary-foreground hover:bg-secondary/80'

	return (
		<div className='flex flex-col items-center gap-2'>
			<button
				onClick={handleSeed}
				disabled={status === 'loading'}
				className={`inline-flex items-center justify-center font-medium py-2 px-6 rounded-md transition-colors disabled:opacity-50 ${buttonClasses}`}>
				{status === 'loading'
					? 'Seeding...'
					: status === 'success'
						? '✓ Seeded!'
						: 'Seed Database'}
			</button>
			{message && (
				<p
					className={`text-sm ${status === 'error' ? 'text-destructive' : 'text-muted-foreground'}`}>
					{message}
				</p>
			)}
		</div>
	)
}
