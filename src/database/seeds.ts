import { db } from "./client.ts";
import { discoveredMutants, teams, mutants_Teams } from "./schema.ts";

async function seed() {
  const discoveredMutantsInsert = await db
    .insert(discoveredMutants)
    .values([
      {
        name: "Jean Grey",
        codename: "Fenix",
        power: "Telecneses, Mental Reeding",
        threatLevel: "Ômega",
      },

      {
        name: "Scott Summers",
        codename: "Cyclops",
        power:
          "Projection of optic blasts of concussive force (pure force, non-thermal).",
        threatLevel: "Alfa",
      },

      {
        name: "Ororo Munroe",
        codename: "Storm",
        power:
          "Complete weather manipulation (lightning, wind, rain, atmospheric pressure).",
        threatLevel: "Ômega",
      },



      {
        name: "Logan",
        codename: "Wolverine",
        power:
          "Accelerated regenerative healing factor, enhanced senses, and retractable claws.",
        threatLevel: "Beta",
      },

      {
        name: "Erik Lensherr",
        codename: "Magneto",
        power:
          "Absolute manipulation of magnetic fields and control of metals.",
        threatLevel: "Omega",
      },

      {
        name: "Raven Darkhölme",
        codename: "Mystique",
        power:
          "Flawless shapeshifting (can replicate anyone's appearance and voice).",
        threatLevel: "Beta",
      },

      {
        name: "Victor Creed",
        codename: "Sabretooth",
        power:
          "Healing factor, hyper-developed senses, claws, and superhuman strength.",
        threatLevel: "Beta",
      },

      {
        name: "Jason Wyngarde",
        codename: "Mastermind",
        power:
          "Creation of complex and realistic telepathic illusions affecting all senses.",
        threatLevel: "Alpha",
      },

      {
        name: "Wade Wilson",
        codename: "Deadpool",
        power:
          "Healing factor derived from Wolverine (Note: He is a mutated human/mutate).",
        threatLevel: "Beta",
      },

      {
        name: "Nathan Summers",
        codename: "Cable",
        power:
          "Latent telekinesis and telepathy (often limited by the techno-organic virus).",
        threatLevel: "Alpha",
      },

      {
        name: "Laura Kinney",
        codename: "X-23",
        power:
          "Healing factor identical to Wolverine, retractable bone claws in hands and feet.",
        threatLevel: "Beta",
      },

      {
        name: "Kwannon",
        codename: "Psylocke",
        power:
          "Telepathy, telekinesis, and creation of psionic energy weapons (like katanas).",
        threatLevel: "Alpha",
      },
    ])
    .returning();

    const teamsInsert = await db.insert(teams).values([
      {name: 'X-men', description: 'Heroes'},
      {name: 'Brotherhood', description: 'Villains'},
      {name: 'X-force', description: 'Anti-heroes'},
    ]).returning()

    
    await db.insert(mutants_Teams).values({
      teamsId: teamsInsert[0].id,
      discoveredMutantsId: discoveredMutantsInsert[0].id
    })

}

seed();
console.log("seed concluida!")