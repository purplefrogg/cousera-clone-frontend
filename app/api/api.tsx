import { json, redirect } from '@remix-run/node'
import { commitSession, destroySession, getSession } from '~/sessions'

const baseUrl = 'http://localhost:3333'
export interface Course {
  _id: string
  name: string
  description: string
  imageUrl: string
}

export interface Category {
  _id: string
  title: string
  slug: string
  childCategories: Category[]
  parentCategory?: Category
}
export const getCourses = async (slug?: string): Promise<Course[]> => {
  console.log('getCourses', slug)

  const res = await fetch(`${baseUrl}/course/${slug || ''}`)
  if (res.status === 400) {
    throw new Response('Bad Request', { status: 404 })
  }
  const data = await res.json()
  return data
}
export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${baseUrl}/category`)
  return await res.json()
}

export const login = async (email: string, password: string): Promise<any> => {
  const res = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mail: email, password }),
  })
  if (res.status === 400) {
    return false
  }
  const data = await res.json()
  return data
}

const secureApi = async (
  request: Request,
  redirectTo: string,
  api: (token?: string) => Promise<any>
) => {
  const res = await api()
  console.log('secureApi', res.status)
  const session = await getSession(request.headers.get('Cookie'))

  if (res.status !== 401) {
    console.log('not 401')

    return res
  }

  const refresh = await fetch(`${baseUrl}/auth/refresh`, {
    headers: { Cookie: `refresh=${session.get('refresh')}` },
  })

  if (refresh.status === 401) {
    console.log('refresh', refresh.status)

    return redirect('/login', {
      headers: {
        'Set-Cookie': await destroySession(session),
      },
    })
  }
  const data = await refresh.json()

  session.set('token', data.accessToken)
  console.log('refresh12', refresh.status, data)

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}

export const getProfile = async (request: Request): Promise<any> =>
  await secureApi(request, '/profile', async token => {
    const session = await getSession(request.headers.get('Cookie'))
    const localToken = token || session.get('token')

    const res = await fetch(`${baseUrl}/user/profile`, {
      headers: {
        Authorization: `Bearer ${localToken}`,
        'Set-Cookie': await commitSession(session),
      },
    })

    return await res.json()
  })

export const logout = async (request: Request): Promise<any> =>
  await secureApi(request, '/logout', async token => {
    const session = await getSession(request.headers.get('Cookie'))
    console.log(token || session.get('token'))

    const res = await fetch(`${baseUrl}/auth/logout`, {
      headers: {
        Authorization: `Bearer ${token || session.get('token')}`,
        'Set-Cookie': await destroySession(session),
      },
    })

    return res
  })
