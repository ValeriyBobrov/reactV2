import React from 'react'

export default class AppHeader extends React.Component {
  state = {
    description: '',
  }

  onLabelChange = (e) => {
    this.setState({
      description: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { description } = this.state
    const { addNewItem } = this.props
    addNewItem(description)
    this.setState({
      description: '',
    })
  }

  render() {
    const { description } = this.state
    return (
      <header className="header">
        <form onSubmit={this.onSubmit}>
          <h1>todos</h1>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={description}
          />
        </form>
      </header>
    )
  }
}
