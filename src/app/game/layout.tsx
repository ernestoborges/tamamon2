import { SideBar } from 'components/organism/side-navigation-bar'
import { AuthProvider } from 'context/auth-context'
import { SocketProvider } from 'context/socket'

type LayoutProps = {
  children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <AuthProvider>
      <SocketProvider>
        <div className='flex h-full w-full'>
          <SideBar />
          <main className='ml-0 flex-1 p-4'>{children}</main>
        </div>
      </SocketProvider>
    </AuthProvider>
  )
}