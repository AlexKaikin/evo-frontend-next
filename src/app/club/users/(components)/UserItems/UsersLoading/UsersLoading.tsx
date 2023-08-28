function UsersLoading() {
  return (
    <div className="users__items user skeleton">
      {Array(8)
        .fill('item')
        .map((item, i) => (
          <div key={i} className="user__item">
            <div className="user__img"></div>
            <div className="user__name"></div>
          </div>
        ))}
    </div>
  )
}

export default UsersLoading
