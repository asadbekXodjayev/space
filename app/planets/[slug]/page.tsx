import { notFound } from 'next/navigation'
import { PLANET_SLUGS, getPlanet } from '@/data/planets'
import { PlanetDetailClient } from './client'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return PLANET_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const planet = getPlanet(slug)
  
  if (!planet) {
    return { title: 'Planet Not Found' }
  }

  return {
    title: `${planet.name} | COSMOS`,
    description: planet.tagline,
  }
}

export default async function PlanetPage({ params }: PageProps) {
  const { slug } = await params
  const planet = getPlanet(slug)

  if (!planet) {
    notFound()
  }

  return <PlanetDetailClient planet={planet} />
}
