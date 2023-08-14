import Aside from '@/app/(components)/layout/Aside/admin/Aside'
import './styles.scss'

export default async function Dashboard(){
    return (
      <div className="col">
        <Aside />
        <div className="section Dashboard">
          <div className="container">
            <div>Dashboard в разработке</div>
          </div>
        </div>
      </div>
    )
}