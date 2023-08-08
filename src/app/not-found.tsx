import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section__title">Страница не найдена</h2>
        <Link href="/home" className="btn p-10">
          Перейти на главную страницу
        </Link>
      </div>
    </section>
  )
}
