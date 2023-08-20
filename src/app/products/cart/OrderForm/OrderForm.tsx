'use client'

import { ICreateOrder } from '@/types/shop/order'
import { orderService } from '@/services'
import { getLocalStorage } from '@/utils'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface IProps {
  orderFormRef: any
}

export default function OrderForm({ orderFormRef }: IProps) {
  const router = useRouter()
  const { register, handleSubmit, formState } = useForm<ICreateOrder>()
  const { errors } = formState

  const surnameValidate = {
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  }

  const nameValidate = {
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  }

  const middleNameValidate = {
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  }

  const regionValidate = {
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  }

  const cityValidate = {
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  }

  const streetValidate = {
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  }

  const homeValidate = {
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  }

  const indexValidate = {
    valueAsNumber: true,
    required: {
      value: true,
      message: 'Обязательное поле',
    },
  }

  async function onSubmit(data: ICreateOrder) {
    data.cartItems = getLocalStorage('cart') || []
    const res: any = await orderService.create(data)
    if (res?.status === 201) {
      router.push('/account/orders')
    } else {
      console.log('Что-то пошло не так!')
    }
  }

  return (
    <div ref={orderFormRef} id="order-form" className="section order-form">
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form__wrapper">
            <div className="form__column">
              <div className="section__title">Данные получателя</div>
              <div className="form__field">
                <label>Фамилия</label>
                <input
                  {...register('surname', surnameValidate)}
                  type="text"
                  name="surname"
                />
              </div>

              {errors.surname && (
                <div className="form__text_error">
                  {errors?.surname?.message?.toString()}
                </div>
              )}

              <div className="form__field">
                <label>Имя</label>
                <input
                  {...register('name', nameValidate)}
                  type="text"
                  name="name"
                />
              </div>

              {errors.name && (
                <div className="form__text_error">
                  {errors?.name?.message?.toString()}
                </div>
              )}

              <div className="form__field">
                <label>Отчество</label>
                <input
                  {...register('middleName', middleNameValidate)}
                  type="text"
                  name="middleName"
                />
              </div>

              {errors.middleName && (
                <div className="form__text_error">
                  {errors?.middleName?.message?.toString()}
                </div>
              )}
            </div>
            <div className="form__column">
              <div className="section__title">Адрес доставки</div>
              <div className="form__field">
                <label>Область/край</label>
                <input
                  {...register('region', regionValidate)}
                  type="text"
                  name="region"
                />
              </div>

              {errors.region && (
                <div className="form__text_error">
                  {errors?.region?.message?.toString()}
                </div>
              )}

              <div className="form__field">
                <label>Населённый пункт</label>
                <input
                  {...register('city', cityValidate)}
                  type="text"
                  name="city"
                />
              </div>

              {errors.city && (
                <div className="form__text_error">
                  {errors?.city?.message?.toString()}
                </div>
              )}

              <div className="form__field">
                <label>Улица</label>
                <input
                  {...register('street', streetValidate)}
                  type="text"
                  name="street"
                />
              </div>

              {errors.street && (
                <div className="form__text_error">
                  {errors?.street?.message?.toString()}
                </div>
              )}

              <div className="form__field">
                <label>Дом и квартира</label>
                <input
                  {...register('home', homeValidate)}
                  type="text"
                  name="home"
                />
              </div>

              {errors.home && (
                <div className="form__text_error">
                  {errors?.home?.message?.toString()}
                </div>
              )}

              <div className="form__field">
                <label>Индекс</label>
                <input
                  {...register('index', indexValidate)}
                  type="number"
                  name="index"
                />
              </div>

              {errors.index && (
                <div className="form__text_error">
                  {errors?.index?.message?.toString()}
                </div>
              )}

            </div>
          </div>
          <button type="submit" className="form__btn">
            Отправить
          </button>
        </form>
      </div>
    </div>
  )
}
