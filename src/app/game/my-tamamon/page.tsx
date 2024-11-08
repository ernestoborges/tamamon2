'use client'

import { useEffect, useState } from 'react'
import { useSocketContext } from 'context/socket'

type Pokemon = {
  id: string
  nickname: string
  level: number
  hunger: number
  species: string
}

export default function ClientPage() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [pokemonList, setPokemonList] = useState<Pokemon[] | null>(null)
  const { socket, connected } = useSocketContext()

  useEffect(() => {
    if (socket && connected) {
      socket.on('pokemonUpdate', (data) => {
        setPokemon(data)
      })

      socket.on('pokemonStatusUpdate', (data) => {
        setPokemonList(data)
      })

      return () => {
        socket.off('pokemonUpdate')
      }
    }
  }, [socket, connected])

  return (
    <div>
      <h2>My Pokémon</h2>
      {pokemonList &&
        pokemonList.map((poke, i) => (
          <div key={i}>
            <div>{poke[1].nickname}</div>
            <div>{poke[1].species}</div>
            <div>Nivel: {poke[1].level}</div>
            <div>Fome: {poke[1].hunger}</div>
            <button
              onClick={() => socket && socket.emit('feedPokemon', poke[0])}
            >
              Alimentar
            </button>
          </div>
        ))}
    </div>
  )
}
