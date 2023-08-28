function UserLoading(){
    return <div className="column skeleton">
      <div className="user__avatar"></div>
      <div className="user__info">
        <div className="user__nicname"></div>
        <div className="user__about">
            <p></p>
            <p></p>
            <p></p>
        </div>
        <div className="user__location">
            <p></p>
        </div>
        <div className="user__followed">
            <p></p>
        </div>
      </div>
    </div>
}

export default UserLoading