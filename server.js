// server.js
import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

fastify.get('/ping', async (request, reply) => {
  return { message: 'pong' };
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server running at ${address}`);
});
