import { authSelector } from '@/store/auth/auth'
import { navigationSelector } from '@/store/navigation/navigation'
import cn from 'classnames'
import { useSelector } from 'react-redux'

export default function Loader() {
  const { navigation } = useSelector(navigationSelector)
  const { status } = useSelector(authSelector)

  return (
    <div
      className={cn('preloader', {
        hide: navigation.length && (status === 'success' || status === 'error'),
      })}
    >
      <div className="preloader__text">EVO</div>
      <div className="preloader__icon">
        <div className="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
