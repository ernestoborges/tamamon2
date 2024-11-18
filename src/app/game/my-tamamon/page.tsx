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
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const { socket, connected } = useSocketContext()

  useEffect(() => {
    if (socket && connected) {
      socket.on('pokemonData', (data) => {
        setPokemonList(data)
      })

      return () => {
        socket.off('pokemonData')
      }
    }
  }, [socket, connected])

  useEffect(() => {
    if (pokemonList.length <= 0) {
      socket?.emit('getPokemons')
    }
  }, [])

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
            <div>Felicidade: {poke[1].happiness}</div>
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
