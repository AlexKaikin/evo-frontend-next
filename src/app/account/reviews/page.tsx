import Aside from '@/app/(components)/layout/Aside/profile/Aside'
import './styles.scss'
import { IUrlParams } from '@/utils/url'
import { Metadata } from 'next'
import { Pagination } from '@/app/(components)'
import { reviewService } from '@/services/shop/reviews'
import ReviewItems from './(components)/ReviewItems/ReviewItems'

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
    <div className="col">
      <Aside />
      <div className="section orders">
        <div className="container">
          <ReviewItems reviews={reviews} />
          <Pagination totalCount={totalCount} />
        </div>
      </div>
    </div>
  )
}
