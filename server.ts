import { fastify } from "fastify";
import { db } from "./src/database/client";
import { discoveredMutants } from "./src/database/schema";



const server =  fastify();

server.get("/discoveredMutants", async (request, reply) => {
  const mutants = await db
    .select({
      id: discoveredMutants.id,
      name: discoveredMutants.name,
      codename: discoveredMutants.codename,
      power: discoveredMutants.power,
      threatLevel: discoveredMutants.threatLevel,
    })
    .from(discoveredMutants);

  console.log(mutants);
        return reply.send({mutants})

});

server.post("/discoveredMutants", async (request, reply) => {
  const { name, codename, power, threatLevel} = request.body as {
    name: string,
    codename: string,
    power: string,
    threatLevel: string
  }

  const newMutants = await db
  .insert(discoveredMutants)
  .values({
    name,
    codename,
    power,
    threatLevel,
  }).returning()
  

 return reply.status(201).send({discoveredMutants: newMutants[0].id})
});



server.listen({ port: 3333 }).then(() => {
  console.log("HTTP is running!");
});
