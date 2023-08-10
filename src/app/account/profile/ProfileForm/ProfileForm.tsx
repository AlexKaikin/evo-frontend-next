'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthDataType } from '@/types/auth'
import { Modal } from '@/app/(components)'
import { BsArrowClockwise, BsTrash3 } from 'react-icons/bs'
import { useActions } from '@/hooks/useActions'

interface IProps {
  user: AuthDataType
}

export default function ProfileForm({ user }: IProps) {
  const { updateUser, deleteUser } = useActions()
  const [modalApply, setModalApply] = useState(false)
  const [deleteUserModal, setDeleteUserModal] = useState(false)
  const { register, handleSubmit, formState, reset } = useForm<AuthDataType>()
  const { errors, isDirty } = formState

  const aboutValidate = {}
  const locationValidate = {}
  const interestsValidate = {}

  function deleteUserClick() {
    deleteUser()
  }

  function formatInterests(interests: any) {
    if (typeof interests === 'string')
      return interests.length === 0 ? [] : interests.split(', ')

    return interests
  }

  async function onSubmit(data: AuthDataType) {
    data.id = user.id
    data.interests = formatInterests(data.interests)
    const res: any = await updateUser(data)

    if (res.status === 200) {
      setModalApply(true)
      reset()
    }
  }

  return (
    <form className="form profile__info" onSubmit={handleSubmit(onSubmit)}>
      <div className="col">
        <div className="form__field disabled">
          <label>Логин</label>
          <input
            {...register('fullName')}
            type="text"
            defaultValue={user.fullName}
            readOnly
          />
        </div>

        <div className="form__field disabled">
          <label>Почта</label>
          <input
            {...register('email')}
            type="text"
            defaultValue={user.email}
            readOnly
          />
        </div>
      </div>

      <div className="form__field">
        <label>О себе</label>
        <textarea
          {...register('about', aboutValidate)}
          defaultValue={user.about}
        />
      </div>

      <div className="form__field">
        <label>Местоположение</label>
        <input
          {...register('location', locationValidate)}
          type="text"
          defaultValue={user.location}
        />
      </div>

      {errors.location && <span>{errors.location.message}</span>}

      <div className="form__field">
        <label>Интересы (через запятую)</label>
        <input
          {...register('interests', interestsValidate)}
          type="text"
          defaultValue={user.interests.join(', ')}
        />
      </div>

      {errors.interests && <span>{errors.interests.message}</span>}

      <div className="form__footer">
        {isDirty && (
          <button type="submit" className="form__btn">
            <BsArrowClockwise /> Обновить
          </button>
        )}

        <button
          type="button"
          className="form__btn btn-delete"
          onClick={() => setDeleteUserModal(true)}
        >
          <BsTrash3 /> Удалить аккаунт
        </button>
      </div>

      {modalApply && (
        <Modal title="" modalMaxContent hideModal={() => setModalApply(false)}>
          Обновлено успешно
        </Modal>
      )}

      {deleteUserModal && (
        <Modal
          title="Удалить аккаунт"
          modalMaxContent
          hideModal={() => setDeleteUserModal(false)}
        >
          <p>Вы действительно хотите удалить аккаунт?</p>
          <div className="button-wrapper">
            <button
              type="button"
              className="btn btn-warning radius-10"
              onClick={() => deleteUserClick()}
            >
              Удалить
            </button>
            <button
              type="button"
              className="btn btn-light radius-10"
              onClick={() => setDeleteUserModal(false)}
            >
              Отмена
            </button>
          </div>
        </Modal>
      )}
    </form>
  )
}
