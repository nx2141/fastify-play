import fastify from "fastify";

const app = fastify({ logger: true });

app.get("/ping", () => {
  return { message: "pong" };
});

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server running at ${address}`);
});
