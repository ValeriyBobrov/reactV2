import React, { useState } from 'react'

import AppHeader from '../app-header'
import TodoList from '../todo-list'
import Footer from '../footer'

function App() {
  const [todoData, setTodoData] = useState([])
  const [filterData, setFilter] = useState('all')
  const [maxId, setMaxId] = useState(100)

  const clearItems = () => {
    setTodoData([])
  }

  const deletedItem = (id) => {
    setTodoData((prevTodoData) => prevTodoData.filter((item) => item.id !== id))
  }

  const onToggleDone = (id) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((todoItem) => (todoItem.id === id ? { ...todoItem, done: !todoItem.done } : todoItem))
    )
  }

  const onFilterChange = (filter) => {
    setFilter(filter)
  }

  const handleEditItem = (id, editedDescription) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((todoItem) => (todoItem.id === id ? { ...todoItem, description: editedDescription } : todoItem))
    )
  }

  const createTodoItem = (text, minutes, seconds) => {
    const newTodoItem = {
      description: text,
      minutes,
      seconds,
      id: maxId,
      done: false,
    }
    setMaxId(maxId + 1)
    return newTodoItem
  }

  const addNewItem = (text, minutes, seconds) => {
    if (text.trim().length === 0) {
      return
    }

    const newItem = createTodoItem(text, minutes, seconds)
    setTodoData([...todoData, newItem])
  }

  const filterItems = (items, filter) => {
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

  const notDoneCount = todoData.filter((el) => !el.done).length
  const visibleItems = filterItems(todoData, filterData)

  return (
    <section className="todoapp">
      <AppHeader addNewItem={addNewItem} />
      <TodoList
        todos={visibleItems}
        onDeleted={deletedItem}
        onToggleDone={onToggleDone}
        handleEditItem={handleEditItem}
        filterData={filterData}
      />
      <Footer notDoneCount={notDoneCount} clearItems={clearItems} filter={filterData} onFilterChange={onFilterChange} />
    </section>
  )
}

export default App
