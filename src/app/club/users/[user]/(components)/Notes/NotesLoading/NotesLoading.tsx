function NotesLoading() {
  return (
    <div className="user__notes skeleton">
      {Array(8)
        .fill('item')
        .map((item, i) => (
          <div key={i} className="user__note">
            <div className="user__avatar"></div>
            <div className="note__content note">
              <div className="note__name"></div>
              <div className="note__text"></div>
              <div className="note__text"></div>
              <div className="note__text"></div>
              <div className="note__text"></div>
              <div className="note__time">
                <span></span>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default NotesLoading
