'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    if (error?.message === 'Request failed with status code 401')
      router.push('/login')
  }, [error, router])

  return <></>
}
