<script>
	import { Footer, FooterCopyright, FooterLinkGroup, FooterLink } from 'flowbite-svelte';
	import '../app.css';
</script>

<div class="w-full h-screen">
	<slot />
	<div class="fixed bottom-0 w-full">
		<Footer>
			<div class="flex items-center justify-center w-full py-4 bg-slate-100">
				<FooterCopyright
					aClass="text-blue-500"
					href="https://github.com/belikeswap"
					by="Swapnajit Banerjee"
					year={new Date().getFullYear()}
				/>
			</div>
		</Footer>
	</div>
</div>
