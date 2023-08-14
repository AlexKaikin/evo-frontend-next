import Aside from '@/app/(components)/layout/Aside/profile/Aside'
import TableSkeleton from '@/app/(components)/skeletons/TableSkeleton/TableSkeleton'
import './styles.scss'

export default function Loading() {
  return (
    <div className="col">
      <Aside />
      <div className="section orders">
        <div className="container">
          <TableSkeleton />
        </div>
      </div>
    </div>
  )
}
