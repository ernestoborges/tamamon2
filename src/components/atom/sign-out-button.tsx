'use client'

import { useRouter } from 'next/navigation'
import { createClient } from 'utils/supabase/client'

export function SignOutButton() {
  const supabase = createClient()
  const router = useRouter()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/signin')
    router.refresh()
  }

  return (
    <button className='w-full' onClick={handleLogout}>
      Sign out
    </button>
  )
}
