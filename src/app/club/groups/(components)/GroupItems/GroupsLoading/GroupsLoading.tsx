function GroupsLoading() {
  return (
    <div className="groups__items group skeleton">
      {Array(4)
        .fill('item')
        .map((item, i) => (
          <div key={i} className="group__item">
            <div className="group__img"></div>
            <div className="group__container">
              <div className="group__title"></div>
              <div className="group__about">
                <p></p>
                <p></p>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default GroupsLoading
