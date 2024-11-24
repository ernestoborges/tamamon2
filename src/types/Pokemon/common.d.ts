export type Species = {
  id: string
  name: string
  description: string
  height: number
  weight: number
  base_hp: number
  base_atk: number
  base_def: number
  base_sp_atk: number
  base_sp_def: number
  base_spd: number
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

export type Pokemon = {
  id: string
  nickname: string
  level: number
  hunger: number
  happiness: number
  species: Species
  scalar_height: number
  scalar_weight: number
  gender: 'male' | 'female' | null
  shiny: boolean
  is_egg: boolean
  iv_hp: number
  iv_atk: number
  iv_def: number
  iv_sp_atk: number
  iv_sp_def: number
  iv_spd: number
  ev_hp: number
  ev_atk: number
  ev_def: number
  ev_sp_atk: number
  ev_sp_def: number
  ev_spd: number
  current_hp: number
  original_trainer: { name: string }
  nature: { name: Nature }
}

export type Nature =
  | 'Hardy'
  | 'Lonely'
  | 'Brave'
  | 'Adamant'
  | 'Naughty'
  | 'Bold'
  | 'Docile'
  | 'Relaxed'
  | 'Impish'
  | 'Lax'
  | 'Hasty'
  | 'Timid'
  | 'Hasty'
  | 'Serious'
  | 'Jolly'
  | 'Naive'
  | 'Modest'
  | 'Mild'
  | 'Quiet'
  | 'Bashful'
  | 'Rash'
  | 'Calm'
  | 'Gentle'
  | 'Sassy'
  | 'Careful'
  | 'Quirky'
  | 'Max'
