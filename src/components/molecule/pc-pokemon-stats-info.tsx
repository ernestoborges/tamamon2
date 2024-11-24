import { Pokemon } from 'types/Pokemon/common'
import { getStats } from 'utils/pokemon-stats-calc'

export function StatsInfo({ pokemon }: { pokemon: Pokemon }) {
  const base = {
    hp: pokemon.species.base_hp,
    atk: pokemon.species.base_atk,
    def: pokemon.species.base_def,
    sp_atk: pokemon.species.base_sp_atk,
    sp_def: pokemon.species.base_sp_def,
    speed: pokemon.species.base_spd
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
    atk: pokemon.ev_atk,
    def: pokemon.ev_def,
    sp_atk: pokemon.ev_sp_atk,
    sp_def: pokemon.ev_sp_def,
    speed: pokemon.ev_spd
  }

  const currentStats = getStats(
    pokemon.level,
    base,
    ivs,
    evs,
    pokemon.nature.name
  )

  return (
    <div className='p-4'>
      <table className='w-full p-4 text-sm'>
        <thead>
          <tr>
            <th></th>
            <th>Base</th>
            <th>IV</th>
            <th>EV</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <TableRow>
            <TableBodyCell align='left'>HP</TableBodyCell>
            <TableBodyCell>{base.hp}</TableBodyCell>
            <TableBodyCell>{ivs.hp}</TableBodyCell>
            <TableBodyCell>{evs.hp}</TableBodyCell>
            <TableBodyCell>{currentStats.hp}</TableBodyCell>
          </TableRow>
          <TableRow>
            <TableBodyCell align='left'>ATK</TableBodyCell>
            <TableBodyCell>{base.atk}</TableBodyCell>
            <TableBodyCell>{ivs.atk}</TableBodyCell>
            <TableBodyCell>{evs.atk}</TableBodyCell>
            <TableBodyCell>{currentStats.atk}</TableBodyCell>
          </TableRow>
          <TableRow>
            <TableBodyCell align='left'>DEF</TableBodyCell>
            <TableBodyCell>{base.def}</TableBodyCell>
            <TableBodyCell>{ivs.def}</TableBodyCell>
            <TableBodyCell>{evs.def}</TableBodyCell>
            <TableBodyCell>{currentStats.def}</TableBodyCell>
          </TableRow>
          <TableRow>
            <TableBodyCell align='left'>SP.ATK</TableBodyCell>
            <TableBodyCell>{base.sp_atk}</TableBodyCell>
            <TableBodyCell>{ivs.sp_atk}</TableBodyCell>
            <TableBodyCell>{evs.sp_atk}</TableBodyCell>
            <TableBodyCell>{currentStats.sp_atk}</TableBodyCell>
          </TableRow>
          <TableRow>
            <TableBodyCell align='left'>SP.DEF</TableBodyCell>
            <TableBodyCell>{base.sp_def}</TableBodyCell>
            <TableBodyCell>{ivs.sp_def}</TableBodyCell>
            <TableBodyCell>{evs.sp_def}</TableBodyCell>
            <TableBodyCell>{currentStats.sp_def}</TableBodyCell>
          </TableRow>
          <TableRow>
            <TableBodyCell align='left'>SPD</TableBodyCell>
            <TableBodyCell>{base.speed}</TableBodyCell>
            <TableBodyCell>{ivs.speed}</TableBodyCell>
            <TableBodyCell>{evs.speed}</TableBodyCell>
            <TableBodyCell>{currentStats.speed}</TableBodyCell>
          </TableRow>
        </tbody>
      </table>
    </div>
  )
}

function TableRow({ children }: { children: React.ReactNode }) {
  return (
    <tr className='border-t border-dashed border-token-main-surface-tertiary'>
      {children}
    </tr>
  )
}

function TableBodyCell({
  children,
  align
}: {
  children: React.ReactNode
  align?: 'left' | 'right'
}) {
  return (
    <td
      className='content-center text-center'
      style={{ textAlign: align ? align : 'center' }}
    >
      {children}
    </td>
  )
}
