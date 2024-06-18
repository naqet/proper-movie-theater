<script>
	import Header from "$lib/components/header.svelte";
</script>

<Header/>
<slot />

<style>
	:global(body) {
		padding-inline: 1rem;
	}

    :global(:root) {
        --pico-font-size: 17px;
        --pico-line-height: 1;
    }
</style>
