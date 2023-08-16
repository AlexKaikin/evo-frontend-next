import { Pagination } from '@/app/(components)'
import { commentService } from '@/services/blog/comments'
import { IUrlParams } from '@/utils/url'
import { Metadata } from 'next'
import CommentItems from './(components)/CommentItems/CommentItems'
import './styles.scss'

interface IProps {
  searchParams: IUrlParams
}

export const metadata: Metadata = {
  title: 'Комментарии |  EVO PLACE',
  description: 'Комментарии...',
}

async function getComments(searchParams: IUrlParams) {
  const res = await commentService.getAllForAccount(searchParams)
  const comments = res.data
  const totalCount = res.headers['x-total-count']
  return { comments, totalCount }
}

export default async function Comments({ searchParams }: IProps) {
  const { comments, totalCount } = await getComments(searchParams)
  return (
    <div className="section comments">
      <div className="container">
        <CommentItems comments={comments} />
        <Pagination totalCount={totalCount} />
      </div>
    </div>
  )
}
