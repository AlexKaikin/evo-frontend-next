'use client'

import { Rating } from '@/app/(components)'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { IReview } from '@/types/shop/reviews'
import { formatTime, text } from '@/utils'
import { useRef, useState } from 'react'
import {

  BsPencilSquare,
  BsThreeDotsVertical,
  BsTrash3,
} from 'react-icons/bs'
import { DeleteReviewForm, UpdateReviewForm } from '../crud'


interface IProps {
  reviews: IReview[]
}

export default function ReviewItems({ reviews }: IProps) {
  const [reviewItem, setReviewItem] = useState<IReview | null>(null)
  const [updateReviewShow, setUpdateReviewShow] = useState<boolean>(false)
  const [deleteReviewShow, setDeleteReviewShow] = useState<boolean>(false)
  // const [reviewShow, setReviewShow] = useState<IReview | null>(null)
  // const [deleteShow, setdeleteShow] = useState<number | null>(null)
  const [activeControls, setActiveControls] = useState<number>(0)
  const controlsRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(controlsRef, () => setActiveControls(0))

  function showControls(id: number) {
    setActiveControls(id)
  }

  //const modaltoggle = () => setReviewShow(null)

  // function modaltoggle2() {
  //   setdeleteShow(null)
  // }

  function updateModaltoggle() {
    setUpdateReviewShow(!updateReviewShow)
  }

  function deleteModaltoggle() {
    setDeleteReviewShow(!deleteReviewShow)
  }

  function updateReview(item: IReview) {
    setUpdateReviewShow(true)
    setReviewItem(item)
  }

  function deleteReview(item: IReview) {
    setDeleteReviewShow(true)
    setReviewItem(item)
  }

  return (
    <div className="review__items">
      <div className="review__item">
        <div>Отзыв</div>
        <div>Рейтинг</div>
        <div>Создан</div>
        <div>Статус</div>
        <div></div>
      </div>
      {reviews.map(review => {
        return (
          <div key={review.id} className="review__item">
            <div className="review__title">{text.cut(review.body, 50)}</div>
            <div className="review__rating">
              <Rating number={review.rating} />
            </div>
            <div>{formatTime(review.created)}</div>
            <div>{review.published}</div>
            <div className="review__controls">
              <button onClick={() => showControls(review.id)}>
                <BsThreeDotsVertical />
              </button>

              {activeControls === review.id && (
                <div ref={controlsRef} className="controls fade-in">
                  {/* {review.published && (
                    <Link href={`/reviews/${product.id}`}>
                      <BsBoxArrowInUpRight /> Перейти в карточку
                    </Link>
                  )} */}
                  <button onClick={() => updateReview(review)}>
                    <BsPencilSquare /> Показать
                  </button>
                  <button onClick={() => deleteReview(review)}>
                    <BsTrash3 /> Удалить
                  </button>
                </div>
              )}
            </div>
            {/* <button
              onClick={() => setReviewShow(review)}
              className="btn btn-light p10 radius-10 width-100"
            >
              <BsPencilSquare />
            </button>
            <button
              onClick={() => setdeleteShow(review.id)}
              className="btn btn-light p10 radius-10 width-100"
            >
              <BsTrash3 />
            </button> */}
          </div>
        )
      })}
     

     

      {updateReviewShow && reviewItem && (
        <UpdateReviewForm review={reviewItem} hideModal={updateModaltoggle} />
      )} 
       {deleteReviewShow && reviewItem && (
        <DeleteReviewForm id={reviewItem.id} hideModal={deleteModaltoggle} />
      )}
    </div>
  )
}
