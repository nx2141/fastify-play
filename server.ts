import Fastify from 'fastify'
import mysql from 'mysql2/promise'
import { z } from 'zod'

const fastify = Fastify({ logger: true })

// DB コネクション（毎回作るより pool のほうが理想だが、まずはこれで）
const getConnection = async () => {
  return await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  })
}

// POST /users エンドポイント
fastify.post('/users', async (request, reply) => {
  const bodySchema = z.object({
    name: z.string().min(1),
  })

  const result = bodySchema.safeParse(request.body)

  if (!result.success) {
    return reply.status(400).send({ error: 'Invalid input' })
  }

  const { name } = result.data

  try {
    const connection = await getConnection()
    await connection.execute('INSERT INTO users (name) VALUES (?)', [name])
    await connection.end()
    return reply.send({ message: 'User saved' })
  } catch (err) {
    fastify.log.error(err)
    return reply.status(500).send({ error: 'Database error' })
  }
})

// 起動
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
