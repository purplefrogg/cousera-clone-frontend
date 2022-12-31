import { Link, useLoaderData } from '@remix-run/react'
import { getCourses } from '~/api/api'

export const loader = async () => {
  const data = await getCourses()
  return {
    courses: data,
  }
}

export default function Courses() {
  const data = useLoaderData<typeof loader>()
  console.log(data)

  return (
    <div>
      <h1>Courses</h1>
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
