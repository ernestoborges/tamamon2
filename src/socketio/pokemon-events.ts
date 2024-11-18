import { Socket } from 'socket.io'

import pokemonManager from '../models/PokemonManager'

export default function handlePokemonEvents(socket: Socket) {
  socket.on('getPokemons', async () => {
    pokemonManager.emitPokemonData(socket.id)
  })

  socket.on('feedPokemon', async (pokemonId: string) => {
    pokemonManager.feedPokemon(socket.id, pokemonId)
  })
}
