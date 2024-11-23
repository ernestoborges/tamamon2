type PokemonBasicCardProps = {
  name: string
  iconNumber: number
  borderColor?: string
  onclick?: (n: number) => void
}
export default function PokemonBasicCard({
  name,
  iconNumber,
  borderColor,
  onclick
}: PokemonBasicCardProps) {
  return (
    <div
      onClick={() => onclick && onclick(iconNumber)}
      className={`flex h-36 w-36 cursor-pointer flex-col items-center gap-2 rounded-lg border border-white p-2 ${onclick ? 'hover:bg-token-main-surface-tertiary' : ''}`}
      style={{
        borderColor: borderColor ? borderColor : 'white'
      }}
    >
      <div className='flex grow items-center justify-center'>
        <img
          src={`/pokemons/gifs/${iconNumber}.gif`}
          alt={`Image of ${name}`}
        />
      </div>
      <div className=''>{name}</div>
    </div>
  )
}
