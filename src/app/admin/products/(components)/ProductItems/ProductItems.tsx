'use client'

import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { IProduct } from '@/types/shop/products'
import Link from 'next/link'
import { useRef, useState } from 'react'
import {
  BsBoxArrowInUpRight,
  BsPencilSquare,
  BsThreeDotsVertical,
  BsTrash3,
} from 'react-icons/bs'
import { DeleteProductForm, UpdateProductForm } from '../crud'

interface IProps {
  products: IProduct[]
}

export default function ProductItems({ products }: IProps) {
  const [productItem, setProductItem] = useState<IProduct | null>(null)
  const [updateProductShow, setUpdateProductShow] = useState<boolean>(false)
  const [deleteProductShow, setDeleteProductShow] = useState<boolean>(false)
  const [activeControls, setActiveControls] = useState<number>(0)
  const controlsRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(controlsRef, () => setActiveControls(0))

  function updateModaltoggle() {
    setUpdateProductShow(!updateProductShow)
  }

  function updateProduct(item: IProduct) {
    setUpdateProductShow(true)
    setProductItem(item)
  }

  function deleteModaltoggle() {
    setDeleteProductShow(!deleteProductShow)
  }

  function deleteProduct(item: IProduct) {
    setDeleteProductShow(true)
    setProductItem(item)
  }

  function showControls(id: number) {
    setActiveControls(id)
  }

  return (
    <div className="admin__items">
      <div className="admin__item item">
        <div className="item__title">Заголовок</div>
        <div>Кол-во, шт.</div>
        <div>Цена, руб.</div>
        <div>Опубликован</div>
        <div></div>
        <div></div>
      </div>
      {products.map(product => {
        return (
          <div key={product.id} className="admin__item item">
            <div className="product__title">{product.title}</div>
            <div>{product.quantity}</div>
            <div>{product.price}</div>
            <div>{product.published ? 'Да' : 'Нет'}</div>
            <div className="product__controls">
              <button onClick={() => showControls(product.id)}>
                <BsThreeDotsVertical />
              </button>

              {activeControls === product.id && (
                <div ref={controlsRef} className="controls fade-in">
                  {product.published && (
                    <Link href={`/products/${product.id}`}>
                      <BsBoxArrowInUpRight /> Перейти в карточку
                    </Link>
                  )}
                  <button onClick={() => updateProduct(product)}>
                    <BsPencilSquare /> Редактировать
                  </button>
                  <button onClick={() => deleteProduct(product)}>
                    <BsTrash3 /> Удалить
                  </button>
                </div>
              )}
            </div>
          </div>
        )
      })}
      {updateProductShow && productItem && (
        <UpdateProductForm
          product={productItem}
          hideModal={updateModaltoggle}
        />
      )}
      {deleteProductShow && productItem && (
        <DeleteProductForm
          id={productItem.id}
          hideModal={deleteModaltoggle}
        />
      )}
    </div>
  )
}
