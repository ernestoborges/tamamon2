'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import { createClient } from 'utils/supabase/client'

export default function SignInForm() {
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
    <div className='flex max-w-[30rem] flex-col gap-8 rounded-lg border border-token-border-medium p-8'>
      <div>
        <h2>Bem vindo ao Tamamon</h2>
        <p className='text-gray-500'>
          Selecione uma das opções abaixo para entrar
        </p>
      </div>
      <div className='flex items-center justify-center'>
        <button
          type='button'
          onClick={signInWithGoogle}
          disabled={isGoogleLoading}
          className='flex items-center gap-4 rounded-lg border border-token-border-xheavy p-4 hover:bg-token-main-surface-secondary'
        >
          <div className='px-4'>
            {isGoogleLoading ? 'loading' : <FcGoogle />}
          </div>
          <span className='px-4'>Sign in with Google</span>
        </button>
      </div>
    </div>
  )
}
