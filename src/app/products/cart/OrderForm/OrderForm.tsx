import { useState } from 'react'
import { CreateOrderItemType } from '@/types/shop/order'
import { useActions } from '@/hooks/useActions'

type PropsType = {
  orderFormRef: any
}

function OrderForm({ orderFormRef }: PropsType) {
  const { createOrder } = useActions()
  const [indexValue, setIndexValue] = useState('')

  function changeIndex(e: React.ChangeEvent<HTMLInputElement>) {
    setIndexValue(e.target.value)
  }

  const formState: CreateOrderItemType = {
    name: '',
    surname: '',
    middleName: '',
    region: '',
    city: '',
    street: '',
    home: '',
    index: 0,
    cartItems: [],
    totalCost: 0,
  }

  function formSubmit(values: CreateOrderItemType) {
    values.index = +indexValue
    createOrder(values)
  }

  return (
    <div ref={orderFormRef} id="order-form" className="section order-form">
      <div className="container">
        {/* <Formik
          initialValues={formState}
          validate={formValidate}
          onSubmit={formSubmit}
        >
          <Form className="form">
            <div className="form__wrapper">
              <div className="form__column">
                <div className="section__title">Данные получателя</div>
                <div className="form__field">
                  <label>Фамилия</label>
                  <Field type="text" name="surname" required />
                </div>
                <div className="form__field">
                  <label>Имя</label>
                  <Field type="text" name="name" required />
                </div>
                <div className="form__field">
                  <label>Отчество</label>
                  <Field type="text" name="middleName" required />
                </div>
              </div>
              <div className="form__column">
                <div className="section__title">Адрес доставки</div>
                <div className="form__field">
                  <label>Область/край</label>
                  <Field type="text" name="region" required />
                </div>
                <div className="form__field">
                  <label>Населённый пункт</label>
                  <Field type="text" name="city" required />
                </div>
                <div className="form__field">
                  <label>Улица</label>
                  <Field type="text" name="street" required />
                </div>
                <div className="form__field">
                  <label>Дом и квартира</label>
                  <Field type="text" name="home" required />
                </div>
                <div className="form__field">
                  <label>Индекс</label>
                  <Field
                    type="number"
                    name="index"
                    onChange={changeIndex}
                    value={indexValue}
                    required
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="form__btn">
              Отправить
            </button>
          </Form>
        </Formik> */}
      </div>
    </div>
  )
}

export default OrderForm

const formValidate = (values: CreateOrderItemType) => {
  const errors = {}
  return errors
}
