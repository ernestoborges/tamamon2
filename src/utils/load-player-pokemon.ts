import { Server } from 'socket.io'

import supabase from './supabase/basic-client'

interface Pokemon {
  id: string
  hunger: number
  ownerId: string
  lastUpdate: Date
}

const loadPlayerPokemon = async (
  userId: string,
  socketId: string,
  io: Server,
  playerPokemons: Map<string, Pokemon[]>
) => {
  const { data: pokemons, error } = await supabase
    .from('pokemons')
    .select(
      `
      *,
      species: species_id (
        *,
        type_1: type_1 (*),
        type_2: type_2 (*)
      )
    `
    )
    .eq('owner_id', userId)

  if (error) {
    console.error('Error fetching Pokémon:', error)
    return
  }

  playerPokemons.set(socketId, pokemons || [])
  console.log(`Jogador carregado: ${socketId} com pokémon ${pokemons?.[0]?.id}`)
  io.to(socketId).emit('pokemonUpdate', pokemons?.[0])
}

export default loadPlayerPokemon
