import Aside from '@/app/(components)/layout/Aside/admin/Aside'
import './styles.scss'

export default function Loading() {
  return (
    <div className="col">
      <Aside />
      <div className="section Dashboard">
        <div className="container">loading...</div>
      </div>
    </div>
  )
}
