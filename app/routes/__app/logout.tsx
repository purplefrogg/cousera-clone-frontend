import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { logout } from '~/api/api'
import { destroySession, getSession } from '~/sessions'

export async function action({ request }: ActionArgs) {
  const res = await logout(request)
  return res
}

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'))

  const res = await logout(request)
  console.log('logout', res.status)

  if (res.status === 200)
    return redirect('/', {
      headers: {
        'Set-Cookie': await destroySession(session),
      },
    })
  return redirect('/login')
}
