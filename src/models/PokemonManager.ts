import supabase from '../utils/supabase/basic-client'
import { Pokemon } from './Pokemon'

export class PokemonManager {
  private pokemons: Map<string, Pokemon> = new Map()

  constructor() {}

  private startHungerMonitoring(pokemon: Pokemon) {
    setInterval(() => {
      const currentTime = new Date()
      const lastUpdate = new Date(pokemon.lastHungryUpdate)
      const timeDif = (currentTime.getTime() - lastUpdate.getTime()) / 1000

      if (timeDif >= 10) {
        const minutesPassed = Math.floor(timeDif / 60)
        pokemon.decrementHunger(minutesPassed)
        this.emitPokemonUpdate(pokemon)
      }
    }, 1000)
  }

  private emitPokemonUpdate(pokemon: Pokemon) {
    const { id, socket } = pokemon.getOwnerData()
    const ownerPokemons = this.getOwnerPokemons(id, socket)
    console.log('emitindo para:', socket)
    global.io.to(socket).emit('pokemonStatusUpdate', ownerPokemons)
  }

  async loadPlayerPokemons(id: string, socket: string) {
    const { data: pokemons } = await supabase
      .from('pokemons')
      .select(
        `*,
      species: species_id (
        *,
        type_1: type_1 (*),
        type_2: type_2 (*)
      )`
      )
      .eq('owner_id', id)

    if (pokemons) {
      pokemons.forEach((pokemon) => {
        const pokemonObj = new Pokemon(
          socket,
          pokemon.id,
          pokemon.owner_id,
          pokemon.nickname,
          pokemon.level,
          pokemon.hunger,
          pokemon.ability,
          pokemon.last_hunger_update,
          pokemon.gender,
          pokemon.species.name,
          pokemon.species.type_1,
          pokemon.species.type_2,
          pokemon.species.habitat,
          pokemon.species.isLegendary
        )
        this.pokemons.set(pokemon.id, pokemonObj)
        console.log(`[Pokemon added][${pokemon.id}]`)
        this.startHungerMonitoring(pokemonObj)
      })
    }
  }

  unloadPlayerPokemons(id: string, socket: string) {
    this.pokemons.forEach(async (pokemon) => {
      const ownerData = pokemon.getOwnerData()
      if (ownerData.id === id && ownerData.socket === socket) {
        await pokemon.syncWithDatabase()
        this.pokemons.delete(pokemon.getId())
      }
    })
  }

  getOwnerPokemons(ownerId: string, socketId: string) {
    const response = [...this.pokemons].filter(([_, pokemon]) => {
      const { id, socket } = pokemon.getOwnerData()
      if (ownerId === id && socket === socketId) {
        return true
      }
      return false
    })
    return response
  }

  feedPokemon(socket: string, pokemonId: string, n?: number) {
    const pokemon = this.pokemons.get(pokemonId)
    if (pokemon) {
      pokemon.incrementHunger(n)
    }
  }
}

const pokemonManager: PokemonManager =
  global.pokemonManager || new PokemonManager()

if (!global.pokemonManager) {
  global.pokemonManager = pokemonManager
}

export default pokemonManager
