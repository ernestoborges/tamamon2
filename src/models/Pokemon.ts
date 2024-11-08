// Pokemon.ts

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
    private ability: string,
    public lastHungryUpdate: string,
    //
    private gender: 'male' | 'female' | null,
    private species: string,
    private type1: string,
    private type2: string,
    private habitat: string,
    private isLegendary: boolean
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

  getHunger(): number {
    return this.hunger
  }

  async syncWithDatabase() {
    const { error } = await supabase
      .from('pokemons')
      .update({
        nickname: this.nickname,
        level: this.level,
        hunger: this.hunger,
        ability: this.ability
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
      socket: this.ownerSocket
    }
  }

  public getStateData() {
    return {
      id: this.id,
      nickname: this.nickname,
      level: this.level,
      hunger: this.hunger,
      ability: this.ability,
      gender: this.gender,
      species: this.species,
      type1: this.type1,
      type2: this.type2,
      habitat: this.habitat,
      isLegendary: this.isLegendary
    }
  }
}
