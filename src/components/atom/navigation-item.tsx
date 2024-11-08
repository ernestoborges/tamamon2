'use client'

import Link from 'next/link'

type NavItemProps = {
  href: string
  children: React.ReactNode
}

export function NavigationItem({ href, children }: NavItemProps) {
  return (
    <Link href={href} className={'text-muted-foreground text-sm'}>
      {children}
    </Link>
  )
}
