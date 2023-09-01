import React from 'react'

import TodoListItem from '../todo-list-item'

function TodoList({ todos, onDeleted, onToggleDone, handleEditItem, filterData }) {
  const elements = todos.map((item) => (
    <TodoListItem
      description={item.description}
      minutesData={item.minutes}
      secondsData={item.seconds}
      id={item.id}
      key={item.id}
      done={item.done}
      onDeleted={() => onDeleted(item.id)}
      onToggleDone={() => onToggleDone(item.id)}
      handleEditItem={handleEditItem}
      filterData={filterData}
    />
  ))

  return (
    <section className="main">
      <ul className="todo-list">{elements}</ul>
    </section>
  )
}

export default TodoList
