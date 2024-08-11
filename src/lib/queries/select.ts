import { asc, eq, like, sql } from 'drizzle-orm';
import { db } from '../db';
import {
	type SelectWord,
	type SelectMorpheme,
	engDicWebsterTable,
	morphemesTable
} from '../schema';

export async function getWord(
	word: SelectWord['word']
): Promise<Array<{ word: string; meaning: string }>> {
	return db
		.select({ word: engDicWebsterTable.word, meaning: engDicWebsterTable.meaning })
		.from(engDicWebsterTable)
		.where(eq(engDicWebsterTable.word, word))
		.orderBy(asc(sql`length(${engDicWebsterTable.word})`))
		.limit(1);
}

export async function getWordRegex(
	word: SelectWord['word']
): Promise<Array<{ id: number; word: string; meaning: string }>> {
	return db
		.select()
		.from(engDicWebsterTable)
		.where(like(engDicWebsterTable.word, `%${word}%`))
		.orderBy(asc(sql`length(${engDicWebsterTable.word})`))
		.limit(1);
}

export async function getMorphemeByRoot(root: SelectMorpheme['root']): Promise<
	Array<{
		meaning: string[] | null;
		type: string | null;
		root: string;
		form: string;
		pos: string | null;
		loc: 'prefix' | 'suffix' | 'embedded' | null;
		category: string;
		attach_to: string[] | null;
	}>
> {
	return db
		.select({
			meaning: morphemesTable.meaning,
			type: morphemesTable.type,
			root: morphemesTable.root,
			form: morphemesTable.form,
			pos: morphemesTable.pos,
			loc: morphemesTable.loc,
			category: morphemesTable.category,
			attach_to: morphemesTable.attach_to
		})
		.from(morphemesTable)
		.where(eq(morphemesTable.root, root));
}

export async function getMorphemeByForm(form: SelectMorpheme['form']): Promise<
	Array<{
		id: number;
		meaning: string[] | null;
		type: string | null;
		root: string;
		form: string;
		pos: string | null;
		loc: 'prefix' | 'suffix' | 'embedded' | null;
		category: string;
		attach_to: string[] | null;
	}>
> {
	return db.select().from(morphemesTable).where(eq(morphemesTable.form, form));
}
