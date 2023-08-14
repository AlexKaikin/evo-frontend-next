import { navigationService, postService } from '@/services'
import { IUrlParams } from '@/utils/url'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { Pagination } from '../(components)'
import { PostItems, PostsSkeleton, Selection } from './(components)'
import './styles.scss'

interface IProps {
  searchParams: IUrlParams
}

export const metadata: Metadata = {
  title: 'Блог |  EVO PLACE',
  description: 'Блог...',
}

async function getNavigation() {
  const res = await navigationService.getAll()
  const navigation = res.data
  return navigation
}

async function getPosts(searchParams: IUrlParams) {
  const res = await postService.getAll(searchParams)
  const posts = res.data
  const totalCount = res.headers['x-total-count']
  return { posts, totalCount }
}

export default async function Products({ searchParams }: IProps) {
  const postsData = await getPosts(searchParams)
  const navigationData = await getNavigation()
  const [{ posts, totalCount }, navigation] = await Promise.all([
    postsData,
    navigationData,
  ])
  return (
    <Suspense fallback={<PostsSkeleton />}>
      <Selection navigation={navigation} />
      <PostItems posts={posts} />
      <Pagination totalCount={totalCount} />
    </Suspense>
  )
}
