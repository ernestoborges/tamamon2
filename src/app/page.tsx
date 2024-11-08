import { redirect } from 'next/navigation'
import SignInForm from 'components/molecule/sign-in-form'
import { createClient } from 'utils/supabase/server'

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (user) {
    return redirect('/game')
  }

  return (
    <main className='flex h-screen w-screen items-center justify-center'>
      <SignInForm />
    </main>
  )
}
