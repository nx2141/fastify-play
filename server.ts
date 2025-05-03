import fastify from "fastify";
import { z } from "zod";
import rateLimit from "@fastify/rate-limit";

const start = async () => {
  const app = fastify({ logger: true });

  await app.register(rateLimit, {
    max: 10,
    timeWindow: "1 minute",
  });

  const ParamsSchema = z.object({
    postId: z.coerce.number(), // stringでもnumberでもOKにする
  });

  app.get("/ping/:postId", async (req, reply) => {
    const parseResult = ParamsSchema.safeParse(req.params);

    if (!parseResult.success) {
      return reply.status(400).send({ error: "Invalid postId" });
    }

    const { postId } = parseResult.data;
    return { message: `Post ID is ${postId}` };
  });

  app.listen({ port: 3000 }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`Server running at ${address}`);
  });
};
start();
