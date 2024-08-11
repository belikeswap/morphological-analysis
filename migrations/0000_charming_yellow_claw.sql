CREATE TABLE IF NOT EXISTS "eng_dict_webster" (
	"id" serial PRIMARY KEY NOT NULL,
	"word" text NOT NULL,
	"meaning" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "morphemes" (
	"id" serial PRIMARY KEY NOT NULL,
	"root" text DEFAULT '' NOT NULL,
	"form" text DEFAULT '' NOT NULL,
	"pos" text,
	"type" text,
	"loc" text,
	"category" text DEFAULT '' NOT NULL,
	"attach_to" text[] DEFAULT '{}'::text[],
	"meaning" text[] DEFAULT '{}'::text[]
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "word_idx" ON "eng_dict_webster" USING btree ("word");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "root_idx" ON "morphemes" USING btree ("root");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "form_idx" ON "morphemes" USING btree ("form");