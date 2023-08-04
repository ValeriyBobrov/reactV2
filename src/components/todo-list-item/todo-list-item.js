import React from 'react'
import { formatDistanceToNow } from 'date-fns'

class TodoListItem extends React.Component {
  state = {
    checked: this.props.done,
    taskCreated: new Date(),
    editing: false,
    editedDescription: this.props.description,
  }

  handleToggleDone = () => {
    this.setState((prevState) => ({
      checked: !prevState.checked,
    }))
    this.props.onToggleDone()
  }

  handleDeleteItem = () => {
    this.props.onDeleted()
  }

  handleEditClick = () => {
    this.setState({
      editing: true,
    })
  }

  handleInputChange = (event) => {
    this.setState({
      editedDescription: event.target.value,
    })
  }

  handleInputBlur = () => {
    this.setState({
      editing: false,
    })
    this.props.handleEditItem(this.props.id, this.state.editedDescription)
  }

  render() {
    const { description, done } = this.props
    const { checked, taskCreated, editing, editedDescription } = this.state
    const formattedDistance = formatDistanceToNow(taskCreated)

    let classNamesLi = ''
    let classNamesDiv = 'view'
    if (done) {
      classNamesLi = 'completed'
    }

    if (editing) {
      classNamesLi = 'editing'
      classNamesDiv = 'edit'
    }

    const todoNum = description

    return (
      <li key={this.props.id} className={classNamesLi}>
        <div className={classNamesDiv}>
          <input
            className="toggle"
            type="checkbox"
            checked={checked}
            onChange={this.handleToggleDone}
            id={`todo-${todoNum}`}
          />
          {editing ? (
            <input
              className="edit-input"
              type="text"
              value={editedDescription}
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  this.setState({
                    editing: false,
                  })
                  this.props.handleEditItem(this.props.id, this.state.editedDescription)
                }
              }}
            />
          ) : (
            <label htmlFor={`todo-${todoNum}`}>
              <span className="description">{editedDescription}</span>
              <span className="created">{formattedDistance} ago</span>
            </label>
          )}
          <button type="button" className="icon icon-edit" onClick={this.handleEditClick} />
          <button type="button" className="icon icon-destroy" onClick={this.handleDeleteItem} />
        </div>
      </li>
    )
  }
}

export default TodoListItem
