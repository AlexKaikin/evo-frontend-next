import { Pagination } from '@/app/(components)'
import { navigationService, postService } from '@/services'
import { IUrlParams } from '@/utils/url'
import { Metadata } from 'next'
import { AddPostButton, PostItems, Selection } from './(components)'
import './styles.scss'

interface IProps {
  searchParams: IUrlParams
}

export const metadata: Metadata = {
  title: 'Статьи | EVO PLACE',
  description: 'Статьи...',
}

async function getNavigation() {
  const res = await navigationService.getAll()
  const navigation = res.data
  return navigation
}

async function getPosts(searchParams: IUrlParams) {
  const res = await postService.getAllForAdmin(searchParams)
  const posts = res.data
  const totalCount = res.headers['x-total-count']
  return { posts, totalCount }
}

export default async function Posts({ searchParams }: IProps) {
  const postsData = await getPosts(searchParams)
  const navigationData = await getNavigation()
  const [{ posts, totalCount }, navigation] = await Promise.all([
    postsData,
    navigationData,
  ])
  return (
    <div className="section admin posts">
      <div className="container">
        <AddPostButton navigation={navigation} />
        <Selection navigation={navigation} />
        <PostItems posts={posts} navigation={navigation} />
        <Pagination totalCount={totalCount} />
      </div>
    </div>
  )
}
