import React from 'react'

function FooterFilter({ filter, onFilterChange }) {
  const buttons = [
    { name: 'all', label: 'all' },
    { name: 'active', label: 'active' },
    { name: 'completed', label: 'completed' },
  ]

  const renderedButtons = buttons.map(({ name, label }) => {
    const isActive = filter === name
    const clazz = isActive ? 'selected' : ''

    return (
      <li key={name}>
        <button type="button" className={clazz} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    )
  })

  return <ul className="filters">{renderedButtons}</ul>
}

export default FooterFilter
