'use client'

import { PreLoader, StoreProvider } from '.'

export default function Providers({
  children,
}: {
  children: React.ReactElement
}) {
  return (
    <StoreProvider>
      <PreLoader>{children}</PreLoader>
    </StoreProvider>
  )
}
