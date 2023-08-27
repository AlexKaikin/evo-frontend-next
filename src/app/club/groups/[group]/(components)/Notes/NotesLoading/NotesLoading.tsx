function NotesLoading() {
  return (
    <div className="group__notes skeleton">
      {Array(8)
        .fill('item')
        .map((item, i) => (
          <div key={i} className="group__note">
            <div className="group__avatar"></div>
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
