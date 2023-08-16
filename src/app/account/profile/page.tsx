'use client'

import defaulAvatarUrl from '@/assets/img/user/defaultAvatar.png'
import { useActions } from '@/hooks/useActions'
import { authService } from '@/services/auth/auth'
import { authSelector } from '@/store/auth/auth'
import { useAppSelector } from '@/store/store'
import { scrollToTop } from '@/utils'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { BsArrowClockwise, BsTrash3 } from 'react-icons/bs'
import ProfileForm from './ProfileForm/ProfileForm'
import './styles.scss'

export default function Profile() {
  const { data: user } = useAppSelector(authSelector)
  const { updateUser } = useActions()
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl)
  const avatarRef = useRef(null)

  function updateAvatar() {
    // @ts-ignore
    if (avatarRef.current) avatarRef.current.click()
  }

  function deleteAvatar() {
    if (user) {
      setAvatarUrl('')
      const profile = { ...user }
      profile.avatarUrl = ''
      updateUser(profile)
    }
  }

  async function handleChangeFile(e: any) {
    try {
      const preloader: HTMLDivElement | null =
        document.querySelector('.preloader')
      if (preloader) preloader.classList.remove('hide')

      const formData = new FormData()
      const file = e.target.files[0]
      formData.append('image', file)
      const { data } = await authService.uploadUserAvatar(formData)

      if (data.url && user) {
        setAvatarUrl(data.url)
        const updatedUser = { ...user }
        updatedUser.avatarUrl = data.url
        if (preloader) preloader.classList.add('hide')
        e.target.value = ''
        updateUser(updatedUser)
      }
    } catch (err) {
      console.warn(err)
      alert('Ошибка загрузки изображения')
    }
  }

  useEffect(() => {
    setAvatarUrl(user?.avatarUrl)
    scrollToTop()
  }, [user?.avatarUrl])

  return (
    <div className="section profile">
      <div className="container">
        <div className="profile__columns">
          <div className="profile__avatar">
            <div className="avatar__wrapper">
              <Image
                fill
                sizes="(max-width: 1800px) 50vw"
                src={avatarUrl ? avatarUrl : defaulAvatarUrl}
                alt="avatar"
              />
              <form>
                <input
                  ref={avatarRef}
                  type="file"
                  name="avatarUrl"
                  onChange={handleChangeFile}
                  hidden
                />
              </form>
              <div className="avatar__change">
                <button className="avatar__update" onClick={updateAvatar}>
                  <BsArrowClockwise />
                </button>
                <button className="avatar__delete" onClick={deleteAvatar}>
                  <BsTrash3 />
                </button>
              </div>
            </div>
          </div>
          {user && <ProfileForm user={user} />}
        </div>
      </div>
    </div>
  )
}
