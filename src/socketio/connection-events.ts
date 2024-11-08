import { Socket } from 'socket.io'

import pokemonManager from '../models/PokemonManager'

export default function handleConnectionEvents(socket: Socket) {
  socket.on('disconnect', async () => {
    pokemonManager.unloadPlayerPokemons(socket.data.user, socket.id)
    console.log('Usuário desconectado:', socket.id)
  })
}
