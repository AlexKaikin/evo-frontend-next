'use client'

import { useState } from 'react'
import { CreateProductForm } from '../crud'
import { INavLink } from '@/types/navigation'

interface IProps {
  navigation: INavLink[]
}

export default function AddProductButton({ navigation }: IProps) {
  const [createProductShow, setCreateProductShow] = useState<boolean>(false)
  
  function hideModal() {
    setCreateProductShow(false)
  }

  return (
    <>
      <button
        onClick={() => setCreateProductShow(true)}
        className="btn btn-light p-10"
      >
        Добавить товар
      </button>
      {createProductShow && (
        <CreateProductForm navigation={navigation} hideModal={hideModal} />
      )}
    </>
  )
}
