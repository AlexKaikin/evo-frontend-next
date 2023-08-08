import './styles.scss'

export default function Contacts() {
  return (
    <div className="section feedback">
      <div className="container">
        <div className="section__title">Контакты</div>
        <h3>Написать сообщение администратору</h3>
        <form id="feedback-form" className="form">
          <div className="form__field">
            <label>Тема</label>
            <input type="text" name="login" required />
          </div>
          <div className="form__field">
            <label>Сообщение</label>
            <textarea required />
          </div>
          <button className="btn">Отправить</button>
        </form>
      </div>
    </div>
  )
}
