export type Species = {
  id: string
  name: string
  description: string
  height: number
  weight: number
  base_hp: number
  base_attack: number
  base_defense: number
  base_speed: number
  type_1: Type
  type_2: Type
  evolution_stage: number
  evolves_from: string
  habitat: string
  is_legendary: boolean
  generation: number
  pokedex_index: number
}

export type Type = {
  id: string
  name: string
  description: string
}
