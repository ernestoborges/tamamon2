import { Nature } from 'types/Pokemon/common'

interface IStatList {
  hp: number
  atk: number
  def: number
  sp_atk: number
  sp_def: number
  speed: number
}

interface IStat {
  name: string
  base_stat: number
  effort: number
}

export function getBaseStats(stats: IStat[]) {
  const base = {
    hp: stats[0].base_stat,
    atk: stats[1].base_stat,
    def: stats[2].base_stat,
    sp_atk: stats[3].base_stat,
    sp_def: stats[4].base_stat,
    speed: stats[5].base_stat
  }
  return base
}

function hpCalc(L: number, B: number, IV: number, EV: number) {
  const value = ((2 * B + IV + EV / 4) * L) / 100 + L + 10
  return Math.floor(value)
}

function statCalc(L: number, B: number, IV: number, EV: number, N: number) {
  const value = Math.floor(((2 * B + IV + EV / 4) / 100) * L + 5) * N
  return Math.floor(value)
}

export function getStats(
  lv: number,
  base: IStatList,
  ivs?: IStatList,
  evs?: IStatList,
  nature?: Nature | 'Max'
) {
  const zeroObj = {
    hp: 0,
    atk: 0,
    def: 0,
    sp_atk: 0,
    sp_def: 0,
    speed: 0
  }

  const N =
    nature === 'Max'
      ? {
          hp: 1.1,
          atk: 1.1,
          def: 1.1,
          sp_atk: 1.1,
          sp_def: 1.1,
          speed: 1.1
        }
      : {
          hp: 1,
          atk: 1,
          def: 1,
          sp_atk: 1,
          sp_def: 1,
          speed: 1
        }

  switch (nature) {
    case 'Hardy':
    case 'Lonely':
    case 'Brave':
    case 'Adamant':
    case 'Naughty':
      N.atk = 1.1
      break
    case 'Bold':
    case 'Docile':
    case 'Relaxed':
    case 'Lax':
    case 'Impish':
      N.def = 1.1
      break
    case 'Timid':
    case 'Hasty':
    case 'Serious':
    case 'Jolly':
    case 'Naive':
      N.speed = 1.1
      break
    case 'Modest':
    case 'Mild':
    case 'Quiet':
    case 'Bashful':
    case 'Rash':
      N.sp_atk = 1.1
      break
    case 'Calm':
    case 'Gentle':
    case 'Sassy':
    case 'Careful':
    case 'Quirky':
      N.sp_def = 1.1
      break
  }

  switch (nature) {
    case 'Hardy':
    case 'Bold':
    case 'Timid':
    case 'Modest':
    case 'Calm':
      N.atk = 0.9
      break
    case 'Lonely':
    case 'Docile':
    case 'Hasty':
    case 'Mild':
    case 'Gentle':
      N.def = 0.9
      break
    case 'Brave':
    case 'Relaxed':
    case 'Serious':
    case 'Quiet':
    case 'Sassy':
      N.speed = 0.9
      break
    case 'Adamant':
    case 'Impish':
    case 'Jolly':
    case 'Bashful':
    case 'Careful':
      N.sp_atk = 0.9
      break
    case 'Naughty':
    case 'Lax':
    case 'Naive':
    case 'Rash':
    case 'Quirky':
      N.sp_def = 0.9
      break
  }

  const IVS = ivs ? ivs : zeroObj
  const EVS = evs ? evs : zeroObj

  const currentStats = {
    hp: hpCalc(lv, base.hp, IVS.hp, EVS.hp),
    atk: statCalc(lv, base.atk, IVS.atk, EVS.atk, N.atk),
    def: statCalc(lv, base.def, IVS.def, EVS.def, N.def),
    sp_atk: statCalc(lv, base.sp_atk, IVS.sp_atk, EVS.sp_atk, N.sp_atk),
    sp_def: statCalc(lv, base.sp_atk, IVS.sp_def, EVS.sp_def, N.sp_def),
    speed: statCalc(lv, base.speed, IVS.speed, EVS.speed, N.speed)
  }

  return currentStats
}
