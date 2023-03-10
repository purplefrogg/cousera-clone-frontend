// app/sessions.js
import { createCookieSessionStorage } from '@remix-run/node' // or cloudflare/deno

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: '__session',
    },
  })

export { getSession, commitSession, destroySession }
