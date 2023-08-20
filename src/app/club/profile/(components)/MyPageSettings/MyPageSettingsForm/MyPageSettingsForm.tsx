import cn from 'classnames'
//import { Field, Form, Formik } from 'formik'
import { useRef, useState } from 'react'
import { AuthDataType } from '@/types/auth'
import defaultAvatar from '@assets/img/user/defaultAvatar.png'
import { Modal } from '@/app/(components)'
import {BsArrowClockwise} from 'react-icons/bs'
import { useActions } from '@/hooks/useActions'
import { authService } from '@/services'

type PropsType = {
  user: AuthDataType
  hideModal: () => void
}

function MyPageSettingsForm({ user, hideModal }: PropsType) {
  const { updateUser } = useActions()

  const imgRef = useRef(null)
  const [imgUrl, setImgUrl] = useState(user.avatarUrl)
  const [interestsInput, setInterestsInput] = useState(
    user.interests.join(', ')
  )

  const formState: AuthDataType = {
    id: user.id,
    _id: user._id,
    fullName: user.fullName,
    about: user.about,
    interests: user.interests,
    location: user.location,
    private: user.private,
    avatarUrl: user.avatarUrl,
    subscribers: user.subscribers,
    subscriptionsUser: user.subscriptionsUser,
    subscriptionsGroup: user.subscriptionsGroup,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    __v: user.__v,
  }

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

  function aboutValidate(value: string) {}

  function locationValidate(value: string) {}

  function changeInterestsInput(e: any) {
    setInterestsInput(e.currentTarget.value)
  }

  async function formSubmit(values: AuthDataType, { resetForm }: any) {
    values.avatarUrl = imgUrl
    values.interests = interestsInput === '' ? [] : interestsInput.split(', ')
    const res: any = await updateUser(values)
    if (res.status === 200) return hideModal()
    resetForm()
  }

  return (
    <Modal title="Настройки" hideModal={hideModal}>
      {/* <Formik initialValues={formState} onSubmit={formSubmit}>
        {({ errors, touched }) => (
          <Form className="form">
            <div className="column-2">
              <div className="img-container">
                <img
                  src={
                    imgUrl.length
                      ? (process.env.REACT_APP_SERVER_URL || '') + imgUrl
                      : defaultAvatar
                  }
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
                  className={cn('form__field disabled', {
                    form__field_error: errors.fullName && touched.fullName,
                  })}
                >
                  <label>Никнейм</label>
                  <Field
                    type="text"
                    name="fullName"
                    value={user.fullName}
                    disabled
                  />
                </div>

                <div
                  className={cn('form__field', {
                    form__field_error: errors.about && touched.about,
                  })}
                >
                  <label>О себе</label>
                  <Field
                    type="text"
                    name="about"
                    as="textarea"
                    validate={aboutValidate}
                  />
                </div>

                {errors.about && touched.about && (
                  <div className="form__text_error">{errors.about}</div>
                )}

                <div
                  className={cn('form__field', {
                    form__field_error: errors.about && touched.about,
                  })}
                >
                  <label>Интересы (через запятую)</label>
                  <Field
                    type="text"
                    name="interests"
                    value={interestsInput}
                    onChange={(e: any) => changeInterestsInput(e)}
                  />
                </div>

                <div
                  className={cn('form__field', {
                    form__field_error: errors.location && touched.location,
                  })}
                >
                  <label>Местоположение</label>
                  <Field
                    type="text"
                    name="location"
                    validate={locationValidate}
                  />
                </div>

                {errors.location && touched.location && (
                  <div className="form__text_error">{errors.location}</div>
                )}

                <div className="form__full">
                  <div className="form__checkbox">
                    <Field id="private" type="checkbox" name="private" />
                    <label htmlFor="private" className="form-check-label">
                      Скрытный профиль
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="form__footer">
              <button type="submit" className="form__btn">
                <ArrowClockwiseSVG /> Обновить аккаунт
              </button>
            </div>
          </Form>
        )}
      </Formik> */}
    </Modal>
  )
}

export default MyPageSettingsForm
