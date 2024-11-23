import { FormEvent, useState } from 'react'
import Button from 'components/atom/button'
import PokemonBasicCard from 'components/molecule/PokemonCards/basic'
import { useAccountContext } from 'context/account'
import { useAuth } from 'context/auth-context'

export default function InitialChoiceForm() {
  const auth = useAuth()
  const session = auth?.session
  const { updateAccountData } = useAccountContext()

  const [selected, setSelected] = useState(-1)

  function handleClick(n: number) {
    setSelected(n)
  }

  function onsubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (selected === 1 || selected === 4 || selected === 7)
      selectPokemon(selected)
  }

  async function selectPokemon(option: 1 | 4 | 7) {
    const response = await fetch('/api/handle-new-account', {
      method: 'POST',
      body: JSON.stringify({ userId: session?.user.id, option: option }),
      headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) {
      updateAccountData({ isNewAccount: false })
    }
  }

  return (
    <div className='bg-red flex h-full w-full flex-col items-center gap-4'>
      <div>Escolher pokemon inicial</div>
      <div className='flex gap-2'>
        <PokemonBasicCard
          name='Bulbassaur'
          iconNumber={1}
          borderColor={selected === 1 ? 'blue' : undefined}
          onclick={handleClick}
        />
        <PokemonBasicCard
          name='Charmander'
          iconNumber={4}
          borderColor={selected === 4 ? 'blue' : undefined}
          onclick={handleClick}
        />
        <PokemonBasicCard
          name='Squirtle'
          iconNumber={7}
          borderColor={selected === 7 ? 'blue' : undefined}
          onclick={handleClick}
        />
      </div>
      <form onSubmit={onsubmit}>
        <Button>Escolher</Button>
      </form>
    </div>
  )
}
