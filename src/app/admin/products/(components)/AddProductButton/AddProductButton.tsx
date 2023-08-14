'use client'

import { useState } from 'react'
import { CreateProductForm } from '../crud'

export default function AddProductButton() {
  const [createProductShow, setCreateProductShow] = useState<boolean>(false)
  
  function createModaltoggle() {
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
        <CreateProductForm hideModal={createModaltoggle} />
      )}
    </>
  )
}
