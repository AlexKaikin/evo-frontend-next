import { IParams } from '@/utils/url'
import { Metadata } from 'next'
import { Pagination, PostItems, Selection } from './(components)/'
import './styles.scss'
import { IPost } from '@/types/blog/posts'
import { postService } from '@/services/blog/posts'

interface IProps {
  searchParams: IParams
}

interface IPostsResponse {
  posts: IPost[]
  totalCount: string
}

export const metadata: Metadata = {
  title: 'Блог |  EVO PLACE',
  description: 'Блог...',
}

async function getPosts(searchParams: IParams) {
  const res = await postService.getAll(searchParams)
  const posts = res.data
  const totalCount = res.headers['x-total-count']
  return { posts, totalCount }
}

export default async function Products({ searchParams }: IProps) {
  const { posts, totalCount }: IPostsResponse = await getPosts(searchParams)
  return (
    <>
      <Selection />
      <PostItems posts={posts} />
      <Pagination totalCount={totalCount} />
    </>
  )
}
