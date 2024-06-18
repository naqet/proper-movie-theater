<script>
	import Header from "$lib/components/header.svelte";
</script>

<Header/>
<slot />

<style>
	:global(body) {
		padding-inline: 1rem;
	}
</style>
