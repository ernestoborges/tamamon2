import supabase from '../utils/supabase/basic-client'
import { Pokemon } from './Pokemon'

export class PokemonManager {
  private pokemons: Map<string, Pokemon> = new Map()
  private hungerQueue: Pokemon[] = []
  private hungerMonitoringInterval: NodeJS.Timeout | null = null
  private pokemonsDatabaseSyncInterval: NodeJS.Timeout | null = null

  constructor() {}

  private startPokemonsDatabaseSync() {
    if (this.pokemons.size === 0) {
      this.stopPokemonsDatabaseSync()
      return
    }
    this.pokemonsDatabaseSyncInterval = setInterval(() => {
      this.pokemons.forEach((pokemon) => pokemon.syncWithDatabase())
    }, 10000)
  }

  private stopPokemonsDatabaseSync() {
    if (this.pokemonsDatabaseSyncInterval) {
      clearInterval(this.pokemonsDatabaseSyncInterval)
      this.pokemonsDatabaseSyncInterval = null
    }
  }

  private startHungerMonitoring() {
    this.hungerMonitoringInterval = setInterval(() => {
      if (this.hungerQueue.length === 0) {
        this.stopHungerMonitoring()
        return
      }

      const pokemon = this.hungerQueue[0]
      if (!this.pokemons.has(pokemon.getId())) {
        this.hungerQueue.shift()
        return
      }

      const currentTime = new Date()
      const lastUpdate = new Date(pokemon.lastHungryUpdate)
      const timeDif = (currentTime.getTime() - lastUpdate.getTime()) / 1000

      if (timeDif >= 10) {
        const minutesPassed = Math.floor(timeDif / 60)
        pokemon.decrementHunger(minutesPassed)

        if (pokemon.getHunger() < 10) {
          pokemon.decrementHappiness(20)
        }

        this.emitPokemonUpdate(pokemon)
        this.hungerQueue.shift()
        this.hungerQueue.push(pokemon)
      }
    }, 1000)
  }

  private stopHungerMonitoring() {
    if (this.hungerMonitoringInterval) {
      clearInterval(this.hungerMonitoringInterval)
      this.hungerMonitoringInterval = null
      console.log('Hunger monitoring stopped.')
    }
  }

  private reorderHungerQueue() {
    this.hungerQueue.sort(
      (a, b) =>
        new Date(a.lastHungryUpdate).getTime() -
        new Date(b.lastHungryUpdate).getTime()
    )
  }

  addPokemonToHungerQueue(pokemon: Pokemon) {
    this.hungerQueue.push(pokemon)
    this.reorderHungerQueue()

    if (!this.hungerMonitoringInterval) {
      this.startHungerMonitoring()
    }

    if (!this.pokemonsDatabaseSyncInterval) {
      this.startPokemonsDatabaseSync()
    }
  }

  removePokemonFromHungerQueue(pokemonId: string) {
    this.hungerQueue = this.hungerQueue.filter(
      (pokemon) => pokemon.getId() !== pokemonId
    )

    if (this.hungerQueue.length === 0 && this.hungerMonitoringInterval) {
      this.stopHungerMonitoring()
    }
  }

  emitPokemonUpdate(pokemon: Pokemon) {
    const { socketId } = pokemon.getOwnerData()
    this.emitPokemonData(socketId)
  }

  emitPokemonData(socketId: string) {
    if (!socketId) return
    const ownerPokemons = this.getOwnerPokemons(socketId)
    const response = ownerPokemons.map(([_, pokemon]) => {
      const stateData = pokemon.getStateData()
      return stateData
    })
    global.io.to(socketId).emit('pokemonData', response)
  }

  async loadPlayerPokemons(id: string, socket: string) {
    try {
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
          if (this.pokemons.has(pokemon.id)) return

          const pokemonObj = new Pokemon(
            socket,
            pokemon.id,
            pokemon.owner_id,
            pokemon.nickname,
            pokemon.level,
            pokemon.hunger,
            pokemon.happiness,
            pokemon.ability,
            pokemon.last_hunger_update,
            pokemon.gender,
            pokemon.species
          )
          this.pokemons.set(pokemon.id, pokemonObj)
          this.addPokemonToHungerQueue(pokemonObj)
        })
      }
    } catch (err) {
      console.error('Unexpected error loading pokemons:', err)
    }
  }

  unloadPlayerPokemons(socketId: string, id?: string) {
    console.log('removendo pokemon de:', socketId, id)

    this.pokemons.forEach((pokemon) => {
      const ownerData = pokemon.getOwnerData()
      if (ownerData.id === id || ownerData.socketId === socketId) {
        this.pokemons.delete(pokemon.getId())
        this.removePokemonFromHungerQueue(pokemon.getId())
      }
    })
  }

  getOwnerPokemons(socketId: string) {
    const response = [...this.pokemons].filter(([_, pokemon]) => {
      const { socketId: ownerSocketId } = pokemon.getOwnerData()
      if (ownerSocketId === socketId) {
        return true
      }
      return false
    })
    return response
  }

  feedPokemon(socketId: string, pokemonId: string, n?: number) {
    const pokemon = this.pokemons.get(pokemonId)

    if (!pokemon) {
      console.error(`Pokemon ${pokemonId} not found`)
      return
    }

    const { socketId: ownerSocketId } = pokemon.getOwnerData()

    if (ownerSocketId !== socketId) {
      console.error(
        `Unauthorized feed attempt by ${socketId} for Pokemon ${pokemonId}`
      )
      return
    }

    pokemon.incrementHunger(n)

    const hunger = pokemon.getHunger()
    if (hunger >= 100) {
      pokemon.decrementHappiness(100)
    } else {
      pokemon.incrementHappiness(30)
    }

    this.reorderHungerQueue()
    this.emitPokemonUpdate(pokemon)
  }
}

const pokemonManager: PokemonManager =
  global.pokemonManager || new PokemonManager()

if (!global.pokemonManager) {
  global.pokemonManager = pokemonManager
}

export default pokemonManager
