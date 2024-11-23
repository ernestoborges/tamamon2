import { NextApiRequest, NextApiResponse } from 'next'
import supabase from 'utils/supabase/basic-client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, option } = req.body

  if (option !== 1 && option !== 4 && option !== 7)
    return res.status(403).json({ message: 'Invalid option' })

  if (!userId) return res.status(403).json({ message: 'Missing userId' })

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (!user) return res.status(403).json({ message: 'Error1' })
  if (!user.is_new_account) return res.status(403).json({ message: 'Error2' })

  const { data: species } = await supabase
    .from('species')
    .select('*')
    .eq('pokedex_index', option)
    .single()

  if (!species) return res.status(500).json({ message: 'Error3' })

  const { data: natures } = await supabase.from('natures').select('*')

  if (!natures) return res.status(500).json({ message: 'Error4' })

  const randomNatureIndex = Math.floor(Math.random() * natures.length)

  const isShiny = Math.floor(Math.random() * 450) + 1 === 1
  const scalarHeight =
    Math.floor(Math.random() * 128) + Math.floor(Math.random() * 129)
  const scalarWeight =
    Math.floor(Math.random() * 128) + Math.floor(Math.random() * 129)
  const randomIVs = {
    hp: Math.floor(Math.random() * 32),
    atk: Math.floor(Math.random() * 32),
    def: Math.floor(Math.random() * 32),
    sp_atk: Math.floor(Math.random() * 32),
    sp_def: Math.floor(Math.random() * 32),
    speed: Math.floor(Math.random() * 32)
  }

  const newPokemon = {
    owner_id: user.id,
    species_id: species.id,
    nickname: species.name,
    ability: species.ability_1,
    nature_id: natures[randomNatureIndex].id,
    gender:
      species.gender === -1
        ? 'none'
        : Math.floor(Math.random() * 8 + 1) > species.gender
          ? 'male'
          : 'female',
    shiny: isShiny,
    is_egg: true,
    iv_hp: randomIVs.hp,
    iv_atk: randomIVs.atk,
    iv_def: randomIVs.def,
    iv_sp_atk: randomIVs.sp_atk,
    iv_sp_def: randomIVs.sp_def,
    iv_spd: randomIVs.speed,
    scalar_height: scalarHeight,
    scalar_weight: scalarWeight
  }

  const { error: savePokemonError } = await supabase
    .from('pokemons')
    .insert([newPokemon])

  if (savePokemonError) return res.status(500).json({ message: 'Error5' })

  const { error: updateUserError } = await supabase
    .from('users')
    .update({
      is_new_account: false
    })
    .eq('id', user.id)
  if (updateUserError) return res.status(500).json({ message: 'Error6' })

  return res.status(200).json({ message: 'ok' })
}
