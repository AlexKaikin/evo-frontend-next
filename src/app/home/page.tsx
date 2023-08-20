import previewImgUrl from '@/assets/img/meta/preview.jpg'
import { SAIT_URL } from '@/config/url'
import { postService, productService } from '@/services'
import { IPost } from '@/types/blog/posts'
import { IProduct } from '@/types/shop/products'
import { IUrlParams } from '@/utils/url'
import { Metadata } from 'next'
import { Posts, Products, Slider } from './(components)'
import './styles.scss'

interface IProps {
  searchParams: IUrlParams
}

export const metadata: Metadata = {
  title: 'EVO PLACE',
  description: 'Пространство для сообщества EVO',
  metadataBase: new URL(SAIT_URL),
  alternates: { canonical: '/home' },
  openGraph: {
    title: 'EVO PLACE',
    description: 'Пространство для сообщества EVO',
    url: SAIT_URL,
    siteName: 'EVO PLACE',
    images: [
      {
        url: `${previewImgUrl.src}`,
        width: 800,
        height: 600,
      },
    ],
    type: 'website',
  },
}

async function getProducts(searchParams: IUrlParams) {
  const res = await productService.getAll(searchParams)
  let products = res.data
  products = products.slice(0, 4)
  return products
}

async function getPosts(searchParams: IUrlParams) {
  const res = await postService.getAll(searchParams)
  let posts = res.data
  posts = posts.slice(0, 3)
  return posts
}

export default async function Home({ searchParams }: IProps) {
  const productsData: IProduct[] = await getProducts(searchParams)
  const postsData: IPost[] = await getPosts(searchParams)
  const [products, posts] = await Promise.all([productsData, postsData])
  return (
    <section className="home">
      <div className="container">
        <Slider />
        <Products products={products} />
        <Posts posts={posts} />
      </div>
    </section>
  )
}
