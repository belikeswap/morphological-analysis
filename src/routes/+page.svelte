<script lang="ts">
	import {
		Heading,
		P,
		A,
		Badge,
		Button,
		Textarea,
		Spinner,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { PenSolid, GithubSolid } from 'flowbite-svelte-icons';

	interface IChildItem {
		text: string;
		type: string;
	}
	interface ITreeItem {
		children: IChildItem[];
		type: string;
		text: string;
	}
	interface IResult {
		index: number;
		morpheme_count: number;
		status: 'FOUND_IN_DATABASE' | 'NOT_FOUND';
		tree: ITreeItem[];
		word: string;
	}

	let text = '';
	let data_loading = false;
	let results: IResult[] = [];
</script>

<svelte:head>
	<title>Morphological Analysis Generator</title>
</svelte:head>

<div class="p-2 pb-10">
	<div class="flex flex-col items-end">
		<Heading tag="h3" class="mb-5">Morphological Analysis Generator (WIP)</Heading>
		<P class="mb-10"
			>This project aims to automate the process of performing morpholgical analysis of
			words/sentences. This is still a work-in-progress, contributions are welcome on the<A
				href="https://github.com/belikeswap/morphological-analysis"
			>
				<Badge rounded color="dark" class="mx-1"
					><GithubSolid class="w-3 h-3 me-2" />Github Repo</Badge
				>
			</A>. The dataset for this project can be found at <A
				href="https://github.com/hugomailhot/MorphoLex-en"
			>
				<Badge rounded color="dark" class="mx-1"
					><GithubSolid class="w-3 h-3 me-2" />hugomailhot/MorphoLex-en</Badge
				></A
			>.</P
		>
		<Textarea
			name="input"
			id="text-input"
			rows="7"
			cols="100"
			placeholder="Enter your text..."
			class="border border-gray-300 rounded ps-3 pt-2"
			bind:value={text}
		></Textarea>
		<Button
			class="mt-3"
			on:click={() => {
				data_loading = true;
				fetch('https://morpheme-analysis.onrender.com/analyse', {
					method: 'POST',
					body: JSON.stringify({ text }),
					headers: {
						'Content-Type': 'application/json'
					},
					mode: 'cors'
				})
					.then((raw) => {
						return raw.json();
					})
					.then((res) => {
						results = res;
					})
					.catch((err) => {
						console.error(err);
					})
					.finally(() => {
						data_loading = false;
					});
			}}
		>
			{#if data_loading}
				<Spinner class="me-3" size="4" color="white" />Analyzing
			{:else}
				<PenSolid class="w-5 h-5 me-2" /> Analyze
			{/if}
		</Button>
		{#if results.length}
			<div class="w-auto my-5 overflow-x-auto">
				<Table divClass="border rounded">
					<TableHead>
						<TableHeadCell>#</TableHeadCell>
						<TableHeadCell>Word</TableHeadCell>
						<TableHeadCell>Morphemes</TableHeadCell>
						<TableHeadCell>Count</TableHeadCell>
					</TableHead>
					<TableBody tableBodyClass="divide-y">
						{#each results as result}
							<TableBodyRow>
								<TableBodyCell>{result.index + 1}</TableBodyCell>
								<TableBodyCell>{result.word}</TableBodyCell>
								<TableBodyCell>
									{#if result.status === 'FOUND_IN_DATABASE'}
										{result.tree?.reduce((prev, next, index) => {
											if (next.children?.length) {
												return (prev +=
													index !== 0
														? `-${next.children.reduce((p, n, i) => {
																return (p += i !== 0 ? `-${n.text}` : `${n.text}`);
															}, '')}`
														: `${next.children.reduce((p, n, i) => {
																return (p += i !== 0 ? `-${n.text}` : `${n.text}`);
															}, '')}`);
											} else {
												return (prev += index !== 0 ? `-${next.text}` : `${next.text}`);
											}
										}, '')}
									{:else}
										{result.word}
									{/if}
								</TableBodyCell>
								<TableBodyCell>{result.morpheme_count}</TableBodyCell>
							</TableBodyRow>
						{/each}
					</TableBody>
					<tfoot>
						<tr class="font-semibold text-gray-900 dark:text-white bg-gray-100">
							<td class="py-3 px-6"></td>
							<td class="py-3 px-6"></td>
							<th scope="row" class="py-3 px-6 text-base">Total Count</th>
							<td class="py-3 px-6"
								>{results.reduce((prev, next) => {
									return (prev += next.morpheme_count);
								}, 0)}</td
							>
						</tr>
					</tfoot>
				</Table>
			</div>
		{/if}
	</div>
</div>
