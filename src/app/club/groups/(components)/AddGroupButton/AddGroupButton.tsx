import { useState } from 'react'
import CreateGroupForm from '../CreateGroupForm/CreateGroupForm'

export default function AddGroupButton() {
  const [showModal, setShowModal] = useState(false)
  function hideModal() {
    setShowModal(false)
  }
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="btn add-group p-10"
      >
        Создать группу
      </button>
      {showModal && <CreateGroupForm hideModal={hideModal} />}
    </>
  )
}
