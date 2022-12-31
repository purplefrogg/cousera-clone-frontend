import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { login } from '~/api/api'
import { Button } from '~/components/ui/button'
import { commitSession, getSession } from '~/sessions'
export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'))

  console.log('already logged in', session.has('token'))
  if (session.has('token')) {
    // Redirect to the home page if they are already signed in.
    return redirect('/')
  }

  const data = { error: session.get('error') }

  return json(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}
export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  let data = await request.formData()
  let email = data.get('email') as string
  let password = data.get('password') as string
  if (email && password) {
    const res = await login(email, password)
    if (!res) {
      return json({ error: 'Invalid email or password' })
    }
    session.set('token', res.accessToken)
    session.set('refresh', res.refreshToken)

    // Login succeeded, send them to the home page.
    return redirect('/', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    })
  }
  return json({ error: 'Invalid email or password' })
}

export default function Login() {
  const { currentUser, error } = useLoaderData()
  const actionData = useActionData<typeof action>()

  console.log(currentUser, error)

  return (
    <div className='p-4'>
      <h1 className=' text-center font-medium text-[26px]  pb-16'>
        Welcome back!
        <br /> Sign in to continue!
      </h1>
      <div className='flex flex-col gap-5'>
        <Button theme='secondary'>Log in with Google</Button>
        <Button theme='secondary'>Log in with Facebook</Button>
      </div>
      <div className='text-center py-5 text-grey-600'>or</div>
      <Form method='post' className='flex flex-col gap-6'>
        <input
          name='email'
          type='email'
          placeholder='email'
          className='bg-gray-50 rounded p-1'
        />
        <input
          name='password'
          type='password'
          placeholder='password'
          className='bg-gray-50 rounded p-1'
        />
        {actionData && (
          <div className='text-center text-red-500'>{actionData?.error}</div>
        )}
        <Button type='submit'>Login</Button>
      </Form>
    </div>
  )
}
