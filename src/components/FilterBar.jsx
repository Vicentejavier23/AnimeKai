export default function FilterBar({ filter, setFilter }) {
  const filters = ['all', 'figuras', 'mangas', 'ropa', 'accesorios']
  return (
    <div className="filters">
      {filters.map(f => (
        <button
          key={f}
          className={`filter-btn ${filter === f ? 'active' : ''}`}
          onClick={() => setFilter(f)}
        >
          {f === 'all' ? 'Todos' : f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  )
}
