//import { useLocation } from 'react-router-dom'
import './Cloud.scss'
import ShopCloud from './ShopCloud/ShopCloud'
//import BlogCloud from './BlogCloud/BlogCloud'
import { usePathname } from 'next/navigation'

export default function Cloud() {
  const pathname = usePathname()
  const path = pathname.split('/')

  if (path[1] === 'products' || path[1] === 'home') return <ShopCloud />
  //if (path[1] === 'posts') return <BlogCloud />

  return <div className="cloud"></div>
}
