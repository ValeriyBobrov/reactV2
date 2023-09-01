import React, { useState } from 'react'

function AppHeader({ addNewItem }) {
  const [description, setDescription] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [errors, setErrors] = useState({})

  const onLabelChange = (e) => {
    setDescription(e.target.value)
  }

  const validateFields = () => {
    if ((minutes !== '' && !/^\d+$/.test(minutes)) || minutes > 60) {
      errors.minutes = 'Minutes must be a number and less 60'
    }

    if ((seconds !== '' && !/^\d+$/.test(seconds)) || seconds > 60) {
      errors.seconds = 'Seconds must be a number and less 60'
    }

    setErrors({ errors })

    return Object.keys(errors).length === 0
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (validateFields()) {
      addNewItem(description, minutes, seconds)

      setDescription('')
      setMinutes('')
      setSeconds('')
      setErrors('')
    }
  }

  const onMinutesChange = (e) => {
    setMinutes(e.target.value)
  }

  const onSecondsChange = (e) => {
    setSeconds(e.target.value)
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={onSubmit} className="new-todo-form">
        <input type="text" className="new-todo" placeholder="Task" onChange={onLabelChange} value={description} />
        <input
          placeholder="Min"
          className="new-todo-form__timer"
          onChange={(e) => onMinutesChange(e)}
          value={minutes}
        />
        {errors.minutes && <div className="error">{errors.minutes}</div>}
        <input
          placeholder="Sec"
          className="new-todo-form__timer"
          onChange={(e) => onSecondsChange(e)}
          value={seconds}
        />
        {errors.seconds && <div className="error">{errors.seconds}</div>}
        <button type="submit">Add Task</button>
      </form>
    </header>
  )
}

export default AppHeader
