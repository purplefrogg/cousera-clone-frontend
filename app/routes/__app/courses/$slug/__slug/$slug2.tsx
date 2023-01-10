import type { LoaderArgs } from '@remix-run/node'
import { Link, useCatch, useLoaderData } from '@remix-run/react'
import { getCourses } from '~/api/api'

export const loader = async ({ params }: LoaderArgs) => {
  console.log('params', params)

  const courses = await getCourses(params.slug2)

  return {
    courses,
  }
}

export default function Courses() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className='flex'>
      <div className='flex flex-wrap gap-4'>
        {data.courses.map(course => (
          <div key={course._id} className='flex flex-col rounded bg-primary-50'>
            <h2 className='text-xl'>{course.name}</h2>
            <p>{course.description}</p>
            <Link to={course._id}>course</Link>
          </div>
        ))}
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
    return <div>Note44 not found</div>
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}
