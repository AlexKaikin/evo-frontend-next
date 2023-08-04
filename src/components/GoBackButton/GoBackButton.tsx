import { ChevronLeftSVG } from '../svg'
import { useRouter } from 'next/navigation'

export default function GoBackButton() {
  const router = useRouter()

  function goBackPage() {
    router.back()
  }

  return (
    <button className="go-back-button" onClick={goBackPage}>
      <div className="round-wrap">
        <ChevronLeftSVG />
      </div>{' '}
      Назад
    </button>
  )
}
