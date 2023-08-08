import { postService } from '@/services/blog/posts'
import { productService } from '@/services/shop/products'
import { IPost } from '@/types/blog/posts'
import { IProduct } from '@/types/shop/products'
import { IParams } from '@/utils/url'
import { Posts, Products, Slider } from './(components)'
import './styles.scss'

interface IProps {
  searchParams: IParams
}

async function getProducts(searchParams: IParams) {
  const res = await productService.getAll(searchParams)
  let products = res.data
  products = products.slice(0, 4)
  return products
}

async function getPosts(searchParams: IParams) {
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
