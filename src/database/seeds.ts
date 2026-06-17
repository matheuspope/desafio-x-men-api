import { db } from "./client.ts";
import { discoveredMutants, teams } from "./schema.ts";

async function seed() {
  console.log("Limpando dados antigos...");

  await db.delete(discoveredMutants);
  await db.delete(teams);

  const insertedTeams = await db
    .insert(teams)
    .values([
      {
        name: "X-men",
        description: "Heroes fighting for peaceful coexistence",
      },
      {
        name: "Brotherhood of Mutants",
        description: "Radical mutant supremacy group.",
      },
      {
        name: "X-force",
        description: "Strike team handling proactive threats.",
      },
    ])
    .returning();

  const xMenTeam = insertedTeams.find(
    (t) => t.name === "X-men"
  );

  const brotherhoodTeam = insertedTeams.find(
    (t) => t.name === "Brotherhood of Mutants"
  );

  const xForceTeam = insertedTeams.find(
    (t) => t.name === "X-force"
  );

  if (!xMenTeam || !brotherhoodTeam || !xForceTeam) {
    throw new Error("Um ou mais times não foram encontrados.");
  }

  await db.insert(discoveredMutants).values([
    {
      name: "Jean Grey",
      codename: "Fenix",
      power: "Telecinese, Leitura Mental",
      threatLevel: "Omega",
      teamId: xMenTeam.id,
    },

    {
      name: "Scott Summers",
      codename: "Cyclops",
      power: "Optic Blasts",
      threatLevel: "Alpha",
      teamId: xMenTeam.id,
    },

    {
      name: "Ororo Munroe",
      codename: "Storm",
      power: "Weather Manipulation",
      threatLevel: "Omega",
      teamId: xMenTeam.id,
    },

    {
      name: "Logan",
      codename: "Wolverine",
      power: "Healing Factor",
      threatLevel: "Beta",
      teamId: xMenTeam.id,
    },

    {
      name: "Erik Lensherr",
      codename: "Magneto",
      power: "Magnetism",
      threatLevel: "Omega",
      teamId: brotherhoodTeam.id,
    },

    {
      name: "Raven Darkhölme",
      codename: "Mystique",
      power: "Shapeshifting",
      threatLevel: "Beta",
      teamId: brotherhoodTeam.id,
    },

    {
      name: "Victor Creed",
      codename: "Sabretooth",
      power: "Healing Factor",
      threatLevel: "Beta",
      teamId: brotherhoodTeam.id,
    },

    {
      name: "Jason Wyngarde",
      codename: "Mastermind",
      power: "Telepathic Illusions",
      threatLevel: "Alpha",
      teamId: brotherhoodTeam.id,
    },

    {
      name: "Wade Wilson",
      codename: "Deadpool",
      power: "Healing Factor",
      threatLevel: "Beta",
      teamId: xForceTeam.id,
    },

    {
      name: "Nathan Summers",
      codename: "Cable",
      power: "Telepathy and Telekinesis",
      threatLevel: "Alpha",
      teamId: xForceTeam.id,
    },

    {
      name: "Laura Kinney",
      codename: "X-23",
      power: "Healing Factor",
      threatLevel: "Beta",
      teamId: xForceTeam.id,
    },

    {
      name: "Kwannon",
      codename: "Psylocke",
      power: "Telepathy and Psionic Weapons",
      threatLevel: "Alpha",
      teamId: xForceTeam.id,
    },
  ]);

  console.log("Seed concluída!");
}

seed().catch((error) => {
  console.error(error);
});