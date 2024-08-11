<script>
	import { Footer, FooterCopyright } from 'flowbite-svelte';
	import '../app.css';
</script>

<svelte:head>
	<meta name="Morphological Analysis Generator" />
</svelte:head>

<div class="w-full h-screen">
	<slot />
	<div class="fixed bottom-0 w-full">
		<Footer>
			<div class="flex items-center justify-center w-full py-4 bg-slate-100">
				<FooterCopyright
					spanClass="text-slate-700 text-sm font-base"
					aClass="text-blue-600 font-semibold hover:cursor-pointer hover:underline"
					href="https://github.com/belikeswap"
					by="Swapnajit Banerjee"
					year={new Date().getFullYear()}
				/>
			</div>
		</Footer>
	</div>
</div>
