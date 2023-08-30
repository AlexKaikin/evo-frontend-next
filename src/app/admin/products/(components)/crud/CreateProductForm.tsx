'use client'

import { Modal } from '@/app/(components)'
import { productService } from '@/services/shop/products'
import { INavLink } from '@/types/navigation'
import { ICreateProduct } from '@/types/shop/products'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsTrash3 } from 'react-icons/bs'

interface IProps {
  navigation: INavLink[]
  hideModal: () => void
}

export default function CreateProductForm({ navigation, hideModal }: IProps) {
  const router = useRouter()
  const [imgUrl, setImgUrl] = useState('')
  const [galleryUrl, setGalleryUrl] = useState<string[]>([])
  const imgRef = useRef(null)
  const galleryRef = useRef(null)
  const [publishedChecked, setPublishedChecked] = useState(false)
  const { register, handleSubmit, formState } = useForm<ICreateProduct>()
  const { errors } = formState

  const handleChangeFile = async (e: any) => {
    try {
      const formData = new FormData()
      const file = e.target.files[0]
      formData.append('image', file)
      const { data } = await productService.uploadProductImg(formData)
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

  const removeImageClick = () => {
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
      const { data } = await productService.uploadProductImg(formData)
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

  const categories = navigation
    .find(item => item.url === '/products')
    ?.filter

  const titleValidate = {
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  }

  const priceValidate = {
    valueAsNumber: true,
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  }

  const quantityValidate = {
    valueAsNumber: true,
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  }

  const manufacturerValidate = {
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  }

  const countryValidate = {
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  }

  const townValidate = {
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  }

  const yearValidate = {
    valueAsNumber: true,
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

  async function onSubmit(data: ICreateProduct) {
    data.imgUrl = imgUrl
    data.galleryUrl = galleryUrl
    data.published = publishedChecked
    const res: any = await productService.create(data)
    if (res?.status === 201) {
      router.refresh()
      hideModal()
    } else {
      console.log('ошибка при создании товара')
      hideModal()
    }
  }

  return (
    <Modal title="Добавить товар" hideModal={hideModal} full>
      <form onSubmit={handleSubmit(onSubmit)} className="form create-product">
        <div className="form__left">
          <h3>Описание</h3>
          <div className="form__field">
            <label>Заголовок</label>
            <input
              {...register('title', titleValidate)}
              type="text"
              name="title"
            />
          </div>

          {errors.title && (
            <div className="form__text_error">{errors.title.message}</div>
          )}

          <div className="form__select">
            <label>Категория</label>
            <select {...register('category')} name="category">
              {categories?.map(item => (
                <option key={item.id} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form__field">
            <label>Цена, руб.</label>
            <input
              {...register('price', priceValidate)}
              type="number"
              name="price"
            />
          </div>

          {errors.price && (
            <div className="form__text_error">{errors.price.message}</div>
          )}

          <div className="form__field">
            <label>Количество</label>
            <input
              {...register('quantity', quantityValidate)}
              type="number"
              name="quantity"
            />
          </div>

          {errors.quantity && (
            <div className="form__text_error">{errors.quantity.message}</div>
          )}

          <div className="hidden">
            <input
              {...register('volume')}
              type="number"
              name="volume"
              value="100"
            />
            <input
              {...register('volumeMeasurement')}
              type="text"
              name="volumeMeasurement"
              value="грамм"
            />
            <input
              {...register('currency')}
              type="text"
              name="currency"
              value="руб."
            />
          </div>
        </div>
        <div className="form__right">
          <h3>Характеристики</h3>
          <div className="form__field">
            <label>Изготовитель</label>
            <input
              {...register('manufacturer', manufacturerValidate)}
              type="text"
              name="manufacturer"
            />
          </div>

          {errors.manufacturer && (
            <div className="form__text_error">
              {errors.manufacturer.message}
            </div>
          )}

          <div className="form__field">
            <label>Страна</label>
            <input
              {...register('property.country', countryValidate)}
              type="text"
              name="property.country"
            />
          </div>

          {errors?.property?.country && (
            <div className="form__text_error">
              {errors?.property?.country.message}
            </div>
          )}

          <div className="form__field">
            <label>Город</label>
            <input
              {...register('property.town', townValidate)}
              type="text"
              name="property.town"
            />
          </div>

          {errors?.property?.town && (
            <div className="form__text_error">
              {errors?.property?.town.message}
            </div>
          )}

          <div className="form__field">
            <label>Год</label>
            <input
              {...register('property.year', yearValidate)}
              type="number"
              name="property.year"
            />
          </div>

          {errors?.property?.year && (
            <div className="form__text_error">
              {errors?.property?.year.message}
            </div>
          )}
        </div>

        <div className="form__full">
          <div className="form__field">
            <label>Описание</label>
            <textarea {...register('text', textValidate)} name="text" />
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
              <button onClick={removeImageClick} className="remove">
                <BsTrash3 />
              </button>
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
          {/* {errors.imgUrl && touched.imgUrl && (
            <div className="form__text_error">{errors.imgUrl}</div>
          )} */}
        </div>

        <div className="form__right">
          <h3>Фотогалерея</h3>
          <div className="img__items">
            {galleryUrl &&
              galleryUrl.map(item => (
                <div key={item} className="img__item">
                  <button
                    type="button"
                    onClick={() => galleryRemoveClick(item)}
                    className="remove"
                  >
                    <BsTrash3 />
                  </button>
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
          />
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
