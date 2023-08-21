import React from 'react'

import TodoListItem from '../todo-list-item'

function TodoList({ todos, onDeleted, onToggleDone, handleEditItem }) {
  const elements = todos.map((item) => (
    <TodoListItem
      description={item.description}
      minutes={item.minutes}
      seconds={item.seconds}
      id={item.id}
      key={item.id}
      done={item.done}
      onDeleted={() => onDeleted(item.id)}
      onToggleDone={() => onToggleDone(item.id)}
      handleEditItem={handleEditItem}
    />
  ))

  return (
    <section className="main">
      <ul className="todo-list">{elements}</ul>
    </section>
  )
}

export default TodoList
