import { useEffect, useState } from 'react'
import './App.css'

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=24'
const SPRITES_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

function getId(url) {
  return Number(url.split('/').filter(Boolean).at(-1))
}

function App() {
  const [pokemon, setPokemon] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => setPokemon(data.results))
      .catch((err) => {
        if (err.name !== 'AbortError') setError(true)
      })

    return () => controller.abort()
  }, [])

  if (error) return <p className="status">No se pudo cargar la Pokédex.</p>
  if (pokemon.length === 0) return <p className="status">Cargando…</p>

  return (
    <main>
      <h1>Pokédex</h1>
      <img src={`${SPRITES_URL}/25.png`} width="96" height="96" />
      <ul className="grid">
        {pokemon.map((p) => {
          const id = getId(p.url)
          return (
            <li key={id} className="card">
              <img
                src={`${SPRITES_URL}/${id}.png`}
                alt={p.name}
                width="96"
                height="96"
                loading="lazy"
              />
              <span className="number">#{String(id).padStart(3, '0')}</span>
              <span className="name">{p.name}</span>
            </li>
          )
        })}
      </ul>
    </main>
  )
}

export default App
