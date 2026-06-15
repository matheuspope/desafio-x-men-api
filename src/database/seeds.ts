import { db } from "./client.ts";
import { discoveredMutants, teams,  } from "./schema.ts";

async function seed() {
  console.log("Limpando dados antigos...");

  await db.delete(discoveredMutants);
  await db.delete(teams);

   const insertedTeams = await db .insert(teams).values([
    {name: "X-men", description: "Heroes fighting for peaceful coexistence"},
    {name: "Brotherhood of Mutants", description: "Radical mutant supremacy group."},
    {name: "X-force", description: "Strike team handling proactive threats."}
   ]).returning()

   const xMenTeam = insertedTeams.find((t)=> t.name === "X-men") ;
   const brotherhoodTeam = insertedTeams.find((t) => t.name === "Brotherhood of Mutants");
   const xForceTeam = insertedTeams.find((t) => t.name === "X-force")

   await db
    .insert(discoveredMutants)
    .values([

     // -- INTEGRANTES DOS X-MEN

      {
        name: "Jean Grey",
        codename: "Fenix",
        power: "Telecneses, Mental Reeding",
        threatLevel: "Ômega",
        teamId: xMenTeam?.id
        
      },

      {
        name: "Scott Summers",
        codename: "Cyclops",
        power:
          "Projection of optic blasts of concussive force (pure force, non-thermal).",
        threatLevel: "Alfa",
        teamId: xMenTeam?.id
      },

      {
        name: "Ororo Munroe",
        codename: "Storm",
        power:
          "Complete weather manipulation (lightning, wind, rain, atmospheric pressure).",
        threatLevel: "Ômega",
        teamId: xMenTeam?.id
      },



      {
        name: "Logan",
        codename: "Wolverine",
        power:
          "Accelerated regenerative healing factor, enhanced senses, and retractable claws.",
        threatLevel: "Beta",
        teamId: xMenTeam?.id
      },


      // -- INTEGRANTES DA BROTHERHOOD

      {
        name: "Erik Lensherr",
        codename: "Magneto",
        power:
          "Absolute manipulation of magnetic fields and control of metals.",
        threatLevel: "Omega",
        teamId: brotherhoodTeam?.id
      },

      {
        name: "Raven Darkhölme",
        codename: "Mystique",
        power:
          "Flawless shapeshifting (can replicate anyone's appearance and voice).",
        threatLevel: "Beta",
        teamId: brotherhoodTeam?.id
      },

      {
        name: "Victor Creed",
        codename: "Sabretooth",
        power:
          "Healing factor, hyper-developed senses, claws, and superhuman strength.",
        threatLevel: "Beta",
        teamId: brotherhoodTeam?.id
      },

      {
        name: "Jason Wyngarde",
        codename: "Mastermind",
        power:
          "Creation of complex and realistic telepathic illusions affecting all senses.",
        threatLevel: "Alpha",
        teamId: brotherhoodTeam?.id
      },

      // -- INTEGRANTES DA X-FORCE


      {
        name: "Wade Wilson",
        codename: "Deadpool",
        power:
          "Healing factor derived from Wolverine (Note: He is a mutated human/mutate).",
        threatLevel: "Beta",
        teamId: xForceTeam?.id
      },

      {
        name: "Nathan Summers",
        codename: "Cable",
        power:
          "Latent telekinesis and telepathy (often limited by the techno-organic virus).",
        threatLevel: "Alpha",
        teamId: xForceTeam?.id
      },

      {
        name: "Laura Kinney",
        codename: "X-23",
        power:
          "Healing factor identical to Wolverine, retractable bone claws in hands and feet.",
        threatLevel: "Beta",
        teamId: xForceTeam?.id
      },

      {
        name: "Kwannon",
        codename: "Psylocke",
        power:
          "Telepathy, telekinesis, and creation of psionic energy weapons (like katanas).",
        threatLevel: "Alpha",
        teamId: xForceTeam?.id
      },
    ])
    .returning();


}

seed();
console.log("seed concluida!")