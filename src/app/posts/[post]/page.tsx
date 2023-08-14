import { postService } from '@/services/blog/posts'
import { IPost } from '@/types/blog/posts'
import { notFound } from 'next/navigation'
import PostItem from './(components)/PostItem/PostItem'
import './style.scss'

interface IProps {
  params: { post: string }
}

async function getPost(postId: string) {
  const res = await postService.getOne(+postId)
  const post = res.data
  if (res.status !== 200) return notFound()
  return post
}

export async function generateMetadata({ params }: IProps) {
  const post: IPost = await getPost(params.post)
  return {
    title: post.title + ` |  EVO PLACE`,
    description: post.text.slice(0, 180).concat('...'),
  }
}

export default async function Post({ params }: IProps) {
  const post: IPost = await getPost(params.post)
  return <PostItem post={post} />
}
