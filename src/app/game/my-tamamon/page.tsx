'use client'

import { useEffect, useState } from 'react'
import PokemonCanva from 'components/molecule/pokemon-canva'
import { useSocketContext } from 'context/socket'
import { Species } from 'types/Pokemon/common'

type Pokemon = {
  id: string
  nickname: string
  level: number
  hunger: number
  happiness: number
  species: Species
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
        pokemonList.map((poke, i) => {
          console.log(poke)
          return (
            <div key={i}>
              <PokemonCanva pokemonId={poke.species.pokedex_index} />
              <div>{poke.nickname}</div>
              <div>{poke.species.name}</div>
              <div>Nivel: {poke.level}</div>
              <div>Fome: {poke.hunger}</div>
              <div>Felicidade: {poke.happiness}</div>
              <button
                onClick={() => socket && socket.emit('feedPokemon', poke.id)}
              >
                Alimentar
              </button>
            </div>
          )
        })}
    </div>
  )
}
