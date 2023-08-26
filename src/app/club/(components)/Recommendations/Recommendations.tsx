import { RecommendItemType } from '@/types/club/recommendations'
import defaultAvatar from '@/assets/img/user/defaultAvatar.png'
import './Recommendations.scss'
import Link from 'next/link'
import Image from 'next/image'

interface IProps {
  recommendItems: RecommendItemType[] | null
}

function Recommendations({ recommendItems }: IProps) {
  if (!recommendItems || !recommendItems.length)
    return (
      <div className="club__recommendations">
        <div className="recommendations__container">
          <div className="recommendations__title">Совпадение по интересам</div>
          <div className="recommendations__items">
            <div className="recommendations__item">Не найдено</div>
          </div>
        </div>
      </div>
    )

  return (
    <div className="club__recommendations">
      <div className="recommendations__container">
        <div className="recommendations__title">Совпадение по интересам</div>
        <div className="recommendations__items">
          {recommendItems.map(user => (
            <Link
              href={`/club/users/${user._id}`}
              key={user._id}
              className="recommendations__item"
            >
              <div className="user__avatar">
                <Image
                  fill
                  sizes="(max-width: 1800px) 33vw"
                  src={user.avatarUrl ? user.avatarUrl : defaultAvatar}
                  alt=""
                />
              </div>
              <div className="user__body">
                <span>{user.fullName}</span>, {user.about}
              </div>
            </Link>
          ))}
          {/* <div className="news__item">
            <div className="user__notes">
              <div className="user__note">
                <div className="note__content">
                  <div className="note__text">
                    <span>maks</span>, Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et...
                  </div>
                  <div className="note__time">19 мая 2023 г. в 23:44</div>
                </div>
              </div>
              <div className="user__note">
                <div className="note__content">
                  <div className="note__text">
                    <span>elen</span>, Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod...
                  </div>
                  <div className="note__time">18 мая 2023 г. в 23:44</div>
                </div>
              </div>
              <div className="user__note">
                <div className="note__content">
                  <div className="note__text">
                    <span>eon</span>, Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod...
                  </div>
                  <div className="note__time">18 мая 2023 г. в 23:44</div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Recommendations
