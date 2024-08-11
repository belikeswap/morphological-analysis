CREATE TABLE IF NOT EXISTS "segmented_words" (
	"id" serial PRIMARY KEY NOT NULL,
	"word" text NOT NULL,
	"parts" text[] DEFAULT '{}'::text[]
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "segmented_word_idx" ON "segmented_words" USING btree ("word");