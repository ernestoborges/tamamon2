// server.ts
import { createServer } from 'http'
import next from 'next'
import dotenv from 'dotenv'
import express from 'express'
import { Server, Socket } from 'socket.io'

import pokemonManager from './models/PokemonManager'
import handleConnectionEvents from './socketio/connection-events'
import handlePokemonEvents from './socketio/pokemon-events'

dotenv.config()

const hostname = 'localhost'
const port = 3000

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  const httpServer = createServer(server)

  let io: Server | undefined
  if (!global.io) {
    io = new Server(httpServer, {
      cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] }
    })
    global.io = io
  } else {
    io = global.io
  }

  server.all('*', (req, res) => handle(req, res))

  io!.on('connection', (socket: Socket) => {
    const { userId } = socket.handshake.query
    console.log('Um usuário se conectou:', userId, socket.id)

    if (typeof userId === 'string') {
      pokemonManager.loadPlayerPokemons(userId, socket.id)
    }

    handlePokemonEvents(socket)
    handleConnectionEvents(socket)
  })

  const PORT = process.env.PORT || port
  httpServer.listen(PORT, (err?: Error) => {
    if (err) throw err
    console.log(`> Servidor rodando na porta ${PORT}`)
  })
})