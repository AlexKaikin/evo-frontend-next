import { useRouter } from 'next/navigation'
import { BsChevronLeft } from 'react-icons/bs'

export default function GoBackButton() {
  const router = useRouter()
  return (
    <button className="go-back-button" onClick={() => router.back()}>
      <div className="round-wrap">
        <BsChevronLeft />
      </div>{' '}
      Назад
    </button>
  )
}
