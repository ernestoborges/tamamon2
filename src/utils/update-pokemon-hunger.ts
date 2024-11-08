import { Server } from 'socket.io'

import supabase from './supabase/basic-client'

interface Pokemon {
  id: string
  hunger: number
  last_hunger_update: string | number | Date
}

export const feedPokemon = async (pokemonId: string, qtd: number) => {
  try {
    const { data: pokemon, error: fetchError } = await supabase
      .from('pokemons')
      .select('*')
      .eq('id', pokemonId)
      .single()

    if (fetchError) {
      console.error('Erro ao buscar Pokémon:', fetchError)
      return null
    }

    if (!pokemon) {
      console.log('Pokémon não encontrado')
      return null
    }

    const newHunger = Math.min(pokemon.hunger + qtd, 100)
    console.log('Nova fome:', newHunger)

    const { data: updatedPokemon, error: updateError } = await supabase
      .from('pokemons')
      .update({
        hunger: newHunger,
        last_hunger_update: new Date()
      })
      .eq('id', pokemon.id)
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
      .single()

    console.log(updatedPokemon)
    console.log(updatedPokemon.hunger)
    if (updateError) {
      console.error('Erro ao atualizar Pokémon:', updateError)
      return null
    }

    return updatedPokemon
  } catch (error) {
    console.error('Erro ao alimentar Pokémon:', error)
    return null
  }
}

export const updatePokemonsHunger = (
  io: Server,
  playerPokemons: Map<string, Pokemon[]>
) => {
  playerPokemons.forEach((pokemons, socketId) => {
    pokemons.forEach(async (pokemon) => {
      const currentTime = new Date()

      if (!pokemon.last_hunger_update) {
        pokemon.last_hunger_update = currentTime
        await supabase
          .from('pokemons')
          .update({ last_hunger_update: pokemon.last_hunger_update })
          .eq('id', pokemon.id)
        return
      }

      const timeDiff = Math.floor(
        (currentTime.getTime() -
          new Date(pokemon.last_hunger_update).getTime()) /
          1000
      )

      if (timeDiff >= 60) {
        const minutesPassed = Math.floor(timeDiff / 60)
        const newHunger = Math.max(pokemon.hunger - minutesPassed, 0)

        pokemon.hunger = newHunger
        pokemon.last_hunger_update = new Date(
          currentTime.getTime() - (timeDiff - minutesPassed)
        ).toISOString()

        await supabase
          .from('pokemons')
          .update({
            hunger: pokemon.hunger,
            last_hunger_update: pokemon.last_hunger_update
          })
          .eq('id', pokemon.id)

        io.to(socketId).emit('pokemonUpdate', pokemon)
      }
    })
  })
}
