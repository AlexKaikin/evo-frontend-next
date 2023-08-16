'use client'

import { Modal } from '@/app/(components)'
import { postService } from '@/services'
import { productService } from '@/services/shop/products'
import { IPost, IUpdatePost } from '@/types/blog/posts'
import { INavLink } from '@/types/navigation'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsTrash3 } from 'react-icons/bs'


interface IProps {
  post: IPost
  navigation: INavLink[]
  hideModal: () => void
}

export default function UpdatePostForm({ post, navigation, hideModal }: IProps) {
  const router = useRouter()
  const [imgUrl, setImgUrl] = useState(post.imgUrl)
  const [galleryUrl, setGalleryUrl] = useState<string[]>(post.galleryUrl)
  const imgRef = useRef(null)
  const galleryRef = useRef(null)
  const [publishedChecked, setPublishedChecked] = useState(post.published)
  const { register, handleSubmit, formState } = useForm<IUpdatePost>()
  const { errors } = formState

  const categories = navigation
    .find(item => item.url === '/posts')
    ?.filter.slice(1)

  const handleChangeFile = async (e: any) => {
    try {
      const formData = new FormData()
      const file = e.target.files[0]
      formData.append('image', file)
      const { data } = await postService.uploadPostImg(formData)
      setImgUrl(data.url)
    } catch (err) {
      console.warn(err)
      alert('Ошибка загрузки изображения')
    }
  }

  const uploadImgClick = () => {
    // @ts-ignore
    if (imgRef.current) imgRef.current.click()
  }

  const onClickRemoveImage = () => {
    setImgUrl('')
  }

  const uploadGalleryClick = () => {
    // @ts-ignore
    if (galleryRef.current) galleryRef.current.click()
  }

  const addGalleryUrl = async (e: any) => {
    try {
      const formData = new FormData()
      const file = e.target.files[0]
      formData.append('image', file)
      const { data } = await postService.uploadPostImg(formData)
      setGalleryUrl(arr => [...arr, `${data.url}`])
    } catch (err) {
      console.warn(err)
      alert('Ошибка загрузки изображения')
    }
  }

  const galleryRemoveClick = (item: string) => {
    setGalleryUrl(arr => arr.filter(i => i !== item))
  }

  const publishedClick = () => {
    setPublishedChecked(!publishedChecked)
  }

  const titleValidate = {
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  }


  const textValidate = {
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  }

  async function onSubmit(data: IUpdatePost) {
    data.imgUrl = imgUrl
    data.galleryUrl = galleryUrl
    data.published = publishedChecked
    const res: any = await postService.update(data)
    if (res?.status === 200) {
      router.refresh()
      hideModal()
    } else {
      hideModal()
    }
  }

  return (
    <Modal title="Обновить товар" hideModal={hideModal} full>
      <form onSubmit={handleSubmit(onSubmit)} className="form create-post">
        <div className="form__left">
          <h3>Описание</h3>
          <div className="form__field">
            <label>Заголовок</label>
            <input
              {...register('title', titleValidate)}
              type="text"
              name="title"
              defaultValue={post.title}
            />
          </div>

          {errors.title && (
            <div className="form__text_error">{errors.title.message}</div>
          )}

          <div className="form__select">
            <label>Категория</label>
            <select
              {...register('category')}
              name="category"
              defaultValue={post.category}
            >
              {categories?.map(category => (
                <option key={category.id} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden">
            <input
              {...register('id', { valueAsNumber: true })}
              defaultValue={post.id}
              type="number"
              name="id"
            />
          </div>
        </div>
        <div className="form__right"></div>

        <div className="form__full">
          <div className="form__field">
            <label>Описание</label>
            <textarea
              {...register('text', textValidate)}
              defaultValue={post.text}
              name="text"
            />
          </div>

          {errors.text && (
            <div className="form__text_error">{errors.text.message}</div>
          )}
        </div>

        <div className="form__full">
          <div className="form__checkbox">
            <input
              {...register('published')}
              type="checkbox"
              name="published"
              checked={publishedChecked}
            />
            <label onClick={publishedClick} className="form-check-label">
              Опубликовать
            </label>
          </div>
        </div>

        <div className="form__left">
          <h3>Обложка</h3>

          {imgUrl && (
            <div className="img__item">
              <div onClick={onClickRemoveImage} className="remove">
                <BsTrash3 />
              </div>
              <Image
                fill
                sizes="(max-width: 1800px) 50vw"
                src={imgUrl}
                alt="фото"
              />
            </div>
          )}
          <div onClick={uploadImgClick} className="btn btn-light">
            Загрузить фото
          </div>
          <input
            ref={imgRef}
            type="file"
            name="imgUrl"
            onChange={handleChangeFile}
            hidden
          />
        </div>

        <div className="form__right">
          {/* <h3>Фотогалерея</h3>
          <div className="img__items">
            {galleryUrl &&
              galleryUrl.map(item => (
                <div key={item} className="img__item">
                  <div
                    onClick={() => galleryRemoveClick(item)}
                    className="remove"
                  >
                    <BsTrash3 />
                  </div>
                  <Image
                    fill
                    sizes="(max-width: 1800px) 50vw"
                    src={item}
                    alt="фото"
                  />
                </div>
              ))}
          </div>
          <div onClick={uploadGalleryClick} className="btn btn-light">
            Загрузить фото
          </div>
          <input
            ref={galleryRef}
            type="file"
            name="galleryUrl"
            onChange={addGalleryUrl}
            hidden
          /> */}
        </div>

        <div className="form__full">
          <button className="form__btn" type="submit">
            Отправить
          </button>
        </div>
      </form>
    </Modal>
  )
}
