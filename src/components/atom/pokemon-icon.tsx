import Image from 'next/image'

export default function PokemonIcon({
  pokemonId,
  isEgg,
  animate,
  height,
  width,
  flip
}: {
  pokemonId: number
  animate?: boolean
  isEgg?: boolean
  height?: number
  width?: number
  flip?: boolean
}) {
  const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${isEgg ? 'egg' : pokemonId}.png`
  return (
    <Image
      className={`object-cover ${animate ? 'animate-wiggle' : ''} ${flip ? '-scale-x-[1]' : ''}`}
      src={url}
      height={height ? height : 30}
      width={width ? width : 30}
      alt={`pokemon icon`}
      unoptimized
    />
  )
}
