'use client'

import { useEffect, useState } from 'react'
import PokemonIcon from 'components/atom/pokemon-icon'
import { InfoContainer } from 'components/organism/pc-pokemon-info-container'
import { useAuth } from 'context/auth-context'
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi'
import { Pokemon } from 'types/Pokemon/common'
import { createClient } from 'utils/supabase/client'

export default function MyPcPage() {
  const auth = useAuth()
  const session = auth?.session

  const [loaded, setIsLoaded] = useState(false)
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [page, setPage] = useState<number>(0)
  const [selectedCell, setSelectedCell] = useState<number>(0)
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>(pokemons[0])

  function handleBackward() {
    if (page > 0) {
      setPage(page - 1)
    }
  }

  function handleForward() {
    if (page < arr.length - 1) {
      setPage(page + 1)
    }
  }

  const handleCellClick = (index: number) => {
    setSelectedCell(page + index)
    setSelectedPokemon(pokemons[page + index])
  }

  const arr = [
    [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30
    ],
    [
      31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
      49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60
    ],
    [
      61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
      79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90
    ]
  ]

  async function getPokemons() {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('pokemons')
      .select(
        `*,
    species: species_id (
      *,
      type_1: type_1 (*),
      type_2: type_2 (*)
    ),
    nature: nature_id (
      name
    ),
    original_trainer: original_trainer (
      name
    )
    `
      )
      .eq('owner_id', session?.user.id)
    if (!error) {
      setPokemons(data)
      setSelectedPokemon(data[0])
      setIsLoaded(true)
    }
  }

  useEffect(() => {
    if (session && !loaded) {
      getPokemons()
    }
  }, [session])

  return (
    <div>
      <h2>Meu PC</h2>
      <div>
        <section className='flex w-full flex-col items-center justify-center'>
          <InfoContainer pokemon={selectedPokemon} />
          <div className='w-[20rem]'>
            <div className='mb-4 flex w-full justify-around bg-token-main-surface-secondary'>
              <button
                className='flex grow items-center justify-center p-2 hover:bg-token-main-surface-tertiary'
                onClick={() => handleBackward()}
              >
                <BiSolidLeftArrow />
              </button>
              <div className='flex grow items-center justify-center'>{`Box ${page + 1}`}</div>
              <button
                className='flex grow items-center justify-center p-2 hover:bg-token-main-surface-tertiary'
                onClick={() => handleForward()}
              >
                <BiSolidRightArrow />
              </button>
            </div>
            <div className='bg-token-main-surface-primary'>
              <ul className='grid grid-cols-6 gap-1'>
                {arr[page].map((_, i) => (
                  <li
                    key={i}
                    className={`h-[3rem] w-[3rem] rounded-2xl bg-token-main-surface-secondary p-1`}
                    style={{
                      border: `0.1rem solid ${selectedCell === page + i ? 'white' : 'transparent'}`
                    }}
                  >
                    {pokemons.length > page * 30 + i && (
                      <div
                        className='flex h-full w-full items-center justify-center'
                        onClick={() => handleCellClick(i)}
                      >
                        <PokemonIcon
                          width={40}
                          height={40}
                          pokemonId={pokemons[page + i].species.pokedex_index}
                          isEgg={pokemons[page + i].is_egg}
                          animate={selectedCell === page * 30 + i}
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
