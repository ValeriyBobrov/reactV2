import React, { useState, useEffect, useCallback } from 'react'
import { formatDistanceToNow } from 'date-fns'

// export default class TodoListItem extends Component {
//   state = {
//     checked: this.props.done,
//     taskCreated: new Date(),
//     editing: false,
//     editedDescription: this.props.description,
//     minutes: this.props.minutes,
//     seconds: this.props.seconds,
//     timerRunning: false,
//   }

//   timerIntervalRef = null

//   componentDidMount() {
//     const timerRunning = JSON.parse(sessionStorage.getItem(`timerRunning_${this.props.id}`)) || false
//     const minutes = JSON.parse(sessionStorage.getItem(`minutes_${this.props.id}`)) || this.props.minutes
//     const seconds = JSON.parse(sessionStorage.getItem(`seconds_${this.props.id}`)) || this.props.seconds

//     this.setState({
//       timerRunning,
//       minutes,
//       seconds,
//     })

//     if (timerRunning) {
//       this.timerIntervalRef = setInterval(this.decreaseTime, 1000)
//     }
//   }

//   componentWillUnmount() {
//     clearInterval(this.timerIntervalRef)
//     sessionStorage.setItem(`timerRunning_${this.props.id}`, JSON.stringify(this.state.timerRunning))
//     sessionStorage.setItem(`minutes_${this.props.id}`, JSON.stringify(this.state.minutes))
//     sessionStorage.setItem(`seconds_${this.props.id}`, JSON.stringify(this.state.seconds))
//   }

//   decreaseTime = () => {
//     if (this.state.minutes < 1 && this.state.seconds < 1) {
//       clearInterval(this.timerIntervalRef)
//       return
//     }

//     if (this.state.seconds === 0) {
//       this.setState((prevState) => ({
//         minutes: prevState.minutes - 1,
//         seconds: 59,
//       }))
//     } else {
//       this.setState((prevState) => ({
//         seconds: prevState.seconds - 1,
//       }))
//     }
//   }

//   handleStartTimer = () => {
//     if (!this.state.timerRunning) {
//       this.setState({
//         timerRunning: true,
//       })
//       this.timerIntervalRef = setInterval(this.decreaseTime, 1000)
//     }
//   }

//   handlePauseTimer = () => {
//     clearInterval(this.timerIntervalRef)
//     this.setState({
//       timerRunning: false,
//     })
//   }

//   handleToggleDone = () => {
//     this.setState((prevState) => ({
//       checked: !prevState.checked,
//     }))
//     this.props.onToggleDone()
//   }

//   handleDeleteItem = () => {
//     this.props.onDeleted()
//   }

//   handleEditClick = () => {
//     this.setState({
//       editing: true,
//     })
//   }

//   handleInputChange = (event) => {
//     this.setState({
//       editedDescription: event.target.value,
//     })
//   }

//   handleInputBlur = () => {
//     this.setState({
//       editing: false,
//     })
//     this.props.handleEditItem(this.props.id, this.state.editedDescription)
//   }

//   render() {
//     const { description } = this.props
//     const { checked, taskCreated, editing, editedDescription, minutes, seconds } = this.state
//     const formattedDistance = formatDistanceToNow(taskCreated)

//     let classNamesLi = ''
//     let classNamesDiv = 'view'
//     if (checked) {
//       classNamesLi = 'completed'
//     }

//     if (editing) {
//       classNamesLi = 'editing'
//       classNamesDiv = 'edit'
//     }

//     const todoNum = description

//     return (
//       <li key={this.props.id} className={classNamesLi}>
//         <div className={classNamesDiv}>
//           <input
//             className="toggle"
//             type="checkbox"
//             checked={checked}
//             onChange={this.handleToggleDone}
//             id={`todo-${todoNum}`}
//           />
//           {editing ? (
//             <input
//               className="edit-input"
//               type="text"
//               value={editedDescription}
//               onChange={this.handleInputChange}
//               onBlur={this.handleInputBlur}
//               onKeyDown={(event) => {
//                 if (event.key === 'Enter') {
//                   this.setState({
//                     editing: false,
//                   })
//                   this.props.handleEditItem(this.props.id, this.state.editedDescription)
//                 }
//               }}
//             />
//           ) : (
//             <label htmlFor={`todo-${todoNum}`}>
//               <span className="description">
//                 {editedDescription}
//                 <button type="button" className="icon icon-play" onClick={this.handleStartTimer} />
//                 <button type="button" className="icon icon-pause" onClick={this.handlePauseTimer} />
//                 <span className="timer">
//                   {minutes}:{seconds}
//                 </span>
//               </span>
//               <span className="created">{formattedDistance} ago</span>
//             </label>
//           )}
//           <button type="button" className="icon icon-edit" onClick={this.handleEditClick} />
//           <button type="button" className="icon icon-destroy" onClick={this.handleDeleteItem} />
//         </div>
//       </li>
//     )
//   }
// }

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
