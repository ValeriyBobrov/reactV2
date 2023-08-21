import React from 'react'

export default class AppHeader extends React.Component {
  state = {
    description: '',
    minutes: '',
    seconds: '',
    errors: {},
  }

  onLabelChange = (e) => {
    this.setState({
      description: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()

    if (this.validateFields()) {
      const { description, minutes, seconds } = this.state
      const { addNewItem } = this.props

      addNewItem(description, minutes, seconds)

      this.setState({
        description: '',
        minutes: '',
        seconds: '',
        errors: {},
      })
    }
  }

  onTimerChange = (e, field) => {
    this.setState({
      [field]: e.target.value,
    })
  }

  validateFields = () => {
    const { minutes, seconds } = this.state
    const errors = {}

    if ((minutes !== '' && !/^\d+$/.test(minutes)) || minutes > 60) {
      errors.minutes = 'Minutes must be a number and less 60'
    }

    if ((seconds !== '' && !/^\d+$/.test(seconds)) || seconds > 60) {
      errors.seconds = 'Seconds must be a number and less 60'
    }

    this.setState({ errors })

    return Object.keys(errors).length === 0
  }

  render() {
    const { description, minutes, seconds, errors } = this.state
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit} className="new-todo-form">
          <input
            type="text"
            className="new-todo"
            placeholder="Task"
            onChange={this.onLabelChange}
            value={description}
          />
          <input
            placeholder="Min"
            className="new-todo-form__timer"
            onChange={(e) => this.onTimerChange(e, 'minutes')}
            value={minutes}
          />
          {errors.minutes && <div className="error">{errors.minutes}</div>}
          <input
            placeholder="Sec"
            className="new-todo-form__timer"
            onChange={(e) => this.onTimerChange(e, 'seconds')}
            value={seconds}
          />
          {errors.seconds && <div className="error">{errors.seconds}</div>}
          <button type="submit">Add Task</button>
        </form>
      </header>
    )
  }
}
