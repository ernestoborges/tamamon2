'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from 'utils/supabase/client'

export default function SignInPage() {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
  const supabase = createClient()

  const searchParams = useSearchParams()

  const next = searchParams!.get('next')

  async function signInWithGoogle() {
    setIsGoogleLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback${
            next ? `?next=${encodeURIComponent(next)}` : ''
          }`
        }
      })

      if (error) {
        throw error
      }
    } catch {
      setIsGoogleLoading(false)
    }
  }

  return (
    <button type='button' onClick={signInWithGoogle} disabled={isGoogleLoading}>
      {isGoogleLoading && <div>Loading...</div>} Sign in with Google
    </button>
  )
}
