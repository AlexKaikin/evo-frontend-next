import { Modal } from '@/app/(components)'
import defaultAvatar from '@/assets/img/user/users.jpg'
import { useActions } from '@/hooks/useActions'
import { groupService } from '@/services/club/groups'
import { GroupItemType } from '@/types/club/groups'
import cn from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

interface IProps {
  hideModal: () => void
}

export default function CreateGroupForm({ hideModal }: IProps) {
  const router = useRouter()
  const { createGroup } = useActions()
  const imgRef = useRef(null)
  const [imgUrl, setImgUrl] = useState('')
  const { register, handleSubmit, formState } = useForm<GroupItemType>()
  const { errors } = formState

  const handleChangeFile = async (e: any) => {
    document.querySelector('.preloader')?.classList.remove('hide')
    document.querySelector('.preloader')?.classList.add('show')

    try {
      const formData = new FormData()
      const file = e.target.files[0]
      formData.append('image', file)
      const { data } = await groupService.uploadGroupImg(formData)
      if (data.url) {
        setImgUrl(data.url)

        document.querySelector('.preloader')?.classList.remove('show')
        document.querySelector('.preloader')?.classList.add('hide')
      }
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

  const titleValidate = {
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  }

  const aboutValidate = {
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  }

  async function onSubmit(data: GroupItemType) {
    data.avatarUrl = imgUrl
    const res: any = await createGroup(data)
    if (res.status === 201) router.push(`/club/groups/${res.data._id}`)
  }

  return (
    <Modal title="Новая группа" hideModal={hideModal}>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="column-2">
          <div className="img-container">
            <Image
              fill
              sizes="(max-width: 1800px) 50vw"
              src={imgUrl.length ? imgUrl : defaultAvatar}
              alt="аватар"
            />
            <div className="img__control">
              <button
                type="button"
                onClick={uploadImgClick}
                className="btn btn-light p10 radius-10"
              >
                Загрузить
              </button>
              {imgUrl.length ? (
                <button
                  type="button"
                  onClick={removeImageClick}
                  className="btn btn-light p10 radius-10"
                >
                  Очистить
                </button>
              ) : (
                ''
              )}
            </div>

            <input
              ref={imgRef}
              type="file"
              name="imgUrl"
              onChange={handleChangeFile}
              hidden
            />
          </div>
          <div className="info-container">
            <div
              className={cn('form__field', {
                form__field_error: errors.title,
              })}
            >
              <label>Название</label>
              <input
                {...register('title', titleValidate)}
                type="text"
                name="title"
              />
            </div>

            {errors.title && (
              <div className="form__text_error">{errors.title.message}</div>
            )}

            <div
              className={cn('form__field', {
                form__field_error: errors.about,
              })}
            >
              <label>Описание</label>
              <textarea {...register('about', aboutValidate)} name="about" />
            </div>

            {errors.about && (
              <div className="form__text_error">{errors.about.message}</div>
            )}

            <div className={cn('form__field')}>
              <label>Местоположение</label>
              <input {...register('location')} type="text" name="location" />
            </div>

            <div className="form__full">
              <div className="form__checkbox">
                <input
                  {...register('private')}
                  id="private"
                  type="checkbox"
                  name="private"
                />
                <label htmlFor="private" className="form-check-label">
                  Закрытая группа
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="form__footer">
          <button type="submit" className="form__btn">
            Создать группу
          </button>
        </div>
      </form>
    </Modal>
  )
}
