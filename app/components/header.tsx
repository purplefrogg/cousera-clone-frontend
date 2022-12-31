import { Form, Link, useMatches } from '@remix-run/react'
import { useEffect, useState } from 'react'
import type { Category } from '~/api/api'

interface HeaderProps {
  isAuth: boolean
  activeCategory?: string
  categories: Category[]
}

export const Header = ({
  isAuth,
  categories,
  activeCategory: activeCategorySlug,
}: HeaderProps) => {
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false)
  useEffect(() => {
    if (showCategoriesMenu) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'unset'
    }
  }, [showCategoriesMenu])

  return (
    <header>
      <menu className='flex gap-4'>
        <Link className='p-2 bg-gray-200 rounded-lg hover:bg-gray-300' to='/'>
          Home
        </Link>
        {isAuth && (
          <Link
            className='p-2 bg-gray-200 rounded-lg hover:bg-gray-300'
            to='/Profile'>
            Profile
          </Link>
        )}
        <Link
          className='p-2 bg-gray-200 rounded-lg hover:bg-gray-300'
          to='/courses'>
          Courses
        </Link>
        {!isAuth && (
          <Link
            className='p-2 bg-gray-200 rounded-lg hover:bg-gray-300'
            to='/Login'>
            Login
          </Link>
        )}
        <button onClick={() => setShowCategoriesMenu(prev => !prev)}>
          categories
        </button>
        {showCategoriesMenu && (
          <div
            onClick={() => setShowCategoriesMenu(false)}
            className='flex flex-col absolute  top-10 min-h-screen w-full'>
            <div
              className='flex flex-wrap gap-2 bg-white'
              onClick={e => e.stopPropagation()}>
              {categories.map(category => (
                <Link
                  className={` bg-primary-200 rounded-lg p-1 hover:bg-primary-30 ${
                    activeCategorySlug === category.slug ? 'bg-primary-900' : ''
                  }`}
                  key={category._id}
                  onClick={() => setShowCategoriesMenu(false)}
                  to={`/courses/${category.slug}`}>
                  {category.slug}
                </Link>
              ))}
            </div>
          </div>
        )}
        {isAuth && (
          <Form action='/logout' method='post'>
            <button
              className='p-2 bg-gray-200 rounded-lg hover:bg-gray-300'
              type='submit'>
              logout
            </button>
          </Form>
        )}
      </menu>
    </header>
  )
}
