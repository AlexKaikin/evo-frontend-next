function GroupLoading(){
    return <div className="column skeleton">
      <div className="group__avatar"></div>
      <div className="group__info">
        <div className="group__header">
          <div className="group__title"></div>
        </div>
        <div className="group__about">
          <p></p>
          <p></p>
          <p></p>
        </div>
        <div className="group__location">
            <p></p>
        </div>
        <div className="group__followed">
            <p></p>
        </div>
      </div>
    </div>
}

export default GroupLoading