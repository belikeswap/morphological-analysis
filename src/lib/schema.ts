import { pgTable, serial, text, index } from 'drizzle-orm/pg-core';

export const morphemesTable = pgTable(
	'morphemes',
	{
		id: serial('id').primaryKey(),
		root: text('root').notNull().default(''),
		form: text('form').notNull().default(''),
		pos: text('pos'),
		type: text('type'),
		loc: text('loc', { enum: ['prefix', 'suffix', 'embedded'] }),
		category: text('category').notNull().default(''),
		attach_to: text('attach_to').array().default([]),
		meaning: text('meaning').array().default([]),
		examples: text('examples').array().default([])
	},
	(table) => {
		return {
			rootIdx: index('root_idx').on(table.root),
			formIdx: index('form_idx').on(table.form)
		};
	}
);
export const engDicWebsterTable = pgTable(
	'eng_dict_webster',
	{
		id: serial('id').primaryKey(),
		word: text('word').notNull(),
		meaning: text('meaning').notNull()
	},
	(table) => {
		return {
			wordIdx: index('word_idx').on(table.word)
		};
	}
);
export const segmentedWordsTable = pgTable(
	'segmented_words',
	{
		id: serial('id').primaryKey(),
		word: text('word').notNull(),
		parts: text('parts').array().notNull().default([])
	},
	(table) => {
		return {
			wordIdx: index('segmented_word_idx').on(table.word)
		};
	}
);

export type InsertMorpheme = typeof morphemesTable.$inferInsert;
export type SelectMorpheme = typeof morphemesTable.$inferSelect;

export type InsertWord = typeof engDicWebsterTable.$inferInsert;
export type SelectWord = typeof engDicWebsterTable.$inferSelect;

export type InsertSegmentedWord = typeof segmentedWordsTable.$inferInsert;
export type SelectSegmentedWord = typeof segmentedWordsTable.$inferSelect;
