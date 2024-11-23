'use client'

import React, { createContext, useContext, useState } from 'react'

type AccountData = {
  isNewAccount: boolean
}

interface IAccountContext {
  accountData: AccountData | null
  updateAccountData: (data: AccountData) => void
}

const AccountContext = createContext<IAccountContext | undefined>(undefined)

export const useAccountContext = () => {
  const context = useContext(AccountContext)
  if (!context) {
    throw new Error('useAccountContext must be used within a AccountContext')
  }
  return context
}

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [accountData, setAccountData] = useState<AccountData | null>(null)

  function updateAccountData(data: AccountData): void {
    setAccountData(data)
  }

  return (
    <AccountContext.Provider value={{ accountData, updateAccountData }}>
      {children}
    </AccountContext.Provider>
  )
}
