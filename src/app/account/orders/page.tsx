import { Pagination } from '@/app/(components)'
import Aside from '@/app/(components)/layout/Aside/profile/Aside'
import { orderService } from '@/services/shop/orders'
import { IUrlParams } from '@/utils/url'
import { Metadata } from 'next'
import OrderItems from './(components)/OrderItems/OrderItems'
import './styles.scss'

interface IProps {
  searchParams: IUrlParams
}

export const metadata: Metadata = {
  title: 'Заказы |  EVO PLACE',
  description: 'Заказы...',
}

async function getOrders(searchParams: IUrlParams) {
  const res = await orderService.getAll(searchParams)
  const orders = res.data
  const totalCount = res.headers['x-total-count']
  return { orders, totalCount }
}

export default async function Orders({ searchParams }: IProps) {
  const { orders, totalCount } = await getOrders(searchParams)
  return (
    <div className="two">
      <Aside />
      <div className="section orders">
        <div className="container">
          <OrderItems orders={orders} />
          <Pagination totalCount={totalCount} />
        </div>
      </div>
    </div>
  )
}
