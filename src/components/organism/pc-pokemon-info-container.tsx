import { useState } from 'react'
import PokemonIcon from 'components/atom/pokemon-icon'
import { MainInfo } from 'components/molecule/pc-pokemon-main-info'
import { StatsGraphInfo } from 'components/molecule/pc-pokemon-stats-graph'
import { StatsInfo } from 'components/molecule/pc-pokemon-stats-info'
import { Pokemon } from 'types/Pokemon/common'

export function InfoContainer({ pokemon }: { pokemon: Pokemon }) {
  const [selectedOption, setSelectedOption] = useState(1)

  const handleShowOption = (option: number) => {
    switch (option) {
      case 1:
        return <MainInfo pokemon={pokemon} />
      case 2:
        return <StatsInfo pokemon={pokemon} />
      case 3:
        return <StatsGraphInfo pokemon={pokemon} />
      default:
        return <MainInfo pokemon={pokemon} />
    }
  }

  const options = [1, 2, 3]

  console.log(pokemon)
  return (
    <section className='mb-4 flex flex-col gap-2 overflow-hidden rounded-lg bg-token-main-surface-secondary'>
      <div className='flex h-[14rem] w-[20rem] flex-col'>
        {!pokemon ? (
          'loading'
        ) : (
          <>
            <div className='flex items-center gap-2 border-b border-token-main-surface-tertiary px-2 text-sm'>
              <div className='flex h-[30px] w-[30px] items-center justify-center'>
                <PokemonIcon pokemonId={pokemon.species.pokedex_index} flip />
              </div>
              <div className='grow'>{pokemon.nickname}</div>
              <div>Lv. {pokemon.level}</div>
            </div>
            <div className='h-full w-full p-2'>
              {pokemon && handleShowOption(selectedOption)}
            </div>
          </>
        )}
      </div>
      <div className='flex border-t border-token-main-surface-tertiary'>
        {options.map((option, i) => (
          <div
            key={i}
            onClick={() => setSelectedOption(option)}
            className={`relative top-[-1px] flex w-[2.6rem] items-center justify-center border-r border-t border-token-main-surface-tertiary ${option === selectedOption ? 'border-t-token-main-surface-secondary' : 'border-t-token-main-surface-tertiary'} cursor-pointer ${i + 1 !== selectedOption ? 'hover:bg-token-main-surface-primary' : ''}`}
          >
            {option}
          </div>
        ))}
      </div>
    </section>
  )
}
