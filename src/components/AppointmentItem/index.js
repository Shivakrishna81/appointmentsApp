import './index.css'

const AppointmentItem = props => {
  const {details, onClickAddStar} = props
  const {titleInput, dateInput, isStarred, id} = details

  const starItem = () => {
    onClickAddStar(id)
  }

  const star = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="listItem">
      <div>
        <p className="title-t">{titleInput}</p>
        <p>Date:{dateInput}</p>
      </div>
      <button
        type="button"
        data-testid="star"
        className="str-btn"
        onClick={starItem}
      >
        <img src={star} className="star-img" alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
