import type { LoaderArgs } from '@remix-run/node'
import { Link, Outlet, useCatch, useLoaderData } from '@remix-run/react'
import { getCategories } from '~/api/api'

export const loader = async ({ params }: LoaderArgs) => {
  console.log('param12s', params)

  const categories = await getCategories()
  const activeCategory = categories.find(
    category => category.slug === params.slug
  )

  return {
    activeCategory,
  }
}

export default function Courses() {
  const { activeCategory } = useLoaderData<typeof loader>()

  return (
    <div className='flex'>
      <div>
        {activeCategory && (
          <Link to={'/courses/' + activeCategory?.slug}>
            {activeCategory?.title}
          </Link>
        )}
        {activeCategory?.childCategories.map(category => (
          <div key={category._id}>
            <Link to={`/courses/${activeCategory?.slug}/${category.slug}`}>
              {category.title}
            </Link>
          </div>
        ))}
      </div>
      <div className='flex flex-wrap gap-4'>
        <Outlet />
      </div>
    </div>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  if (caught.status === 404) {
    return <div>Note21 not found</div>
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}
