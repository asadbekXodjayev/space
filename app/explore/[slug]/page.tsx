import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { OBJECT_SLUGS, getObject, getParent, getChildren, toSummary } from '@/data/catalog'
import { ObjectDetailClient } from './client'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return OBJECT_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const object = getObject(slug)
  if (!object) return { title: 'Not Found' }
  return {
    title: object.name,
    description: object.tagline,
  }
}

export default async function ExplorePage({ params }: PageProps) {
  const { slug } = await params
  const object = getObject(slug)
  if (!object) notFound()

  const parentObj = getParent(object)
  const related = getChildren(object.slug)

  return (
    <ObjectDetailClient
      object={object}
      parent={parentObj ? toSummary(parentObj) : undefined}
      related={related.map(toSummary)}
    />
  )
}
