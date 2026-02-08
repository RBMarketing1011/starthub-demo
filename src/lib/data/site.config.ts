/**
 * Shared organization/publisher data for JSON-LD schemas
 * This data is reused across multiple schema types
 */

export const SITE_CONFIG = {
	name: 'StartHub Academy',
	url: 'https://starthub.academy',
	logo: 'https://starthub.academy/logo.png',
	description:
		'Learn modern web development with expert-crafted courses on Next.js, React, TypeScript, and more.',
	sameAs: [
		'https://twitter.com/starthubacademy',
		'https://linkedin.com/company/starthub-academy',
		'https://github.com/starthub-academy',
		'https://youtube.com/@starthubacademy',
	],
}

/**
 * Publisher schema object for JSON-LD
 * Used in Course, Article, and other content schemas
 */
export const PUBLISHER_JSONLD = {
	'@type': 'Organization',
	'@id': `${SITE_CONFIG.url}/#organization`,
	name: SITE_CONFIG.name,
	url: SITE_CONFIG.url,
	logo: {
		'@type': 'ImageObject',
		url: SITE_CONFIG.logo,
	},
	sameAs: SITE_CONFIG.sameAs,
}

/**
 * Website schema for the root layout
 */
export const WEBSITE_JSONLD = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	'@id': `${SITE_CONFIG.url}/#website`,
	name: SITE_CONFIG.name,
	url: SITE_CONFIG.url,
	publisher: {
		'@id': `${SITE_CONFIG.url}/#organization`,
	},
}

/**
 * Full Organization schema (for about page, footer, etc.)
 */
export const ORGANIZATION_JSONLD = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	'@id': `${SITE_CONFIG.url}/#organization`,
	name: SITE_CONFIG.name,
	url: SITE_CONFIG.url,
	logo: {
		'@type': 'ImageObject',
		url: SITE_CONFIG.logo,
	},
	description: SITE_CONFIG.description,
	sameAs: SITE_CONFIG.sameAs,
}
