import { generateHomeJsonLd } from '@/lib/utils/jsonld'

/**
 * Renders JSON-LD structured data for the home page
 * Includes WebSite and Organization schemas
 */
export function HomeJsonLd() {
	const schemas = generateHomeJsonLd()

	return (
		<>
			{schemas.map((schema, index) => (
				<script
					key={index}
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
				/>
			))}
		</>
	)
}
