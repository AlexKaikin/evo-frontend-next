import Modal from '@/components/Modal/Modal'
import Link from 'next/link'

interface IProps {
  authModaltoggle: () => void
}

export default function AuthForm({ authModaltoggle }: IProps) {
  return (
    <Modal title="Оформить заказ" hideModal={authModaltoggle}>
      <p>Оформить заказ может только зарегистрированный пользователь</p>
      <p>
        У вас есть аккаунт? <Link href="/login">Вход</Link>
      </p>
      <p>
        У вас нет аккаунта? <Link href="/register">Регистрация</Link>
      </p>
    </Modal>
  )
}
