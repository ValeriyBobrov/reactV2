import React from 'react'

import AppHeader from '../app-header'
import TodoList from '../todo-list'
import Footer from '../footer'

export default class App extends React.Component {
  maxId = 100

  state = {
    todoData: [],
    filter: 'all',
  }

  clearItems = () => {
    this.setState({
      todoData: [],
    })
  }

  addNewItem = (text, minutes, seconds) => {
    if (text.trim().length === 0) {
      return
    }

    const newItem = this.createTodoItem(text, minutes, seconds)

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem]

      return {
        todoData: newArray,
      }
    })
  }

  deletedItem = (id) => {
    this.setState((prevState) => ({
      todoData: prevState.todoData.filter((item) => item.id !== id),
    }))
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const updatedTodoData = todoData.map((todoItem) =>
        todoItem.id === id ? { ...todoItem, done: !todoItem.done } : todoItem
      )
      return {
        todoData: updatedTodoData,
      }
    })
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  handleEditItem = (id, editedDescription) => {
    this.setState(({ todoData }) => {
      const updatedTodoData = todoData.map((todoItem) =>
        todoItem.id === id ? { ...todoItem, description: editedDescription } : todoItem
      )
      return {
        todoData: updatedTodoData,
      }
    })
  }

  createTodoItem(text, minutes, seconds) {
    return {
      description: text,
      minutes,
      seconds,
      id: this.maxId++,
      done: false,
    }
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.done)
      case 'completed':
        return items.filter((item) => item.done)
      default:
        return items
    }
  }

  render() {
    const { todoData, filter } = this.state

    const notDoneCount = todoData.filter((el) => el.done === false).length

    const visibleItems = this.filter(todoData, filter)

    return (
      <section className="todoapp">
        <AppHeader addNewItem={this.addNewItem} />
        <TodoList
          todos={visibleItems}
          onDeleted={this.deletedItem}
          onToggleDone={this.onToggleDone}
          handleEditItem={this.handleEditItem}
        />
        <Footer
          notDoneCount={notDoneCount}
          clearItems={this.clearItems}
          filter={filter}
          onFilterChange={this.onFilterChange}
        />
      </section>
    )
  }
}
