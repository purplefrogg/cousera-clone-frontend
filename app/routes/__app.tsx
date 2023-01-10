import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useCatch, useLoaderData, useMatches } from '@remix-run/react'
import { getCategories } from '~/api/api'
import { Header } from '~/components/header'
import { getSession } from '~/sessions'

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  const categories = await getCategories()

  return json({
    categories,
    isAuth: !!session.get('token'),
  })
}

export default function App() {
  const data = useLoaderData<typeof loader>()
  const matches = useMatches()
  const activeCategory = matches.find(
    match => match.id === 'routes/__app/courses/$slug'
  )
  return (
    <>
      <Header
        activeCategory={activeCategory?.params.slug}
        categories={data.categories.filter(
          category => !category.parentCategory
        )}
        isAuth={data.isAuth}
      />
      <Outlet />
    </>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
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
