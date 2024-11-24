import { PokemonTypeLabel } from 'components/atom/pokemon-type-label'
import { Pokemon } from 'types/Pokemon/common'
import {
  getPokemonHeight,
  getPokemonSizeTag,
  getPokemonWeight
} from 'utils/pokemon-size-calc'

import PokemonPortrait from './pc-pokemon-portrait'

export function MainInfo({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className='flex flex-grow flex-col'>
      <div className='flex items-start justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <PokemonPortrait pokemon={pokemon} width={100} height={100} />
          <div className='flex flex-col items-center justify-between'>
            {pokemon.species.type_2 ? (
              <>
                <PokemonTypeLabel type={pokemon.species.type_1.name} />
                <PokemonTypeLabel type={pokemon.species.type_2.name} />
              </>
            ) : (
              <>
                <PokemonTypeLabel type={pokemon.species.type_1.name} />
                <PokemonTypeLabel type='default' />
              </>
            )}
          </div>
        </div>
        <div className='flex-1 text-sm'>
          <ul className='flex h-full flex-col justify-center'>
            <li className='flex justify-between capitalize'>
              <span>Pokédex:</span>
              {pokemon.species.pokedex_index}
            </li>
            <li className='flex justify-between capitalize'>
              <span>Natureza:</span>
              {pokemon.nature.name}
            </li>
            <li className='flex justify-between capitalize'>
              <span>TO:</span>
              {pokemon.original_trainer.name}
            </li>
            <li className='flex justify-between'>
              <span>Nível:</span>
              {pokemon.level}
            </li>
            <li className='flex justify-between'>
              <span>Espécie:</span>
              <span className='capitalize'>{pokemon.species.name}</span>
            </li>
            <li className='flex justify-between'>
              <span>Altura:</span>
              <span>{`${getPokemonHeight(pokemon.scalar_height, pokemon.species.height).toFixed(2)} m`}</span>
            </li>
            <li className='flex justify-between'>
              <span>Peso:</span>
              <span>{`${getPokemonWeight(pokemon.scalar_weight, pokemon.scalar_height, pokemon.species.weight).toFixed(2)} kg`}</span>
            </li>
            <li className='flex justify-between'>
              <span>Tamanho:</span>
              <span>{getPokemonSizeTag(pokemon.scalar_height)}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
