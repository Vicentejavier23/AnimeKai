const seriesList = [
  { id: 'naruto', name: 'Naruto', img: '/imagenes/descargar.webp' },
  { id: 'onepiece', name: 'One Piece', img: '/imagenes/4496277.webp' },
  { id: 'dragonball', name: 'Dragon Ball', img: '/imagenes/dragonball.jpg' },
  { id: 'attackontitan', name: 'Attack on Titan', img: '/imagenes/7a0dc24f568b81a39ba1ce797f65d355.jpg' },
  { id: 'hellsing', name: 'Hellsing', img: '/imagenes/hellsing.webp' }
]

export default function Series() {
  return (
    <section id="series" className="container">
      <h2>Series Populares</h2>
      <div className="series-grid">
        {seriesList.map(s => (
          <div key={s.id} className="series-card">
            <img src={s.img} alt={s.name} />
            <h3>{s.name}</h3>
            <a href={`/productos?serie=${s.id}`} className="series-btn">Ver Productos</a>
          </div>
        ))}
      </div>
    </section>
  )
}
