CREATE TABLE IF NOT EXISTS "lists" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(25) NOT NULL,
	"description" varchar(100),
	"is_private" boolean DEFAULT false NOT NULL,
	"owner_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_lists_followers" (
	"user_id" integer NOT NULL,
	"list_id" integer NOT NULL,
	CONSTRAINT users_lists_followers_user_id_list_id PRIMARY KEY("user_id","list_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_lists_members" (
	"user_id" integer NOT NULL,
	"list_id" integer NOT NULL,
	CONSTRAINT users_lists_members_user_id_list_id PRIMARY KEY("user_id","list_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_lists_pinned" (
	"user_id" integer NOT NULL,
	"list_id" integer NOT NULL,
	CONSTRAINT users_lists_pinned_user_id_list_id PRIMARY KEY("user_id","list_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_lists_followers" ADD CONSTRAINT "users_lists_followers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_lists_followers" ADD CONSTRAINT "users_lists_followers_list_id_lists_id_fk" FOREIGN KEY ("list_id") REFERENCES "lists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_lists_members" ADD CONSTRAINT "users_lists_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_lists_members" ADD CONSTRAINT "users_lists_members_list_id_lists_id_fk" FOREIGN KEY ("list_id") REFERENCES "lists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_lists_pinned" ADD CONSTRAINT "users_lists_pinned_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_lists_pinned" ADD CONSTRAINT "users_lists_pinned_list_id_lists_id_fk" FOREIGN KEY ("list_id") REFERENCES "lists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
