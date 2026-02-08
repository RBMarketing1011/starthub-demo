import type { Course } from '@/lib/types/course'

const API_BASE = '/api'

/**
 * Fetch a course by slug from the API
 * Use this for client-side data fetching
 * @param slug - The course slug
 * @returns The course or null if not found
 * @throws Error if the fetch fails
 */
