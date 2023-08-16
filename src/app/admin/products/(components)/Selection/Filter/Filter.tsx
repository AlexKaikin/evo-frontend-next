'use client'

import { Rating } from '@/app/(components)'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { IFilterProducts } from '@/types/shop/products'
import { scrollToTop } from '@/utils'
import cn from 'classnames'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsDashLg, BsFunnel, BsXLg } from 'react-icons/bs'

export default function Filter() {
  const router = useRouter()
  const filterRef = useRef<HTMLDivElement>(null)
  const [showFilter, setShowFilter] = useState<boolean>(false)
  let queryParams = new URLSearchParams()
  if (typeof window !== 'undefined')
    queryParams = new URLSearchParams(window.location.search)
  const filter = {
    q: queryParams.get('q') || '',
    manufacturer: queryParams.get('manufacturer') || '',
    price_gte: queryParams.get('price_gte') || '',
    price_lte: queryParams.get('price_lte') || '',
    ratings: queryParams.get('ratings') || '',
  }
  const [ratingsForUrl, setRatingsForUrl] = useState(filter.ratings.split(','))
  const [ratingsValue, setRatingsValue] = useState([
    { star: 5, checked: ratingsForUrl.includes('5') },
    { star: 4, checked: ratingsForUrl.includes('4') },
    { star: 3, checked: ratingsForUrl.includes('3') },
    { star: 2, checked: ratingsForUrl.includes('2') },
    { star: 1, checked: ratingsForUrl.includes('1') },
  ])
  useOnClickOutside(filterRef, () => setShowFilter(false))

  function checkChangedFilter() {
    let queryParams

    if (typeof window !== 'undefined') {
      queryParams = new URLSearchParams(window.location.search)
      if (
        queryParams.has('q') ||
        queryParams.has('manufacturer') ||
        queryParams.has('price_gte') ||
        queryParams.has('price_lte') ||
        queryParams.has('ratings')
      )
        return true
      return false
    }
  }

  function selectRating(e: any) {
    if (e.target.closest('.form__checkbox')) {
      const input = e.target
        .closest('.form__checkbox')
        .querySelector('[type="checkbox"]')
      const ratingNumber = input.dataset.rating

      setRatingsValue(
        ratingsValue.map(rating =>
          rating.star === +ratingNumber
            ? { ...rating, checked: !rating.checked }
            : rating
        )
      )

      setRatingsForUrl(
        ratingsForUrl.includes(ratingNumber)
          ? ratingsForUrl.filter(rating => rating !== ratingNumber)
          : [...ratingsForUrl, ratingNumber]
      )
    }
  }

  function formReset() {
    for (const param in filter) {
      // @ts-ignore
      filter[param] = ''
    }
    setRatingsValue(ratingsValue.map(rating => ({ ...rating, checked: false })))
    setRatingsForUrl([])
    reset(filter)
  }

  const { register, handleSubmit, formState, reset } =
    useForm<IFilterProducts>()
  const { errors, isDirty } = formState

  const priceFromValidate = {
    min: { value: 1, message: 'Цена «от» должна быть больше 0' },
  }
  const priceToValidate = {
    min: { value: 1, message: 'Цена «до» должна быть больше 0' },
  }

  async function onSubmit(data: IFilterProducts) {
    let queryParams

    if (typeof window !== 'undefined') {
      queryParams = new URLSearchParams(window.location.search)
      if (ratingsForUrl.length) {
        if (queryParams.has('ratings')) {
          // @ts-ignore
          queryParams.set('ratings', ratingsForUrl)
        } else {
          // @ts-ignore
          queryParams.append('ratings', ratingsForUrl)
        }

        if (queryParams.has('_page')) {
          queryParams.set('_page', String(1))
        }
      } else {
        if (queryParams.has('ratings')) {
          queryParams.delete('ratings')
        }
      }

      for (let param in data) {
        // @ts-ignore
        if (data[param].length) {
          if (queryParams.has(param)) {
            // @ts-ignore
            queryParams.set(param, data[param])
          } else {
            // @ts-ignore
            queryParams.append(param, data[param])
          }

          if (queryParams.has('_page')) {
            queryParams.set('_page', String(1))
          }
        } else {
          if (queryParams.has(param)) {
            queryParams.delete(param)
          }
        }
      }
    }

    const path = window.location.pathname + '?' + queryParams?.toString()
    router.push(path)
    setShowFilter(false)
    scrollToTop()
  }

  return (
    <div ref={filterRef} className="filter__filter-products">
      <button
        onClick={() => setShowFilter(!showFilter)}
        className={cn('filter__icon', { active: checkChangedFilter() })}
      >
        <BsFunnel /> <span>Фильтр</span>{' '}
      </button>
      <div className={cn('filter__items', { show: showFilter })}>
        <div className="filter__header">
          <div className="header__title">Фильтр</div>
          <button onClick={() => setShowFilter(false)}>
            <BsXLg />
          </button>
        </div>

        <form className="form form-filter" onSubmit={handleSubmit(onSubmit)}>
          <div className="filter__body">
            <div className="filter__item price">
              <div className="filter__title">Цена в рублях</div>
              <div className="filter__price">
                <div
                  className={cn('form__field', {
                    form__field_error: errors.price_gte,
                  })}
                >
                  <input
                    {...register('price_gte', priceFromValidate)}
                    defaultValue={filter.price_gte}
                    type="number"
                    name="price_gte"
                    placeholder="от"
                  />
                </div>
                <BsDashLg />
                <div
                  className={cn('form__field', {
                    form__field_error: errors.price_lte,
                  })}
                >
                  <input
                    {...register('price_lte', priceToValidate)}
                    defaultValue={filter.price_lte}
                    type="number"
                    name="price_lte"
                    placeholder="до"
                  />
                </div>
              </div>
              {errors.price_gte && (
                <div className="form__text_error">
                  {errors.price_gte.message}
                </div>
              )}
              {errors.price_lte && (
                <div className="form__text_error">
                  {errors.price_lte.message}
                </div>
              )}
            </div>
            <div className="filter__item rating">
              <div className="filter__title">Рейтинг</div>
              {ratingsValue.map(ratign => (
                <div
                  key={ratign.star}
                  onClick={selectRating}
                  className="form__checkbox"
                >
                  <input
                    type="checkbox"
                    name={`${ratign.star}`}
                    data-rating={ratign.star}
                    onChange={selectRating}
                    checked={ratign.checked}
                  />
                  <label className="form-check-label">
                    <Rating number={ratign.star} />
                  </label>
                </div>
              ))}
            </div>
            <div className="filter__item manufacturer">
              <div className="form__field">
                <label>Название</label>
                <input
                  {...register('q')}
                  defaultValue={filter.q}
                  type="text"
                  name="q"
                />
              </div>
            </div>
            <div className="filter__item manufacturer">
              <div className="form__field">
                <label>Изготовитель</label>
                <input
                  {...register('manufacturer')}
                  defaultValue={filter.manufacturer}
                  type="text"
                  name="manufacturer"
                />
              </div>
            </div>
          </div>
          <div className="filter__footer">
            <button className="btn p-10" type="submit">
              Применить
            </button>
            {(isDirty || checkChangedFilter()) && (
              <button
                onClick={formReset}
                type="reset"
                className="btn btn-light p-10"
              >
                Сброс
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
