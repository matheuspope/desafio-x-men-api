import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const discoveredMutants = pgTable("discoveredMutants", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  codename: text().notNull(),
  power: text().notNull(),
  threatLevel: text().notNull(),
  teamId: uuid().references(() => teams.id),
  powerLevel: text(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const teams = pgTable("teams", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  description: text(),
});
