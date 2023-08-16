'use client'

import { INavLink } from '@/types/navigation'
import { useState } from 'react'
import { CreateProductForm } from '../crud'

interface IProps {
  navigation: INavLink[]
}

export default function AddPostButton({ navigation }: IProps) {
  const [createPostShow, setCreatePostShow] = useState<boolean>(false)

  function hideModal() {
    setCreatePostShow(false)
  }

  return (
    <>
      <button
        onClick={() => setCreatePostShow(true)}
        className="btn btn-light p-10"
      >
        Добавить статью
      </button>
      {createPostShow && (
        <CreateProductForm navigation={navigation} hideModal={hideModal} />
      )}
    </>
  )
}
