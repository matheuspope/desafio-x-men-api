ALTER TABLE "mutants_Teams" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "mutants_Teams" CASCADE;--> statement-breakpoint
ALTER TABLE "discoveredMutants" ADD COLUMN "teamId" uuid;--> statement-breakpoint
ALTER TABLE "discoveredMutants" ADD COLUMN "createdAt" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "discoveredMutants" ADD CONSTRAINT "discoveredMutants_teamId_teams_id_fk" FOREIGN KEY ("teamId") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;