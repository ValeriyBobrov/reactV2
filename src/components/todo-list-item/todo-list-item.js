import React, { useState, useEffect, useCallback } from 'react'
import { formatDistanceToNow } from 'date-fns'

function TodoListItem({ description, minutesData, secondsData, id, done, onDeleted, onToggleDone, handleEditItem }) {
  const [checked, setChecked] = useState(done)
  const [taskCreated] = useState(new Date())
  const [editing, setEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState(description)
  const [minutes, setMinutes] = useState(minutesData)
  const [seconds, setSeconds] = useState(secondsData)
  const [timerRunning, setTimerRunning] = useState(false)

  const decreaseTime = useCallback(() => {
    if (minutes < 1 && seconds < 1) {
      setTimerRunning(false)
    }

    if (seconds === 0) {
      setMinutes((prevState) => prevState - 1)
      setSeconds(59)
    } else {
      setSeconds((prevState) => prevState - 1)
    }
  }, [minutes, seconds, setTimerRunning, setMinutes, setSeconds])

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerRunning) {
        decreaseTime()
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [timerRunning, decreaseTime])

  useEffect(() => {
    const timerRunningSession = JSON.parse(sessionStorage.getItem(`timerRunning_${id}`)) || false
    const minutesSession = JSON.parse(sessionStorage.getItem(`minutes_${id}`)) || minutesData
    const secondsSession = JSON.parse(sessionStorage.getItem(`seconds_${id}`)) || secondsData

    if (timerRunningSession) {
      setTimerRunning(true)
    }
    setMinutes(minutesSession)
    setSeconds(secondsSession)
  }, [id, minutesData, secondsData])

  useEffect(() => {
    return () => {
      sessionStorage.setItem(`timerRunning_${id}`, JSON.stringify(timerRunning))
      sessionStorage.setItem(`minutes_${id}`, JSON.stringify(minutesData))
      sessionStorage.setItem(`seconds_${id}`, JSON.stringify(secondsData))
    }
  }, [id, timerRunning, minutesData, secondsData])

  const handleStartTimer = () => {
    setTimerRunning(true)
  }

  const handlePauseTimer = () => {
    setTimerRunning(false)
  }

  const handleToggleDone = () => {
    setChecked((prevState) => !prevState)
    onToggleDone()
  }

  const handleDeleteItem = () => {
    onDeleted()
  }

  const handleEditClick = () => {
    setEditing(true)
  }

  const handleInputBlur = () => {
    setEditing(false)
    handleEditItem(id, editedDescription)
  }

  const handleInputChange = (e) => {
    setEditedDescription(e.target.value)
  }

  const formattedDistance = formatDistanceToNow(taskCreated)

  let classNamesLi = ''
  let classNamesDiv = 'view'
  if (checked) {
    classNamesLi = 'completed'
  }

  if (editing) {
    classNamesLi = 'editing'
    classNamesDiv = 'edit'
  }

  const todoNum = description

  return (
    <li key={id} className={classNamesLi}>
      <div className={classNamesDiv}>
        <input
          className="toggle"
          type="checkbox"
          checked={checked}
          onChange={handleToggleDone}
          id={`todo=${todoNum}`}
        />
        {editing ? (
          <input
            className="edit-input"
            type="text"
            value={editedDescription}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setEditing(false)
                handleEditItem(id, editedDescription)
              }
            }}
          />
        ) : (
          <label htmlFor={`todo=${todoNum}`}>
            <span className="description">
              {editedDescription}
              <button type="button" className="icon icon-play" onClick={handleStartTimer} />
              <button type="button" className="icon icon-pause" onClick={handlePauseTimer} />
              <span className="timer">
                {minutes}:{seconds}
              </span>
            </span>
            <span className="created">{formattedDistance} ago</span>
          </label>
        )}
        <button type="button" className="icon icon-edit" onClick={handleEditClick} />
        <button type="button" className="icon icon-destroy" onClick={handleDeleteItem} />
      </div>
    </li>
  )
}

export default TodoListItem
