import { Modal } from '@/app/(components)'
import defaultAvatar from '@/assets/img/user/defaultAvatar.png'
import { useActions } from '@/hooks/useActions'
import { authService } from '@/services'
import { AuthDataType } from '@/types/auth'
import cn from 'classnames'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsArrowClockwise } from 'react-icons/bs'

interface IProps {
  user: AuthDataType
  hideModal: () => void
}

export default function MyPageSettingsForm({ user, hideModal }: IProps) {
  const { updateUser } = useActions()
  const { register, handleSubmit, formState } = useForm<AuthDataType>()

  const imgRef = useRef(null)
  const [imgUrl, setImgUrl] = useState(user.avatarUrl)
  const [interestsInput, setInterestsInput] = useState(
    user.interests.join(', ')
  )

  const handleChangeFile = async (e: any) => {
    document.querySelector('.preloader')?.classList.remove('hide')
    document.querySelector('.preloader')?.classList.add('show')

    try {
      const formData = new FormData()
      const file = e.target.files[0]
      formData.append('image', file)
      const { data } = await authService.uploadUserAvatar(formData)

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

  function changeInterestsInput(e: any) {
    setInterestsInput(e.currentTarget.value)
  }

  async function onSubmit(data: AuthDataType) {
    ;(data.id = user.id), (data._id = user._id), (data.avatarUrl = imgUrl)
    data.interests = interestsInput === '' ? [] : interestsInput.split(', ')
    const res: any = await updateUser(data)
    if (res.status === 200) return hideModal()
  }

  return (
    <Modal title="Настройки" hideModal={hideModal}>
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
            <div className={cn('form__field disabled')}>
              <label>Никнейм</label>
              <input
                {...register('fullName')}
                type="text"
                name="fullName"
                value={user.fullName}
                disabled
              />
            </div>

            <div className={cn('form__field')}>
              <label>О себе</label>
              <textarea
                {...register('about')}
                name="about"
                defaultValue={user.about}
              />
            </div>

            <div className={cn('form__field')}>
              <label>Интересы (через запятую)</label>
              <input
                {...register('interests')}
                type="text"
                name="interests"
                value={interestsInput}
                onChange={(e: any) => changeInterestsInput(e)}
              />
            </div>

            <div className={cn('form__field')}>
              <label>Местоположение</label>
              <input
                {...register('location')}
                type="text"
                name="location"
                defaultValue={user.location}
              />
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
                  Скрытный профиль
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="form__footer">
          <button type="submit" className="form__btn">
            <BsArrowClockwise /> Обновить аккаунт
          </button>
        </div>
      </form>
    </Modal>
  )
}
