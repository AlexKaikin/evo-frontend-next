'use client'

import { usePathname } from 'next/navigation'
import BlogCloud from './BlogCloud/BlogCloud'
import './Cloud.scss'
import ShopCloud from './ShopCloud/ShopCloud'

export default function Cloud() {
  const pathname = usePathname()
  const path = pathname.split('/')

  if (path[1] === 'products' || path[1] === 'home') return <ShopCloud />
  if (path[1] === 'posts') return <BlogCloud />

  return <div className="cloud"></div>
}
