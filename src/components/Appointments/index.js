// Write your code here
import {Component} from 'react'
import {v4 as uid} from 'uuid'
import {format} from 'date-fns'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentList: [],
    starredList: false,
  }

  getStarredItems = () => {
    this.setState(prevState => ({
      starredList: !prevState.starredList,
    }))
  }

  onClickAddStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const dateFormat = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uid(),
      titleInput,
      dateInput: dateFormat,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onAddTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onAddDate = event => {
    this.setState({dateInput: event.target.value})
  }

  render() {
    const {titleInput, dateInput, appointmentList, starredList} = this.state

    const starredListItems = starredList
      ? appointmentList.filter(each => each.isStarred === true)
      : appointmentList

    const starredbtn = starredList ? 'stared-btn' : 'btn'

    return (
      <div className="container">
        <div className="container2">
          <h1>Add Appointment</h1>
          <div className="content">
            <form onSubmit={this.onAddAppointment}>
              <label htmlFor="title">Title</label>
              <br />
              <input
                type="text"
                className="title-input"
                value={titleInput}
                onChange={this.onAddTitle}
                id="title"
              />
              <br />
              <label htmlFor="date">Date</label>
              <br />
              <input
                type="date"
                className="title-input"
                value={dateInput}
                onChange={this.onAddDate}
                id="date"
              />
              <br />
              <button type="submit">Add</button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="img"
              alt="appointments"
            />
          </div>

          <hr />

          <div className="appointment">
            <h1 className="app">Appointments</h1>
            <button
              className={`${starredbtn}`}
              type="button"
              onClick={this.getStarredItems}
            >
              Starred
            </button>
          </div>
          <ul className="unorder">
            {starredListItems.map(each => (
              <AppointmentItem
                details={each}
                key={each.id}
                onClickAddStar={this.onClickAddStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
