import fastify from "fastify";
import rateLimit from "@fastify/rate-limit";

async function start() {
  const app = fastify({ logger: true });

  await app.register(rateLimit, {
    max: 10,
    timeWindow: "1 minute",
  });

  app.post("/ping", async (req) => {
    const { name } = await req.body as { name: string };
    if(name){
      return { message: `Hello ${name}` };
    }
    return { message: "pong" };
  });

  try {
    const address = await app.listen({ port: 3000 });
    app.log.info(`Server running at ${address}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();// topレベルでasync/awaitを使うためにstart関数を定義して呼び出す
