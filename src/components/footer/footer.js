import React from 'react'

import FooterFilter from '../footer-filter'

function Footer({ notDoneCount, clearItems, filter, onFilterChange }) {
  return (
    <footer className="footer">
      <span className="todo-count">{notDoneCount} items left</span>
      <FooterFilter filter={filter} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={clearItems}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
