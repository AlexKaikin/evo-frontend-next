'use client'

import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import Link from 'next/link'
import { useRef, useState } from 'react'
import {
  BsBoxArrowInUpRight,
  BsPencilSquare,
  BsThreeDotsVertical,
  BsTrash3,
} from 'react-icons/bs'
import { DeleteProductForm, UpdatePostForm } from '../crud'
import { IPost } from '@/types/blog/posts'
import { formatTime } from '@/utils'
import { INavLink } from '@/types/navigation'

interface IProps {
  posts: IPost[]
  navigation: INavLink[]
}

export default function PostItems({ posts, navigation }: IProps) {
  const [postItem, setPostItem] = useState<IPost | null>(null)
  const [updatePostShow, setUpdatePostShow] = useState<boolean>(false)
  const [deleteProductShow, setDeleteProductShow] = useState<boolean>(false)
  const [activeControls, setActiveControls] = useState<number>(0)
  const controlsRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(controlsRef, () => setActiveControls(0))

  function updateModaltoggle() {
    setUpdatePostShow(!updatePostShow)
  }

  function updatePost(post: IPost) {
    setUpdatePostShow(true)
    setPostItem(post)
  }

  function deleteModaltoggle() {
    setDeleteProductShow(!deleteProductShow)
  }

  function deletePost(post: IPost) {
    setDeleteProductShow(true)
    setPostItem(post)
  }

  function showControls(id: number) {
    setActiveControls(id)
  }

  return (
    <div className="post__items">
      <div className="post__item item">
        <div className="item__title">Заголовок</div>
        <div>Дата</div>
        <div className="post__view">Просмотры</div>
        <div className="post__published">Опубликован</div>
        <div></div>
      </div>
      {posts.map(post => {
        return (
          <div key={post.id} className="post__item item">
            <div className="post__title">{post.title}</div>
            <div>{formatTime(post.created)}</div>
            <div className="post__view">{post.viewsCount}</div>
            <div className="post__published">
              {post.published ? 'Да' : 'Нет'}
            </div>
            <div className="post__controls">
              <button onClick={() => showControls(post.id)}>
                <BsThreeDotsVertical />
              </button>

              {activeControls === post.id && (
                <div ref={controlsRef} className="controls fade-in">
                  {post.published && (
                    <Link href={`/posts/${post.id}`}>
                      <BsBoxArrowInUpRight /> Перейти в карточку
                    </Link>
                  )}
                  <button onClick={() => updatePost(post)}>
                    <BsPencilSquare /> Редактировать
                  </button>
                  <button onClick={() => deletePost(post)}>
                    <BsTrash3 /> Удалить
                  </button>
                </div>
              )}
            </div>
          </div>
        )
      })}
      {updatePostShow && postItem && (
        <UpdatePostForm
          post={postItem}
          navigation={navigation}
          hideModal={updateModaltoggle}
        />
      )}
      {deleteProductShow && postItem && (
        <DeleteProductForm id={postItem.id} hideModal={deleteModaltoggle} />
      )}
    </div>
  )
}
