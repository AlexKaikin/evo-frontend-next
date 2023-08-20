import { useState } from 'react'
import { useSelector } from 'react-redux'
import {BsGear} from 'react-icons/bs'
import { authSelector } from '@/store/auth/auth'
import MyPageSettingsForm from './MyPageSettingsForm/MyPageSettingsForm'

function MyPageSettings() {
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

export default MyPageSettings
