import { useRouter } from 'next/navigation'
import { BsChevronLeft } from 'react-icons/bs'

export default function GoBackButton() {
  const router = useRouter()

  function goBackPage() {
    router.back()
  }

  return (
    <button className="go-back-button" onClick={goBackPage}>
      <div className="round-wrap">
        <BsChevronLeft />
      </div>{' '}
      Назад
    </button>
  )
}
