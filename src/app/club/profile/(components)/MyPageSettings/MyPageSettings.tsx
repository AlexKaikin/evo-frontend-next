import { authSelector } from '@/store/auth/auth'
import { useState } from 'react'
import { BsGear } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import MyPageSettingsForm from './MyPageSettingsForm/MyPageSettingsForm'

export default function MyPageSettings() {
  const { data: user } = useSelector(authSelector)
  const [showSettings, setShowSettings] = useState(false)

  function hideModal() {
    setShowSettings(false)
  }

  if (!user) return null

  return (
    <div className="user__settings">
      <button onClick={() => setShowSettings(true)}>
        <BsGear />
      </button>
      {showSettings && <MyPageSettingsForm user={user} hideModal={hideModal} />}
    </div>
  )
}
