import { createClient } from 'utils/supabase/server'

export default async function ServerPage() {
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  return (
    <div className='space-y-4'>
      <h1 className='text-lg font-medium'>User: {user?.email || 'N/A'}</h1>
      <p className='text-muted-foreground'>(I am a server component.)</p>
    </div>
  )
}
