CREATE TABLE "discoveredMutants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"codename" text NOT NULL,
	"power" text NOT NULL,
	"threatLevel" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mutantsAndTeams" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"discoveredMutantsId" uuid NOT NULL,
	"teamsId" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "mutantsAndTeams" ADD CONSTRAINT "mutantsAndTeams_discoveredMutantsId_discoveredMutants_id_fk" FOREIGN KEY ("discoveredMutantsId") REFERENCES "public"."discoveredMutants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mutantsAndTeams" ADD CONSTRAINT "mutantsAndTeams_teamsId_teams_id_fk" FOREIGN KEY ("teamsId") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "mutantsAndTeams_discoveredMutantsId_teamsId_index" ON "mutantsAndTeams" USING btree ("discoveredMutantsId","teamsId");