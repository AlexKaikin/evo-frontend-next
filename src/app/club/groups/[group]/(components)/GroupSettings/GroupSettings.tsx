import { useState } from 'react'
import { GroupItemType } from '@/types/club/groups'
import { BsGear } from 'react-icons/bs'
import GroupSettingsForm from './GroupSettingsForm/GroupSettingsForm'

interface IProps {
  group: GroupItemType
}

export default function GroupSettings({ group }: IProps) {
  const [showSettings, setShowSettings] = useState(false)

  function hideModal() {
    setShowSettings(false)
  }

  return (
    <div className="group__settings">
      <button onClick={() => setShowSettings(true)}>
        <BsGear />
      </button>
      {showSettings && (
        <GroupSettingsForm group={group} hideModal={hideModal} />
      )}
    </div>
  )
}
