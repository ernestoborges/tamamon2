type PokemonTypeLabelProps = {
  type: string
  height?: number
  width?: number
  fontSize?: string
  letterSpacing?: string
}
export function PokemonTypeLabel({
  type,
  width,
  height,
  fontSize,
  letterSpacing
}: PokemonTypeLabelProps) {
  return (
    <div
      className='text-[0.6rem] font-bold uppercase'
      style={{
        width: width ? `${width}px` : '80px',
        height: height ? `${width}px` : '24px',
        fontSize: fontSize ? fontSize : '0.6rem',
        letterSpacing: letterSpacing ? letterSpacing : '0.1rem'
      }}
    >
      {type !== 'default' && (
        <div
          className={`flex justify-center overflow-hidden rounded-lg p-1 pl-2 pr-2`}
          style={{ background: `var(--type-${type.toLowerCase()})` }}
        >
          {type === 'default' ? '' : type}
        </div>
      )}
    </div>
  )
}
