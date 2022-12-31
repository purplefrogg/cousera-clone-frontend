import { LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getProfile } from '~/api/api'

export async function loader({ request }: LoaderArgs) {
  const profile = await getProfile(request)

  return profile
}

export default function Profile() {
  const profile = useLoaderData()

  return (
    <div>
      <h1>{profile.mail}</h1>
    </div>
  )
}
