import React from 'react'
import { useUser } from 'hooks/use-user'

export function UserAccountNavigation() {
  const { loading, error, user, role } = useUser()

  return (
    <div className='w-max space-x-2'>
      <div className='flex items-center justify-start gap-2 p-2'>
        <div className='flex flex-col space-y-1 leading-none'>
          {user && user.email && (
            <p className='text-muted-foreground w-[200px] truncate text-sm'>
              {user.email}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
