import { fastify } from "fastify";
import { db } from "./src/database/client";
import { discoveredMutants } from "./src/database/schema";
import {eq} from "drizzle-orm"


const server = fastify();

server.get("/discoveredMutants", async (request, reply) => {

    const {threatLevel} = request.query as {
      threatLevel?: string
    }
   
    
  const mutants = await db
    .select({
      id: discoveredMutants.id,
      name: discoveredMutants.name,
      codename: discoveredMutants.codename,
      power: discoveredMutants.power,
      threatLevel: discoveredMutants.threatLevel,
    })
    .from(discoveredMutants).where(eq(discoveredMutants.threatLevel, threatLevel))
  
  console.log(mutants);
  return reply.send({ mutants });
});

server.post("/discoveredMutants", async (request, reply) => {
  const { name, codename, power, threatLevel, teamId } = request.body as {
    name: string;
    codename: string;
    power: string;
    threatLevel: string;
    teamId: string;
  };

  const newMutants = await db
    .insert(discoveredMutants)
    .values({
      name,
      codename,
      power,
      threatLevel,
      teamId,
    })
    .returning();

  server.post("/teams", async (request, reply) => {});

  return reply.status(201).send({ discoveredMutants: newMutants[0].id });
});

server.listen({ port: 3333 }).then(() => {
  console.log("HTTP is running!");
});
