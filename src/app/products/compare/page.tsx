import CompareItems from './(components)/CompareItems'
import './styles.scss'

export default function Compare() {
  return (
    <div className="section compare">
      <div className="container">
        <div className="section__title">Товары для сравнения</div>
        <CompareItems />
      </div>
    </div>
  )
}
