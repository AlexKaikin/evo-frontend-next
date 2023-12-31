import { Pagination } from '@/app/(components)'
import { reviewService } from '@/services/shop/reviews'
import { IUrlParams } from '@/utils/url'
import { Metadata } from 'next'
import ReviewItems from './(components)/ReviewItems/ReviewItems'
import './styles.scss'

interface IProps {
  searchParams: IUrlParams
}

export const metadata: Metadata = {
  title: 'Отзывы |  EVO PLACE',
  description: 'Отзывы...',
}

async function getReviews(searchParams: IUrlParams) {
  const res = await reviewService.getAllForAccount(searchParams)
  const reviews = res.data
  const totalCount = res.headers['x-total-count']
  return { reviews, totalCount }
}

export default async function Reviews({ searchParams }: IProps) {
  const { reviews, totalCount } = await getReviews(searchParams)
  return (
    <div className="section orders">
      <div className="container">
        <ReviewItems reviews={reviews} />
        <Pagination totalCount={totalCount} />
      </div>
    </div>
  )
}
