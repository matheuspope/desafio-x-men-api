CREATE TABLE "mutants_Teams" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"discoveredMutantsId" uuid NOT NULL,
	"teamsId" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "mutantsAndTeams" CASCADE;--> statement-breakpoint
ALTER TABLE "mutants_Teams" ADD CONSTRAINT "mutants_Teams_discoveredMutantsId_discoveredMutants_id_fk" FOREIGN KEY ("discoveredMutantsId") REFERENCES "public"."discoveredMutants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mutants_Teams" ADD CONSTRAINT "mutants_Teams_teamsId_teams_id_fk" FOREIGN KEY ("teamsId") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "mutants_Teams_discoveredMutantsId_teamsId_index" ON "mutants_Teams" USING btree ("discoveredMutantsId","teamsId");