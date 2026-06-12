import { timestamp } from "drizzle-orm/pg-core";
import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { uniqueIndex } from "drizzle-orm/pg-core";

export const discoveredMutants = pgTable("discoveredMutants", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  codename: text().notNull(),
  power: text().notNull(),
  threatLevel: text().notNull(),
});

export const teams = pgTable("teams", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  description: text(),
});

export const mutants_Teams = pgTable(
  "mutants_Teams",
  {
    id: uuid().primaryKey().defaultRandom(),
    discoveredMutantsId: uuid()
      .notNull()
      .references(() => discoveredMutants.id),
    teamsId: uuid()
      .notNull()
      .references(() => teams.id),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex().on(table.discoveredMutantsId, table.teamsId)],
);
