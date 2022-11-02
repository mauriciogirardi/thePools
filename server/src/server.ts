import Fastify from 'fastify'
import { prisma } from './service/prisma'
import { z } from 'zod'
import cors from '@fastify/cors'
import ShortUniqueId from 'short-unique-id'

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
  })

  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count()
    return { count }
  })

  fastify.post('/pools', async (request, reply) => {
    const createPoolBody = z.object({
      title: z.string(),
    })

    const { title } = createPoolBody.parse(request.body)
    const generateCode = new ShortUniqueId({ length: 6 })
    const code = String(generateCode()).toUpperCase()

    await prisma.pool.create({
      data: {
        title,
        code,
      },
    })

    return reply.status(201).send({ title, code })
  })

  fastify.get('/users/count', async () => {
    const count = await prisma.user.count()
    return { count }
  })

  fastify.get('/guesses/count', async () => {
    const count = await prisma.guess.count()
    return { count }
  })

  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()
