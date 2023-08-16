import { redirect } from 'next/navigation'

interface IProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: IProps) {
  if (error?.message === 'Request failed with status code 401')
    redirect('/login')

  if (error?.message === 'Request failed with status code 403')
    return (
      <section className="section">
        <div className="container">
          <div className="section__title">Недостаточно прав</div>
        </div>
      </section>
    )

  return (
    <section className="section">
      <div className="container">
        <div className="section__title">Что-то пошло не так!</div>
        <button onClick={() => reset()} className='btn'>Попробывать ещё раз</button>
      </div>
    </section>
  )
}
