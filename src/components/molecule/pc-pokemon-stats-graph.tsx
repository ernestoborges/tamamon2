import { Pokemon } from 'types/Pokemon/common'
import { getStats } from 'utils/pokemon-stats-calc'

interface IStatList {
  hp: number
  atk: number
  def: number
  sp_atk: number
  sp_def: number
  speed: number
}

export function StatsGraphInfo({ pokemon }: { pokemon: Pokemon }) {
  const base = {
    hp: pokemon.species.base_hp,
    atk: pokemon.species.base_atk,
    def: pokemon.species.base_def,
    sp_atk: pokemon.species.base_sp_atk,
    sp_def: pokemon.species.base_sp_def,
    speed: pokemon.species.base_spd
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <PokemonGraph pokemon={pokemon} base={base} />
    </div>
  )
}

function KiteGraph({
  stat,
  max,
  color,
  zIndex
}: {
  stat: IStatList
  max: IStatList
  color: string
  zIndex: number
}) {
  return (
    <div
      className={`absolute left-[50%] top-[50%] h-[calc(6.4rem*0.866)] w-[6.4rem] translate-x-[-50%] translate-y-[-50%]`}
      style={{
        zIndex: zIndex,
        backgroundColor: color,
        clipPath:
          'polygon(' +
          (45 + (-20 * stat.sp_atk) / max.sp_atk) +
          '% ' +
          (40 + (-40 * stat.sp_atk) / max.sp_atk) +
          '%, ' +
          (55 + (20 * stat.hp) / max.hp) +
          '% ' +
          (40 + (-40 * stat.hp) / max.hp) +
          '%, ' +
          (60 + (40 * stat.atk) / max.atk) +
          '% ' +
          (50 + 0) +
          '%, ' +
          (55 + (20 * stat.def) / max.def) +
          '% ' +
          (60 + (40 * stat.def) / max.def) +
          '%, ' +
          (45 + (-20 * stat.speed) / max.speed) +
          '% ' +
          (60 + (40 * stat.speed) / max.speed) +
          '%, ' +
          (40 + (-40 * stat.sp_def) / max.sp_def) +
          '% ' +
          (50 + 0) +
          '%)'
      }}
    />
  )
}

function PokemonGraph({
  pokemon,
  base
}: {
  pokemon: Pokemon
  base: {
    hp: number
    atk: number
    def: number
    sp_atk: number
    sp_def: number
    speed: number
  }
}) {
  const maxIv = {
    hp: 31,
    atk: 31,
    def: 31,
    sp_atk: 31,
    sp_def: 31,
    speed: 31
  }
  const maxEv = {
    hp: 255,
    atk: 255,
    def: 255,
    sp_atk: 255,
    sp_def: 255,
    speed: 255
  }

  const ivs = {
    hp: pokemon.iv_hp,
    atk: pokemon.iv_atk,
    def: pokemon.iv_def,
    sp_atk: pokemon.iv_sp_atk,
    sp_def: pokemon.iv_sp_def,
    speed: pokemon.iv_spd
  }

  const evs = {
    hp: pokemon.ev_hp,
    atk: pokemon.ev_atk + 255,
    def: pokemon.ev_def,
    sp_atk: pokemon.ev_sp_atk,
    sp_def: pokemon.ev_sp_def,
    speed: pokemon.ev_spd + 255
  }

  const pokemonLv = pokemon.level + 100

  const maxStats = getStats(100, base, maxIv, maxEv, 'Max')
  const currentStats = getStats(pokemonLv, base)
  const stats = getStats(pokemonLv, base)
  const ivStats = getStats(pokemonLv, base, ivs)
  const evStats = getStats(pokemonLv, base, ivs, evs)

  console.log(maxStats.hp, stats.hp, stats.hp, ivStats.hp)

  return (
    <div className='flex h-[11rem] w-[11rem] items-center justify-center'>
      <div className='flex -rotate-[30deg] justify-center'>
        <div className='relative h-[calc(6.4rem*0.866)] w-[6.4rem]'>
          <KiteGraph stat={maxStats} max={maxStats} color='gray' zIndex={1} />
          <KiteGraph stat={evStats} max={maxStats} color='orange' zIndex={2} />
          <KiteGraph stat={ivStats} max={maxStats} color='yellow' zIndex={3} />
          <KiteGraph stat={stats} max={maxStats} color='cyan' zIndex={4} />
          <div>
            <div className='absolute left-[50%] top-[50%] z-10 w-[97%] -translate-x-[50%] -translate-y-[50%] border-b border-black opacity-10' />
            <div className='absolute left-[50%] top-[50%] z-10 w-[97%] -translate-x-[50%] -translate-y-[50%] rotate-[-120deg] border-b border-black opacity-10' />
            <div className='absolute left-[50%] top-[50%] z-10 w-[97%] -translate-x-[50%] -translate-y-[50%] rotate-[120deg] border-b border-black opacity-10' />
          </div>
          <div className='h-full w-full rotate-[30deg]'>
            <Label top='-30%' left='50%' name='HP' value={currentStats.hp} />
            <Label top='10%' left='110%' name='Atk' value={currentStats.atk} />
            <Label top='94%' left='110%' name='Def' value={currentStats.def} />
            <Label
              top='130%'
              left='50%'
              name='Speed'
              value={currentStats.speed}
            />
            <Label
              top='94%'
              left='-15%'
              name='Sp.Atk'
              value={currentStats.sp_atk}
            />
            <Label
              top='10%'
              left='-15%'
              name='Sp.Def'
              value={currentStats.sp_def}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function Label({
  name,
  value,
  top,
  left
}: {
  name: string
  value: number
  top: string
  left: string
}) {
  return (
    <div
      className='absolute z-10 flex translate-x-[-50%] translate-y-[-50%] flex-col items-center gap-1 text-[12px]'
      style={{ top: top, left: left }}
    >
      <span
        className='text-token-text-secondary'
        style={{ lineHeight: '12px' }}
      >
        {name}
      </span>
      <span style={{ lineHeight: '12px' }}>{value}</span>
    </div>
  )
}
