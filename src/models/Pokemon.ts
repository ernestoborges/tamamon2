// Pokemon.ts

import { Species } from 'types/Pokemon/common'

import supabase from '../utils/supabase/basic-client'

export class Pokemon {
  private lastSyncTime: Date

  constructor(
    private ownerSocket: string,
    private id: string,
    private ownerId: string,
    // dynamic
    private nickname: string,
    private level: number,
    private hunger: number,
    private happiness: number,
    private ability: string,
    public lastHungryUpdate: string,
    //
    private gender: 'male' | 'female' | null,
    private species: Species
  ) {
    this.lastSyncTime = new Date()
  }

  decrementHunger(n?: number) {
    if (n && n > 0) {
      this.hunger = Math.max(0, this.hunger - n)
    } else if (this.hunger > 0) {
      this.hunger -= 1
    }
    this.lastHungryUpdate = new Date().toISOString()
  }

  incrementHunger(n?: number) {
    if (n && n > 0) {
      this.hunger += Math.min(100, n)
    } else {
      this.hunger += 1
    }
    this.lastHungryUpdate = new Date().toISOString()
  }

  decrementHappiness(n?: number) {
    if (n && n > 0) {
      this.happiness = Math.max(0, this.happiness - n)
    } else if (this.happiness > 0) {
      this.happiness -= 1
    }
  }

  incrementHappiness(n?: number) {
    if (n && n > 0) {
      this.happiness += Math.min(1000, n)
    } else {
      this.happiness += 1
    }
  }

  getHunger(): number {
    return this.hunger
  }

  getHappiness(): number {
    return this.happiness
  }

  async syncWithDatabase() {
    const { error } = await supabase
      .from('pokemons')
      .update({
        nickname: this.nickname,
        level: this.level,
        hunger: this.hunger,
        ability: this.ability,
        happiness: this.happiness
      })
      .eq('id', this.id)

    if (error) {
      console.error(`Erro ao sincronizar Pokémon ${this.id}:`, error)
    } else {
      console.log(`Pokémon ${this.id} sincronizado com o banco de dados.`)
      this.lastSyncTime = new Date()
    }
  }

  public getId(): string {
    return this.id
  }

  public getOwnerData() {
    return {
      id: this.ownerId,
      socketId: this.ownerSocket
    }
  }

  public getStateData() {
    return {
      id: this.id,
      nickname: this.nickname,
      level: this.level,
      hunger: this.hunger,
      happiness: this.happiness,
      ability: this.ability,
      gender: this.gender,
      species: {
        type1: this.species.type_1,
        type2: this.species.type_2,
        habitat: this.species.habitat,
        isLegendary: this.species.is_legendary,
        pokedex_index: this.species.pokedex_index
      }
    }
  }
}
