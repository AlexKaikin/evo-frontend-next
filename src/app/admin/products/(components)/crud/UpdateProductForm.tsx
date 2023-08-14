'use client'

import { Modal } from '@/app/(components)'
import { productService } from '@/services/shop/products'
import { navigationSelector } from '@/store/navigation/navigation'
import { IProduct, IUpdateProduct } from '@/types/shop/products'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsTrash3 } from 'react-icons/bs'
import { useSelector } from 'react-redux'

interface IProps {
  product: IProduct
  hideModal: () => void
}

export default function UpdateProductForm({ product, hideModal }: IProps) {
  const router = useRouter()
  const { navigation } = useSelector(navigationSelector)
  const [imgUrl, setImgUrl] = useState(product.imgUrl)
  const [galleryUrl, setGalleryUrl] = useState<string[]>(product.galleryUrl)
  const imgRef = useRef(null)
  const galleryRef = useRef(null)
  const [publishedChecked, setPublishedChecked] = useState(product.published)
  const { register, handleSubmit, formState } = useForm<IUpdateProduct>()
  const { errors } = formState

  const categories = navigation
    .find(item => item.url === '/products')
    ?.filter.slice(1)

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

  async function onSubmit(data: IUpdateProduct) {
    data.imgUrl = imgUrl
    data.galleryUrl = galleryUrl
    data.published = publishedChecked
    const res: any = await productService.update(data)
    if (res?.status === 200) {
      router.refresh()
      hideModal()
    } else {
      hideModal()
    }
  }

  return (
    <Modal title="Обновить товар" hideModal={hideModal} full>
      <form onSubmit={handleSubmit(onSubmit)} className="form create-product">
        <div className="form__left">
          <h3>Описание</h3>
          <div className="form__field">
            <label>Заголовок</label>
            <input
              {...register('title', titleValidate)}
              type="text"
              name="title"
              defaultValue={product.title}
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
              defaultValue={product.category}
            >
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
              defaultValue={product.price}
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
              defaultValue={product.quantity}
            />
          </div>

          {errors.quantity && (
            <div className="form__text_error">{errors.quantity.message}</div>
          )}

          <div className="hidden">
            <input
              {...register('id', { valueAsNumber: true })}
              defaultValue={product.id}
              type="number"
              name="id"
            />
            <input
              {...register('volume', { valueAsNumber: true })}
              defaultValue={product.volume}
              type="number"
              name="volume"
            />
            <input
              {...register('volumeMeasurement')}
              type="text"
              name="volumeMeasurement"
              defaultValue={product.volumeMeasurement}
            />
            <input
              {...register('currency')}
              defaultValue={product.currency}
              type="text"
              name="currency"
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
              defaultValue={product.manufacturer}
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
              defaultValue={product.property.country}
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
              defaultValue={product.property.town}
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
              defaultValue={product.property.year}
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
            <textarea
              {...register('text', textValidate)}
              defaultValue={product.text}
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
          <h3>Фотогалерея</h3>
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
