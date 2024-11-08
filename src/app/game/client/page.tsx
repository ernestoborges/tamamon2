'use client'

import { useUser } from 'hooks/use-user'

export default function ClientPage() {
  const { loading, error, user, role } = useUser()

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div className='space-y-4'>
      <h1 className='text-lg font-medium'>User: {user?.email || 'N/A'}</h1>
      <h2 className='text-lg font-medium'> Role: {role || 'N/A'}</h2>
      <p className='text-muted-foreground'>(I am a client component.)</p>
    </div>
  )
}
