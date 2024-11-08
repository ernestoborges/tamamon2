'use client'

import { useState } from 'react'

import { NavigationItem } from '../atom/navigation-item'
import { SignOutButton } from '../atom/sign-out-button'
import { UserAccountNavigation } from '../molecule/user-account-navigation'

export function SideBar() {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      <button
        className='fixed left-0 top-0 z-40 p-4 text-gray-500 md:hidden'
        onClick={toggleSidebar}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='h-6 w-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 5.25h16.5m-16.5 7.5h16.5m-16.5 7.5h16.5'
          />
        </svg>
      </button>
      {isOpen && (
        <div
          className='fixed inset-0 z-40 bg-black bg-opacity-25'
          onClick={toggleSidebar}
        />
      )}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-[260px] transform flex-col bg-token-sidebar-surface-primary text-white ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:relative md:z-auto md:translate-x-0`}
      >
        <div className='p-4'>
          <h2 className='text-xl font-bold'>Menu</h2>
        </div>
        <nav className='flex grow flex-col space-y-2 px-4'>
          <NavigationItem href='/game/my-tamamon'>Meu tamamon</NavigationItem>
          {/* <NavigationItem href='/game/client'>Client</NavigationItem>
          <NavigationItem href='/game/server'>Server</NavigationItem>
          <NavigationItem href='/game/protected'>Protected</NavigationItem> */}
        </nav>
        <UserAccountNavigation />
        <SignOutButton />
      </aside>
    </>
  )
}
