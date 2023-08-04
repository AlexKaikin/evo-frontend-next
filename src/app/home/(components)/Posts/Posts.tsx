import { IPost } from '@/types/blog/posts'
import { formatTime } from '@/utils/utils'
import Image from 'next/image'
import Link from 'next/link'
import { BsChevronRight, BsClock, BsEye, BsFolder2Open } from 'react-icons/bs'

interface IProps {
  posts: IPost[]
}

export default function Posts({ posts }: IProps) {
  return (
    <div className="section home__posts">
      <div className="posts__header">
        <div className="posts__title">Новые записи в блоге</div>
      </div>
      <div className="posts__items post">
        {posts?.map((post, i) => {
          return (
            <Link
              href={`/posts/${post.id}`}
              key={post.id}
              className={`post__item fade-in post-${i + 1}`}
            >
              <div className="post__img">
                <Image fill src={post.imgUrl} alt={`${post.title} фото`} />
              </div>
              <div className="post__body">
                <div className="post__title">{post.title}</div>
                <div className="post__meta">
                  <div className="post__category">
                    <BsFolder2Open /> {post.category}
                  </div>
                  <div className="post__view">
                    <BsEye /> {post.viewsCount}
                  </div>
                  <div className="post__date">
                    <BsClock /> {formatTime(post.created)}
                  </div>
                </div>
                <div className="post__text">
                  {post.text
                    .slice(0, 140)
                    .concat('...')
                    .split('\n')
                    .map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      <div className="posts__footer">
        <Link href={`/posts/`} className="btn radius-5 p-20 posts__all">
          Перейти в блог <BsChevronRight />
        </Link>
      </div>
    </div>
  )
}
