import Image from 'next/image'
import { Pokemon } from 'types/Pokemon/common'

type PokemonPortraitProps = {
  pokemon: Pokemon
  height?: number
  width?: number
}
export default function PokemonPortrait({
  pokemon,
  height,
  width
}: PokemonPortraitProps) {
  const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.is_egg ? 'egg' : pokemon.species.pokedex_index}.png`
  return (
    <>
      <div className='flex items-center justify-center rounded-lg border-white bg-token-main-surface-tertiary p-1'>
        <div className='h-[6rem] w-[6rem] rounded-lg border-white bg-token-main-surface-primary'>
          {pokemon && (
            <Image
              className='-scale-x-[1]'
              src={url}
              height={height ? height : 100}
              width={width ? width : 100}
              alt={`${pokemon.species.name} image`}
            />
          )}
        </div>
      </div>
    </>
  )
}
